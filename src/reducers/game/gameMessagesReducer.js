import * as types from '../../constants/ActionTypes';

const initialState = [];

export default function gameMessages(state = initialState, action) {

  switch(action.type) {
    case types.PLAYER_JOINED: {
      const userId = action.payload.user.id;
      return [...state, {text: `${userId} has joined the game.`}];
    }

    case types.PLAYER_LEFT: {
      const userId = action.payload.user.id;
      return [...state, {text: `${userId} has left the game.`}];
    }

    case types.PLAYER_RECONNECTED: {
      const userId = action.payload.user.id;
      return [...state, {text: `${userId} has reconnected.`}];
    }

    case types.PLAYER_DISCONNECTED: {
      const userId = action.payload.user.id;
      return [...state, {text: `${userId} has disconnected.`}];
    }

    case types.NEW_GAME_MESSAGE:
    case types.SEND_GAME_MESSAGE: {
      return [...state, action.payload.msg];
    }

    case types.START_GAME_SUCCESS:
    case types.GAME_STARTED: {
      return [...state, {text: 'The game has started.'}];
    }

    default:
      return state;
  }
};