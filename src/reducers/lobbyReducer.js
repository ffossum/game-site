import * as types from '../constants/ActionTypes';
import * as status from '../constants/GameStatus';
import _ from 'underscore';
import Immutable, {List} from 'immutable';

const initialState = {};

export default function games(state = initialState, action) {
  switch (action.type) {

    case types.UPDATE_GAMES:
      return action.payload;

    case types.GAME_CREATED:
    case types.LEAVE_GAME_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case types.CREATE_GAME_SUCCESS:
    case types.JOIN_GAME_SUCCESS: {
      const game = _.extend({}, action.payload, {messages: []});
      return {
        ...state,
        [action.payload.id]: game
      };
    }

    case types.PLAYER_JOINED: {
      const gameId = action.payload.game.id;
      const username = action.payload.user.name;

      return Immutable.fromJS(state)
        .updateIn([gameId, 'players'],
          players => players.push(username))
        .updateIn([gameId, 'messages'],
          messages => (messages || new List()).push({text: `${username} has joined the game.`}))
        .toJS();
    }

    case types.PLAYER_LEFT: {
      const gameId = action.payload.game.id;
      const username = action.payload.user.name;

      return Immutable.fromJS(state)
        .updateIn([gameId, 'players'],
          players => players.filter(player => player !== username))
        .updateIn([gameId, 'messages'],
          messages => (messages || new List()).push({text: `${username} has left the game.`}))
        .toJS();
    }

    case types.PLAYER_RECONNECTED: {
      const gameId = action.payload.game.id;
      const username = action.payload.user.name;

      return Immutable.fromJS(state)
        .updateIn([gameId, 'messages'],
          messages => (messages || new List()).push({text: `${username} has reconnected.`}))
        .toJS();
    }

    case types.PLAYER_DISCONNECTED: {
      const gameId = action.payload.game.id;
      const username = action.payload.user.name;

      return Immutable.fromJS(state)
        .updateIn([gameId, 'messages'],
          messages => (messages || new List()).push({text: `${username} has disconnected.`}))
        .toJS();
    }

    case types.NEW_GAME_MESSAGE:
    case types.SEND_GAME_MESSAGE: {
      return Immutable.fromJS(state)
        .updateIn([action.payload.id, 'messages'],
          messages => (messages || new List()).push(action.payload.msg))
        .toJS();
    }

    case types.START_GAME_REQUEST: {
      return Immutable.fromJS(state)
        .setIn([action.payload, 'status'], status.STARTING)
        .toJS();
    }

    case types.START_GAME_SUCCESS:
    case types.GAME_STARTED: {
      return Immutable.fromJS(state)
        .updateIn([action.payload, 'messages'],
          messages => (messages || new List()).push({text: 'The game has started.'}))
        .setIn([action.payload, 'status'], status.IN_PROGRESS)
        .toJS();
    }

    default:
      return state;
  }
}
