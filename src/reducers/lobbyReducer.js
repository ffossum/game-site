import * as types from '../constants/ActionTypes';
import _ from 'underscore';

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
      return {
        games: {...state.games,
          [action.payload.id]: _.omit(action.payload, 'id')
        }
      };

    default:
      return state;
  }
}
