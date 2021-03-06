import * as types from '../constants/ActionTypes';
import gameReducer from './game';
import {mapValues, pick} from 'lodash';
import {updateGame} from '../actions/lobbyActions';

const initialState = {};

export default function games(state = initialState, action) {
  switch (action.type) {

    case types.UPDATE_GAMES: {
      const existingGames = pick(state, (game, gameId) => action.payload[gameId]);
      const newGames = pick(action.payload, (game, gameId) => !state[gameId]);

      return {
        ...mapValues(existingGames, (game, gameId) => {
          return gameReducer(game, updateGame(action.payload[gameId]));
        }),
        ...newGames
      };
    }
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
    case types.UPDATE_GAME_STATE:
    case types.CLOSE_GAME_MODAL: {
      return {
        ...state,
        [action.payload.game.id]: gameReducer(state[action.payload.game.id], action)
      };
    }

    case types.LOG_OUT:
      return mapValues(state, game => gameReducer(game, action));

    default:
      return state;
  }
}
