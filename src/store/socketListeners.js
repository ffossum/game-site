import * as loginActions from '../actions/loginActions';
import * as chatActions from '../actions/chatActions';
import * as lobbyActions from '../actions/lobbyActions';
import * as types from '../constants/ActionTypes';
import {each} from 'underscore';

const actions = {
  [types.LOG_IN_SUCCESS]: () => loginActions.logInSuccess(),
  [types.USERNAME_TAKEN]: error => loginActions.logInFailure(error),

  [types.NEW_MESSAGE]: data => chatActions.newMessage(data),

  [types.UPDATE_GAMES]: data => lobbyActions.updateGames(data),
  [types.CREATE_GAME_SUCCESS]: data => lobbyActions.createGameSuccess(data),
  [types.GAME_CREATED]: data => lobbyActions.gameCreated(data)
};

export function addAll(socket, store) {
  each(actions, (action, key) => {
    socket.on(key, data => {
      store.dispatch(action(data, store));
    });
  });
}