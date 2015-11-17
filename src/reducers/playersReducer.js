import * as types from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {};

export default function players(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PLAYERS: {
      return _.extend({}, state, action.payload);
    }

    case types.LOG_IN_SUCCESS: {
      const user = action.payload;
      return _.extend({}, state, {
        [user.id]: user
      });
    }

    default:
      return state;
  }
}