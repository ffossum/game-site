import * as types from '../../constants/ActionTypes';
import {filter, isUndefined} from 'lodash';

const initialState = [];

export default function gamePlayers(state = initialState, action) {

  switch(action.type) {

    case types.UPDATE_GAME: {
      const {players} = action.payload;
      return isUndefined(players) ? state : players;
    }

    case types.PLAYER_JOINED: {
      const userId = action.payload.user.id;
      return [...state, userId];
    }

    case types.PLAYER_LEFT: {
      const userId = action.payload.user.id;
      return filter(state, player => player !== userId);
    }

    default:
      return state;
  }
};
