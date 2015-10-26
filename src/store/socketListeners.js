import * as loginActions from '../actions/loginActions';
import * as chatActions from '../actions/chatActions';
import * as errors from '../constants/Errors';
import {each} from 'underscore';

const actions = {
  'login': () => loginActions.logInSuccess(),
  'username taken': () => loginActions.logInFailure(errors.USERNAME_TAKEN),

  'new message': data => chatActions.newMessage(data)
};

export function addAll(socket, store) {
  each(actions, (action, key) => {
    socket.on(key, data => {
      store.dispatch(action(data));
    });
  });
}