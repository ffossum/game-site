const _ = require('underscore');
const Immutable = require('immutable');
const cards = require('./loveLetterCards');

function userMayTakeAction(state, action, cardName) {
  const actingPlayer = _.findWhere(state.players, {name: state.toAct});
  return state.toAct === action.acting && _.contains(actingPlayer.hand, cardName);
}

function moveToDiscards(imState, cardName) {
  const players = imState.get('players');
  const actingPlayer = players.find(player => player.get('name') === imState.get('toAct'));
  const actingPlayerIndex = players.indexOf(actingPlayer);
  const cardIndex = actingPlayer.get('hand').indexOf(cardName);

  return imState
    .deleteIn(['players', actingPlayerIndex, 'hand', cardIndex])
    .updateIn(['players', actingPlayerIndex, 'discards'], discards => discards.push(cardName));
}

function getNextPlayerToAct(imState) {
  const alivePlayers = imState.get('players').filter(player => player.get('hand').size > 0);
  const actingPlayerIndex = alivePlayers.findIndex(player => player.get('name') === imState.get('toAct'));
  const nextAlivePlayerIndex = (actingPlayerIndex + 1) % alivePlayers.size;
  return alivePlayers.get(nextAlivePlayerIndex);
}

function drawCard(imState, player) {
  const playerIndex = imState.get('players').indexOf(player);
  const topCard = imState.get('deck').last();
  return imState
    .update('deck', deck => deck.pop())
    .updateIn(['players', playerIndex, 'hand'], hand => hand.push(topCard));
}

function eliminatePlayer(imState, player) {
  const playerIndex = imState.get('players').indexOf(player);
  return imState
    .updateIn(['players', playerIndex, 'discards'],
      discards => discards.push(player.get('hand').first()))
    .updateIn(['players', playerIndex, 'hand'], hand => []);
}

function prepareNextTurn(imState) {
  const nextPlayerToAct = getNextPlayerToAct(imState);

  imState = imState.update('toAct', toAct => nextPlayerToAct.get('name'));
  imState = drawCard(imState, nextPlayerToAct);

  return imState;
}

module.exports = {
  createInitialState(players) {

    //Player order is random
    players = _.shuffle(players);

    const deck = _.shuffle([
      ..._(5).times(() => 'guard'),
      ..._(2).times(() => 'priest'),
      ..._(2).times(() => 'baron'),
      ..._(2).times(() => 'handmaiden'),
      ..._(2).times(() => 'prince'),
      'king',
      'countess',
      'princess'
    ]);

    const playerStates = players.map(player => ({
      name: player,
      score: 0,
      hand: [deck.pop()],
      discards: []
    }));

    //First player draws a card
    playerStates[0].hand.push(deck.pop());

    return {
      toAct: playerStates[0].name,
      players: playerStates,
      deck: deck
    };
  },

  useGuard(state, action) {
    if (!userMayTakeAction(state, action, 'guard')) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, 'guard');

    const targetPlayer = _.findWhere(state.players, {name: action.target});
    if (targetPlayer.hand[0] === action.guess) {
      const targetPlayerIndex = _.indexOf(state.players, targetPlayer);

      imState = imState
        .updateIn(['players', targetPlayerIndex, 'discards'], discards => discards.push(targetPlayer.hand[0]))
        .updateIn(['players', targetPlayerIndex, 'hand'], hand => []);
    }

    return prepareNextTurn(imState).toJS();
  },

  usePriest(state) {
    if (!userMayTakeAction(state, action, 'priest')) {
      return state;
    }

    let imState = Immutable.fromJS(state);
    imState = moveToDiscards(imState, 'priest');

    return prepareNextTurn(imState).toJS();
  },

  useBaron(state, action) {
    if (!userMayTakeAction(state, action, 'baron')) {
      return state;
    }

    let imState = Immutable.fromJS(state);

    imState = moveToDiscards(imState, 'baron');

    const actingPlayer = imState.get('players').find(player => player.get('name') === imState.get('toAct'));
    const actingPlayerCardValue = cards[actingPlayer.get('hand').first()].value;

    const targetPlayer = imState.get('players').find(player => player.get('name') === action.target);
    const targetPlayerCardValue = cards[targetPlayer.get('hand').first()].value;

    if (actingPlayerCardValue > targetPlayerCardValue) {
      imState = eliminatePlayer(imState, targetPlayer);
    } else if (actingPlayerCardValue < targetPlayerCardValue) {
      imState = eliminatePlayer(imState, actingPlayer);
    }

    return prepareNextTurn(imState).toJS();
  }
};