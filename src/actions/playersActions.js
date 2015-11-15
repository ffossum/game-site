import * as types from '../constants/ActionTypes';

export function updatePlayers(payload) {
  return {
    type: types.UPDATE_PLAYERS,
    payload
  };
};