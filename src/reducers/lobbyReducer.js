import * as types from '../constants/ActionTypes';
import _ from 'underscore';
import Immutable from 'immutable';

const initialState = {
  games: {}
};

export default function chat(state = initialState, action) {
  switch (action.type) {

    case types.UPDATE_GAMES:
      return {
        games: action.payload
      };

    case types.CREATE_GAME_SUCCESS:
    case types.GAME_CREATED:
    case types.JOIN_GAME_SUCCESS:
    case types.PLAYER_JOINED:
      return {
        games: {...state.games,
          [action.payload.id]: _.omit(action.payload, 'id')
        }
      };

    case types.NEW_GAME_MESSAGE:
    case types.SEND_GAME_MESSAGE: {
      const immutableState = Immutable.fromJS(state);

      return immutableState.updateIn(['games', action.payload.id, 'messages'],
        messages => messages.push(action.payload.msg)).toJS();
    }

    default:
      return state;
  }
}
