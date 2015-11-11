const _ = require('underscore');
const Immutable = require('immutable');
const loveLetterCards = require('./loveLetterCards');
const cards = loveLetterCards.cards;
const values = loveLetterCards.values;

function userMayTakeAction(state, action, cardName) {
  const actingPlayer = state.players[action.acting];
  const targetPlayer = state.players[action.target];

  return (state.toAct === action.acting) &&
    _.contains(actingPlayer.hand, cardName) &&
    (!targetPlayer || _.last(targetPlayer.discards) !== cards.HANDMAIDEN);
}

function moveToDiscards(imState, cardName) {
  const actingPlayerName = imState.get('toAct');
  const actingPlayer = imState.get('players').get(actingPlayerName);
  const cardIndex = actingPlayer.get('hand').indexOf(cardName);

  return imState
    .deleteIn(['players', actingPlayerName, 'hand', cardIndex])
    .updateIn(['players', actingPlayerName, 'discards'], discards => discards.push(cardName));
}

function getNextPlayerName(imState) {
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

function drawCard(imState, playerName) {
  const topCard = imState.get('deck').last();
  return imState
    .update('deck', deck => deck.pop())
    .updateIn(['players', playerName, 'hand'], hand => hand.push(topCard));
}

function eliminatePlayer(imState, playerName) {
  const player = imState.getIn(['players', playerName]);
  return imState
    .updateIn(['players', playerName, 'discards'],
      discards => discards.push(player.get('hand').first()))
    .updateIn(['players', playerName, 'hand'], hand => []);
}

function prepareNextTurn(imState) {
  const nextPlayerName = getNextPlayerName(imState);

  imState = imState.update('toAct', toAct => nextPlayerName);
  imState = drawCard(imState, nextPlayerName);

  return imState;
}

module.exports = {
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

  asVisibleBy(state, playerName) {
    const players = _.mapObject(state.players, (player, name) => ({
      ...player,
      hand: (name === playerName) ? player.hand : _.map(player.hand, card => cards.FACE_DOWN)
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

    return prepareNextTurn(imState).toJS();
  },

  useBaron(state, action) {
    if (!userMayTakeAction(state, action, cards.BARON)) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, cards.BARON);

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

    return prepareNextTurn(imState).toJS();
  }
};