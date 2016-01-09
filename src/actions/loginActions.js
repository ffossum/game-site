import * as type from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import * as errorType from '../constants/Errors';

export function registerUser(email, username, password) {
  return dispatch => {
    dispatch(registerUserRequest());
    fetch('/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, password})
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(json => {
      localStorage.setItem('token', json.token);
      dispatch(logInWithToken(json.token));
    });
  };
}

function registerUserRequest() {
  return {
    type: type.REGISTER_USER_REQUEST
  };
}

export function logInWithUsernameAndPassword(username, password) {
  return dispatch => {
    dispatch(getTokenRequest());
    fetch('/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          const token = json.token;
          localStorage.setItem('token', token);
          dispatch(logInWithToken(token));
        });
      } else {
        dispatch(logInFailure(errorType.AUTHENTICATION_FAILURE));
      }
    });
  };
}

function getTokenRequest() {
  return {
    type: type.GET_TOKEN_REQUEST
  };
}

export function logInWithToken(token) {
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
