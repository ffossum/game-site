import _, {times} from 'lodash';
import Immutable from 'immutable';
import {cards, values} from './loveLetterCards';

function userMayTakeAction(state, action, cardName) {
  const actingPlayer = state.players[action.acting];

  if (_.includes([cards.PRINCE, cards.KING], cardName) &&
    _.includes(actingPlayer.hand, cards.COUNTESS)) {
    return false;
  }

  const targetPlayer = state.players[action.target];
  const playerCanAct = action.acting === state.toAct;
  const playerHasCard = _.contains(actingPlayer.hand, cardName);
  const targetIsProtected = targetPlayer && targetPlayer.protected;

  return playerCanAct && playerHasCard && !targetIsProtected;
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
  const alivePlayers = imState
    .get('players')
    .filter(player => player.get('hand').size > 0);

  const filteredOrder = imState
    .get('order')
    .filter(player => alivePlayers.has(player));

  const actingPlayerIndex = filteredOrder.indexOf(imState.get('toAct'));
  const nextPlayerIndex = (actingPlayerIndex + 1) % filteredOrder.size;

  return filteredOrder.get(nextPlayerIndex);
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
    const targetPlayerCard = imState.getIn(['players', action.target, 'hand', 0]);
    if (targetPlayerCard === action.guess) {
      return eliminatePlayer(imState, action.target);
    } else {
      return imState;
    }
  },
  [cards.PRIEST]: (imState, action) => imState,
  [cards.BARON]: (imState, action) => {
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
    return switchCards(imState, action.acting, action.target);
  },
  [cards.COUNTESS]: (imState, action) => imState,
  [cards.PRINCESS]: (imState, action) => {
    return eliminatePlayer(imState, action.acting);
  }
};

export function createInitialState(players) {

  //Player order is random
  const order = _.shuffle(players);

  const deck = _.shuffle([
    ...times(5, () => cards.GUARD),
    ...times(2, () => cards.PRIEST),
    ...times(2, () => cards.BARON),
    ...times(2, () => cards.HANDMAIDEN),
    ...times(2, () => cards.PRINCE),
    cards.KING,
    cards.COUNTESS,
    cards.PRINCESS
  ]);

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

  return prepareNextTurn(imState).toJS();
}