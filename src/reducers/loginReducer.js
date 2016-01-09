import {
  REGISTER_USER_REQUEST,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT
} from '../constants/ActionTypes';

const initialState = {
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        waiting: true
      };

    case LOG_IN_REQUEST:
      return {
        ...state,
        waiting: true
      };

    case LOG_IN_SUCCESS:
      const {user} = action.payload;
      return {
        loggedIn: true,
        username: user.name,
        id: user.id
      };

    case LOG_IN_FAILURE:
      return {
        ...state,
        loggedIn: state.loggedIn,
        error: action.payload
      };

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};
