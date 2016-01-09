import {
  OPEN_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  REGISTER_USER_REQUEST,
  GET_TOKEN_REQUEST,
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
    case OPEN_LOGIN_MODAL:
    case OPEN_REGISTER_MODAL: {
      const {error, ...newState} = state;
      return newState;
    }

    case GET_TOKEN_REQUEST:
    case REGISTER_USER_REQUEST: {
      const {error, ...newState} = state;
      return {
        ...newState,
        waiting: true
      };
    }

    case LOG_IN_REQUEST:
      return {
        loggedIn: false,
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
        error: action.payload,
        waiting: false
      };

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};
