import * as type from '../constants/ActionTypes';

export function logIn(token) {
  return {
    type: type.LOG_IN_REQUEST,
    payload: token,
    meta: {
      socket: true
    }
  };
}

export function logInSuccess(payload) {
  return {
    type: type.LOG_IN_SUCCESS,
    payload
  };
}

export function logInFailure(error) {
  return {
    type: type.LOG_IN_FAILURE,
    payload: error
  };
}

export function logOut() {
  return {
    type: type.LOG_OUT,
    meta: {
      socket: true
    }
  };
}
