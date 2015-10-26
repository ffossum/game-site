import * as type from '../constants/ActionTypes';

export function logIn(username) {
  return {
    type: type.LOG_IN_REQUEST,
    payload: username,
    meta: {
      socket: true
    }
  };
}

export function logInSuccess() {
  return {
    type: type.LOG_IN_SUCCESS
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