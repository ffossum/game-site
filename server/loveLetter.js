import _ from 'underscore';
import Immutable from 'immutable';
import {cards, values} from './loveLetterCards';

function userMayTakeAction(state, action, cardName) {
  const actingPlayer = state.players[action.acting];
  const targetPlayer = state.players[action.target];

  return (state.toAct === action.acting) &&
    _.contains(actingPlayer.hand, cardName) &&
    (!targetPlayer || !targetPlayer.protected);
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
  imState = drawCard(imState, nextPlayerId);

  return imState;
}

export default {
  createInitialState(players) {

    //Player order is random
    const order = _.shuffle(players);

    const deck = _.shuffle([
      ..._(5).times(() => cards.GUARD),
      ..._(2).times(() => cards.PRIEST),
      ..._(2).times(() => cards.BARON),
      ..._(2).times(() => cards.HANDMAIDEN),
      ..._(2).times(() => cards.PRINCE),
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
  },

  asVisibleBy(state, playerId) {
    const players = _.mapObject(state.players, (player, name) => ({
      ...player,
      hand: (name === playerId) ? player.hand : _.map(player.hand, card => cards.FACE_DOWN)
    }));

    return {
      ...state,
      players: players,
      deck: state.deck.length
    };
  },

  useGuard(state, action) {
    if (!userMayTakeAction(state, action, cards.GUARD)) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, cards.GUARD);
    imState = imState.deleteIn(['players', action.acting, 'protected']);

    const targetPlayer = state.players[action.target];
    if (targetPlayer.hand[0] === action.guess) {
      imState = eliminatePlayer(imState, action.target);
    }

    return prepareNextTurn(imState).toJS();
  },

  usePriest(state, action) {
    if (!userMayTakeAction(state, action, cards.PRIEST)) {
      return state;
    }

    let imState = Immutable.fromJS(state);
    imState = moveToDiscards(imState, cards.PRIEST);
    imState = imState.deleteIn(['players', action.acting, 'protected']);

    return prepareNextTurn(imState).toJS();
  },

  useBaron(state, action) {
    if (!userMayTakeAction(state, action, cards.BARON)) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, cards.BARON);
    imState = imState.deleteIn(['players', action.acting, 'protected']);

    const actingPlayerCardValue = values[state.players[action.acting].hand[0]];
    const targetPlayerCardValue = values[state.players[action.target].hand[0]];

    if (actingPlayerCardValue > targetPlayerCardValue) {
      imState = eliminatePlayer(imState, action.target);
    } else if (actingPlayerCardValue < targetPlayerCardValue) {
      imState = eliminatePlayer(imState, action.acting);
    }

    return prepareNextTurn(imState).toJS();
  },

  useHandmaiden(state, action) {
    if (!userMayTakeAction(state, action, cards.HANDMAIDEN)) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, cards.HANDMAIDEN);
    imState = imState.setIn(['players', action.acting, 'protected'], true);

    return prepareNextTurn(imState).toJS();
  },

  usePrince(state, action) {
    if (!userMayTakeAction(state, action, cards.PRINCE)) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, cards.PRINCE);
    imState = imState.deleteIn(['players', action.acting, 'protected']);

    imState = discardHand(imState, action.target);
    imState = drawCard(imState, action.target);

    return prepareNextTurn(imState).toJS();
  },

  useKing(state, action) {
    if (!userMayTakeAction(state, action, cards.KING)) {
      return state;
    }

    let imState = Immutable.fromJS(state);
    imState = moveToDiscards(imState, cards.KING);
    imState = imState.deleteIn(['players', action.acting, 'protected']);

    imState = switchCards(imState, action.acting, action.target);

    return prepareNextTurn(imState).toJS();
  }
};