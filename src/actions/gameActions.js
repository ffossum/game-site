import * as types from '../constants/ActionTypes';

export function updateGameState(payload) {
  return {
    type: types.UPDATE_GAME_STATE,
    payload
  };
};