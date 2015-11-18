import * as types from '../constants/ActionTypes';
import gameReducer from './game';

const initialState = {};

export default function games(state = initialState, action) {
  switch (action.type) {

    case types.UPDATE_GAMES:
      return action.payload;

    case types.GAME_CREATED:
    case types.LEAVE_GAME_SUCCESS:
    case types.CREATE_GAME_SUCCESS:
    case types.JOIN_GAME_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case types.PLAYER_JOINED:
    case types.PLAYER_LEFT:
    case types.PLAYER_RECONNECTED:
    case types.PLAYER_DISCONNECTED:
    case types.NEW_GAME_MESSAGE:
    case types.SEND_GAME_MESSAGE:
    case types.START_GAME_REQUEST:
    case types.START_GAME_SUCCESS:
    case types.GAME_STARTED:
    case types.UPDATE_GAME_STATE: {
      return {
        ...state,
        [action.payload.game.id]: gameReducer(state[action.payload.game.id], action)
      };
    }

    default:
      return state;
  }
}
