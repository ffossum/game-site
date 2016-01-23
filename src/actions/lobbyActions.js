import * as types from '../constants/ActionTypes';

export function createGame(settings) {
  return {
    type: types.CREATE_GAME_REQUEST,
    payload: settings,
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

export function updateGame(payload) {
  return {
    type: types.UPDATE_GAME,
    payload
  };
}

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
    payload,
    meta: {
      goTo: `/game/${payload.id}`
    }
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
      game: {
        id: gameId
      },
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

export function playerReconnected(payload) {
  return {
    type: types.PLAYER_RECONNECTED,
    payload
  };
}

export function playerDisconnected(payload) {
  return {
    type: types.PLAYER_DISCONNECTED,
    payload
  };
}

export function startGame(gameId) {
  return {
    type: types.START_GAME_REQUEST,
    payload: {
      game: {
        id: gameId
      }
    },
    meta: {
      socket: true
    }
  };
}

export function startGameSuccess(payload) {
  return {
    type: types.START_GAME_SUCCESS,
    payload
  };
}

export function gameStarted(payload) {
  return {
    type: types.GAME_STARTED,
    payload
  };
}
