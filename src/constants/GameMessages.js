import store from '../store/store';
import {findWhere} from 'lodash';

export const PLAYER_JOINED = 'PLAYER_JOINED';
export const PLAYER_LEFT = 'PLAYER_LEFT';
export const PLAYER_RECONNECTED = 'PLAYER_RECONNECTED';
export const PLAYER_DISCONNECTED = 'PLAYER_DISCONNECTED';
export const GAME_STARTED = 'GAME_STARTED';

function getPlayerName(userId) {
  return findWhere(store.getState().players, {id: userId}).name;
}

const texts = {
  [PLAYER_JOINED]: userId => `${getPlayerName(userId)} has joined the game.`,
  [PLAYER_LEFT]: userId => `${getPlayerName(userId)} has left.`,
  [PLAYER_RECONNECTED]: userId => `${getPlayerName(userId)} has reconnected.`,
  [PLAYER_DISCONNECTED]: userId => `${getPlayerName(userId)} has disconnected.`,
  [GAME_STARTED]: () => 'The game has started'
};

export function getText(key, args = []) {
  return texts[key](...args);
}