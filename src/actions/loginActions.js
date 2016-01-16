import * as type from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import * as errorType from '../constants/Errors';

export function registerUser(email, username, password, repeat) {
  return dispatch => {
    if (password !== repeat) {
      dispatch(registerUserFailure({password: errorType.PASSWORDS_DO_NOT_MATCH}));
    } else {
      dispatch(registerUserRequest());
      fetch('/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({email, username, password})
      }).then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            dispatch(logInSuccess(json));

            require('../socket').reconnect();
          });
        } else {
          response.json().then(json => {
            dispatch(registerUserFailure(json));
          });
        }
      });
    }
  };
}

function registerUserRequest() {
  return {
    type: type.REGISTER_USER_REQUEST
  };
}

function registerUserFailure(error) {
  return {
    type: type.REGISTER_USER_FAILURE,
    payload: error
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
      credentials: 'same-origin',
      body: JSON.stringify({
        username,
        password
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          dispatch(logInSuccess(json));

          require('../socket').reconnect();
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

export function logInSuccess(user) {
  return {
    type: type.LOG_IN_SUCCESS,
    payload: {
      user
    }
  };
}

export function logInFailure(error) {
  return {
    type: type.LOG_IN_FAILURE,
    payload: error
  };
}

export function logOut() {
  return dispatch => {
    fetch('/logout', {
      method: 'post',
      credentials: 'same-origin'
    });
    dispatch({
      type: type.LOG_OUT,
      meta: {
        socket: true
      }
    });
  };
}
