import * as loginActions from '../actions/loginActions';
import * as chatActions from '../actions/chatActions';
import * as types from '../constants/ActionTypes';
import {each} from 'underscore';

const actions = {
  [types.LOG_IN_SUCCESS]: () => loginActions.logInSuccess(),
  [types.USERNAME_TAKEN]: error => loginActions.logInFailure(error),

  [types.NEW_MESSAGE]: data => chatActions.newMessage(data)
};

export function addAll(socket, store) {
  each(actions, (action, key) => {
    socket.on(key, data => {
      store.dispatch(action(data));
    });
  });
}