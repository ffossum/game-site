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
    payload
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