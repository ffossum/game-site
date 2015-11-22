import _, {times} from 'lodash';
import Immutable from 'immutable';
import {cards, values} from './loveLetterCards';

function userMayTakeAction(state, action, cardName) {
  const actingPlayer = state.players[action.acting];

  if (_.includes([cards.PRINCE, cards.KING], cardName) &&
    _.includes(actingPlayer.hand, cards.COUNTESS)) {
    return false;
  }

  const playerCanAct = action.acting === state.toAct;
  const playerHasCard = _.contains(actingPlayer.hand, cardName);

  const targetPlayer = state.players[action.target];
  const targetIsProtected = targetPlayer && targetPlayer.protected;

  const cardTargetsOpponent = _.includes([cards.GUARD, cards.PRIEST, cards.BARON, cards.KING], cardName);
  const nonProtectedOpponents = _.pick(state.players, (playerState, playerId) => {
    return playerId !== action.acting && !playerState.protected;
  });

  return playerCanAct && playerHasCard &&
    (!targetIsProtected || (cardTargetsOpponent && _.isEmpty(nonProtectedOpponents)));
}


function moveToDiscards(imState, cardName) {
  const actingPlayerId = imState.get('toAct');
  const actingPlayer = imState.get('players').get(actingPlayerId);
  const cardIndex = actingPlayer.get('hand').indexOf(cardName);

  return imState
    .deleteIn(['players', actingPlayerId, 'hand', cardIndex])
    .updateIn(['players', actingPlayerId, 'discards'], discards => discards.push(cardName));
}

function getNextPlayerId(imState) {
  const alivePlayers = getAlivePlayers(imState);

  const filteredOrder = imState
    .get('order')
    .filter(player => alivePlayers.has(player));

  const actingPlayerIndex = filteredOrder.indexOf(imState.get('toAct'));
  const nextPlayerIndex = (actingPlayerIndex + 1) % filteredOrder.size;

  return filteredOrder.get(nextPlayerIndex);
}

function getAlivePlayers(imState) {
  return imState
    .get('players')
    .filter(player => player.get('hand').size > 0);
}

function drawCard(imState, playerId) {
  const topCard = imState.get('deck').last();
  return imState
    .update('deck', deck => deck.pop())
    .updateIn(['players', playerId, 'hand'], hand => hand.push(topCard));
}

function eliminatePlayer(imState, playerId) {
  const player = imState.getIn(['players', playerId]);
  return imState
    .updateIn(['players', playerId, 'discards'],
      discards => discards.concat(player.get('hand')))
    .updateIn(['players', playerId, 'hand'], hand => hand.clear());
}

function switchCards(imState, playerId, targetId) {
  const targetCard = imState.getIn(['players', targetId, 'hand']).first();
  const playerCard = imState.getIn(['players', playerId, 'hand']).first();

  return imState
    .updateIn(['players', targetId, 'hand'], hand => hand.set(0, playerCard))
    .updateIn(['players', playerId, 'hand'], hand => hand.set(0, targetCard));
}

function roundIsOver(imState) {
  const deckExhausted = imState.get('deck').isEmpty();
  const onePlayerAlive = getAlivePlayers(imState).size === 1;

  return deckExhausted || onePlayerAlive;
}

function getWinnerId(imState) {
  const alivePlayers = getAlivePlayers(imState);

  if (alivePlayers.size === 1) {
    return alivePlayers.keys().next().value;
  }

  const winner = alivePlayers.maxBy(player => {
    const card = player.get('hand').first();
    return values[card];
  });

  return alivePlayers.keyOf(winner);
}

function prepareNextRound(imState) {
  const winnerId = getWinnerId(imState);

  imState = imState.updateIn(['players', winnerId, 'score'], score => score + 1);
  imState = imState.set('toAct', winnerId);

  const nextDeck = getNewDeck();

  //First card is discarded
  nextDeck.pop();

  imState = imState.update('players', players => {
    return players.map(player => {
      return player
        .delete('protected')
        .update('hand', hand => {
          return hand.clear().push(nextDeck.pop());
        })
        .update('discards', discards => discards.clear());
    });
  });

  imState = imState.updateIn(['players', winnerId, 'hand'], hand => {
    return hand.push(nextDeck.pop());
  });

  imState = imState.set('deck', Immutable.fromJS(nextDeck));

  return imState;
}

