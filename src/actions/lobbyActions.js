import * as types from '../constants/ActionTypes';

export function createGame() {
  return {
    type: types.CREATE_GAME_REQUEST,
    meta: {
      socket: true
    }
  };
};

export function createGameSuccess(payload) {
  return {
    type: types.CREATE_GAME_SUCCESS,
    payload,
    meta: {
      goTo: `/game/${payload.id}`
    }
  };
};

export function gameCreated(payload) {
  return {
    type: types.GAME_CREATED,
    payload
  };
}

export function updateGames(payload) {
  return {
    type: types.UPDATE_GAMES,
    payload
  };
};

export function joinGame(gameId) {
  return {
    type: types.JOIN_GAME_REQUEST,
    payload: gameId,
    meta: {
      socket: true
    }
  };
}

export function joinGameSuccess(payload) {
  return {
    type: types.JOIN_GAME_SUCCESS,
    payload
  };
}

export function playerJoined(payload) {
  return {
    type: types.PLAYER_JOINED,
    payload
  };
}

export function leaveGame(gameId) {
  return {
    type: types.LEAVE_GAME_REQUEST,
    payload: gameId,
    meta: {
      socket: true
    }
  };
}

export function leaveGameSuccess(payload) {
  return {
    type: types.LEAVE_GAME_SUCCESS,
    payload
  };
};

export function playerLeft(payload) {
  return {
    type: types.PLAYER_LEFT,
    payload
  };
};

export function sendGameMessage(gameId, user, text) {
  return {
    type: types.SEND_GAME_MESSAGE,
    payload: {
      id: gameId,
      msg: {
        user,
        text
      }
    },
    meta: {
      socket: true
    }
  };
}

export function newGameMessage(payload) {
  return {
    type: types.NEW_GAME_MESSAGE,
    payload
  };
}