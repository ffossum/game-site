import * as types from '../constants/ActionTypes';

export function sendMessage(user, text) {
  return {
    type: types.SEND_MESSAGE,
    payload: {
      user,
      text
    },
    meta: {
      socket: true
    }
  };
}

export function newMessage(payload) {
  return {
    type: types.NEW_MESSAGE,
    payload: payload
  };
}