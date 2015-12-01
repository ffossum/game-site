import _, {times} from 'lodash';
import Immutable from 'immutable';
import {cards, values} from '../games/love-letter/constants/cards';
import * as messageKeys from '../constants/GameMessages';

function userMayTakeAction(state, action, cardName) {
  const actingPlayer = state.players[action.acting];
  const playerCanAct = action.acting === state.toAct;
  const playerHasCard = _.contains(actingPlayer.hand, cardName);

  if (!playerCanAct || !playerHasCard) {
    return false;
  }

  if (_.includes([cards.PRINCE, cards.KING], cardName) &&
    _.includes(actingPlayer.hand, cards.COUNTESS)) {
    return false;
  }

  const mustTargetOpponent = _.includes([cards.GUARD, cards.PRIEST, cards.BARON, cards.KING], cardName);
  const nonProtectedOpponents = _.pick(state.players, (playerState, playerId) => {
    return (playerId !== action.acting && !playerState.protected) && !_.isEmpty(playerState.hand);
  });

  if (mustTargetOpponent && !_.isEmpty(nonProtectedOpponents) && !action.target) {
    return false;
  }

  if (action.target) {
    const targetPlayer = state.players[action.target];
    const targetIsProtected = targetPlayer && targetPlayer.protected;
    const targetAlreadyOut = _.isEmpty(targetPlayer.hand);

    return !targetIsProtected && !targetAlreadyOut;
  }

  return true;
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
  if (imState.get('deck').isEmpty()) {
    imState = addPublicInfo(imState, messageKeys.DREW_DISCARD, [playerId]);
    const discard = imState.get('discard');
    return imState.updateIn(['players', playerId, 'hand'], hand => hand.push(discard));
  }

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
  imState = imState.set('discard', nextDeck.pop());

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
    if (!action.target) {
      return imState;
    }
    const targetPlayer = imState.getIn(['players', action.target]);
    const targetPlayerCard = targetPlayer.get('hand').first();
    if (targetPlayerCard === action.guess) {
      imState = addPublicInfo(imState, messageKeys.GUARD_CORRECT, [action.acting, action.target, action.guess]);
      return eliminatePlayer(imState, action.target);
    } else {
      imState = addPublicInfo(imState, messageKeys.GUARD_WRONG, [action.acting, action.target, action.guess]);
      return imState;
    }
  },
  [cards.PRIEST]: (imState, action) => {
    if (!action.target) {
      return imState;
    }

    const revealedCard = imState.getIn(['players', action.target, 'hand', 0]);
    imState = addPublicInfo(imState, messageKeys.USED_PRIEST, [action.acting, action.target]);
    imState = addSecretInfo(imState, [action.acting], messageKeys.HAS_CARD, [action.target, revealedCard]);
    return imState;
  },
  [cards.BARON]: (imState, action) => {
    if (!action.target) {
      return imState;
    }
    const actingPlayerCardValue = values[imState.getIn(['players', action.acting, 'hand', 0])];
    const targetPlayerCardValue = values[imState.getIn(['players', action.target, 'hand', 0])];

    if (actingPlayerCardValue > targetPlayerCardValue) {
      imState = addPublicInfo(imState, messageKeys.BARON_SUCCESS, [action.acting, action.target]);
      imState = eliminatePlayer(imState, action.target);
    } else if (actingPlayerCardValue < targetPlayerCardValue) {
      imState = addPublicInfo(imState, messageKeys.BARON_FAIL, [action.acting, action.target]);
      imState = eliminatePlayer(imState, action.acting);
    } else {
      imState = addPublicInfo(imState, messageKeys.BARON_DRAW, [action.acting, action.target]);
    }
    return imState;
  },
  [cards.HANDMAIDEN]: (imState, action) => {
    imState = addPublicInfo(imState, messageKeys.USED_HANDMAIDEN, [action.acting]);
    return imState.setIn(['players', action.acting, 'protected'], true);
  },
  [cards.PRINCE]: (imState, action) => {
    imState = discardHand(imState, action.target);

    const targetDiscards = imState.getIn(['players', action.target, 'discards']);
    if (targetDiscards.includes(cards.PRINCESS)) {
      imState = addPublicInfo(imState, messageKeys.USED_PRINCE_ON_PRINCESS, [action.acting, action.target]);
      return imState;
    }

    imState = addPublicInfo(imState, messageKeys.USED_PRINCE, [action.acting, action.target]);
    return drawCard(imState, action.target);
  },
  [cards.KING]: (imState, action) => {
    if (!action.target) {
      return imState;
    }
    imState = addPublicInfo(imState, messageKeys.USED_KING, [action.acting, action.target]);
    return switchCards(imState, action.acting, action.target);
  },
  [cards.COUNTESS]: (imState, action) => {
    imState = addPublicInfo(imState, messageKeys.USED_COUNTESS, [action.acting]);
    return imState;
  },
  [cards.PRINCESS]: (imState, action) => {
    imState = addPublicInfo(imState, messageKeys.USED_PRINCESS, [action.acting]);
    return eliminatePlayer(imState, action.acting);
  }
};

function clearInfo(imState) {
  return imState.update('info', info => info.clear());
}

function addPublicInfo(imState, key, args) {
  const newInfo = {
    public: true,
    msg: {
      key,
      args
    }
  };

  return imState.update('info', info => info.push(Immutable.fromJS(newInfo)));
}

function addSecretInfo(imState, forPlayers, key, args) {
  const newInfo = {
    for: forPlayers,
    msg: {
      key,
      args
    }
  };

  return imState.update('info', info => info.push(Immutable.fromJS(newInfo)));
}

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
  const discard = deck.pop();

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
    order,
    deck,
    discard,
    info: []
  };
}

export function asVisibleBy(state, playerId) {
  const players = _.mapValues(state.players, (player, name) => ({
    ...player,
    hand: (name === playerId) ? player.hand : _.map(player.hand, card => cards.FACE_DOWN)
  }));

  const info = _.filter(state.info, info => {
    return info.public || _.includes(info.for, playerId);
  });

  return {
    ...state,
    players,
    deck: state.deck.length,
    info
  };
}

export function useCard(state, action) {
  if (!userMayTakeAction(state, action, action.card)) {
    return state;
  }

  let imState = Immutable.fromJS(state);

  imState = clearInfo(imState);
  imState = moveToDiscards(imState, action.card);
  imState = cardEffect[action.card](imState, action);

  if (roundIsOver(imState)) {
    return prepareNextRound(imState).toJS();
  } else {
    return prepareNextTurn(imState).toJS();
  }
}
