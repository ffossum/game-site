import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT} from '../constants/ActionTypes';
import _ from 'underscore';

const initialState = {
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        waiting: true,
        username: action.payload
      };

    case LOG_IN_SUCCESS:
      return _.chain(state)
        .pick('username')
        .extend({loggedIn: true})
        .value();

    case LOG_IN_FAILURE:
      return _.chain(state)
        .pick('username')
        .extend({error: action.payload})
        .value();

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};