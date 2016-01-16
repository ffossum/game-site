import * as chatActions from '../actions/chatActions';
import * as lobbyActions from '../actions/lobbyActions';
import * as gameActions from '../actions/gameActions';
import * as types from '../constants/ActionTypes';
import {each} from 'lodash';

const actions = {
  [types.NEW_MESSAGE]: data => chatActions.newMessage(data),

  [types.UPDATE_GAMES]: data => lobbyActions.updateGames(data),
  [types.CREATE_GAME_SUCCESS]: data => lobbyActions.createGameSuccess(data),
  [types.GAME_CREATED]: data => lobbyActions.gameCreated(data),
  [types.JOIN_GAME_SUCCESS]: data => lobbyActions.joinGameSuccess(data),
  [types.PLAYER_JOINED]: data => lobbyActions.playerJoined(data),
  [types.LEAVE_GAME_SUCCESS]: data => lobbyActions.leaveGameSuccess(data),
  [types.PLAYER_LEFT]: data => lobbyActions.playerLeft(data),

  [types.NEW_GAME_MESSAGE]: data => lobbyActions.newGameMessage(data),

  [types.PLAYER_RECONNECTED]: data => lobbyActions.playerReconnected(data),
  [types.PLAYER_DISCONNECTED]: data => lobbyActions.playerDisconnected(data),

  [types.START_GAME_SUCCESS]: data => lobbyActions.startGameSuccess(data),
  [types.GAME_STARTED]: data => lobbyActions.gameStarted(data),

  [types.UPDATE_GAME_STATE]: data => gameActions.updateGameState(data)
};

export function addAll(store, socket) {
  each(actions, (action, key) => {
    socket.on(key, data => {
      store.dispatch(action(data, store));
    });
  });
}
