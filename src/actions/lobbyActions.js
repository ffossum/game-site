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