let discardHand = eliminatePlayer;

function prepareNextTurn(imState) {
  const nextPlayerId = getNextPlayerId(imState);

  imState = imState.update('toAct', toAct => nextPlayerId);
  imState = imState.deleteIn(['players', nextPlayerId, 'protected']);
  imState = drawCard(imState, nextPlayerId);

  return imState;
}

const cardEffect = {
  [cards.GUARD]: (imState, action) => {
    const targetPlayer = imState.getIn(['players', action.target]);
    if (targetPlayer.get('protected')) {
      return imState;
    }
    const targetPlayerCard = targetPlayer.get('hand').first();
    if (targetPlayerCard === action.guess) {
      return eliminatePlayer(imState, action.target);
    } else {
      return imState;
    }
  },
  [cards.PRIEST]: (imState, action) => {
    return imState;
  },
  [cards.BARON]: (imState, action) => {
    const targetPlayer = imState.getIn(['players', action.target]);
    if (targetPlayer.get('protected')) {
      return imState;
    }
    const actingPlayerCardValue = values[imState.getIn(['players', action.acting, 'hand', 0])];
    const targetPlayerCardValue = values[imState.getIn(['players', action.target, 'hand', 0])];

    if (actingPlayerCardValue > targetPlayerCardValue) {
      imState = eliminatePlayer(imState, action.target);
    } else if (actingPlayerCardValue < targetPlayerCardValue) {
      imState = eliminatePlayer(imState, action.acting);
    }
    return imState;
  },
  [cards.HANDMAIDEN]: (imState, action) =>  imState.setIn(['players', action.acting, 'protected'], true),
  [cards.PRINCE]: (imState, action) => {
    imState = discardHand(imState, action.target);
    return drawCard(imState, action.target);
  },
  [cards.KING]: (imState, action) => {
    const targetPlayer = imState.getIn(['players', action.target]);
    if (targetPlayer.get('protected')) {
      return imState;
    }
    return switchCards(imState, action.acting, action.target);
  },
  [cards.COUNTESS]: (imState, action) => imState,
  [cards.PRINCESS]: (imState, action) => {
    return eliminatePlayer(imState, action.acting);
  }
};

function getNewDeck() {
  return _.shuffle([
    ...times(5, () => cards.GUARD),
    ...times(2, () => cards.PRIEST),
    ...times(2, () => cards.BARON),
    ...times(2, () => cards.HANDMAIDEN),
    ...times(2, () => cards.PRINCE),
    cards.KING,
    cards.COUNTESS,
    cards.PRINCESS
  ]);
}

export function createInitialState(players) {

  //Player order is random
  const order = _.shuffle(players);

  const deck = getNewDeck();

  //First card is discarded
  deck.pop();

  const playerStates = {};
  players.forEach(player => {
    playerStates[player] = {
      score: 0,
      hand: [deck.pop()],
      discards: []
    };
  });

  //First player draws a card
  playerStates[order[0]].hand.push(deck.pop());

  return {
    toAct: order[0],
    players: playerStates,
    order: order,
    deck: deck
  };
}

export function asVisibleBy(state, playerId) {
  const players = _.mapValues(state.players, (player, name) => ({
    ...player,
    hand: (name === playerId) ? player.hand : _.map(player.hand, card => cards.FACE_DOWN)
  }));

  return {
    ...state,
    players: players,
    deck: state.deck.length
  };
}

export function useCard(state, action) {
  if (!userMayTakeAction(state, action, action.card)) {
    return state;
  }

  let imState = Immutable.fromJS(state);

  imState = moveToDiscards(imState, action.card);
  imState = cardEffect[action.card](imState, action);

  if (roundIsOver(imState)) {
    return prepareNextRound(imState).toJS();
  } else {
    return prepareNextTurn(imState).toJS();
  }
}