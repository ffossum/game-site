import store from '../store/store';
import {findWhere} from 'lodash';
import * as errors from './Errors';
import * as messageKeys from './GameMessages';

export default {
  [errors.USERNAME_TAKEN]: 'Username already taken.',
  [errors.USER_NOT_FOUND]: 'User not found.'
};

function getPlayerName(userId) {
  return findWhere(store.getState().players, {id: userId}).name;
}

const messageTexts = {
  [messageKeys.PLAYER_JOINED]: userId => `${getPlayerName(userId)} has joined the game.`,
  [messageKeys.PLAYER_LEFT]: userId => `${getPlayerName(userId)} has left.`,
  [messageKeys.PLAYER_RECONNECTED]: userId => `${getPlayerName(userId)} has reconnected.`,
  [messageKeys.PLAYER_DISCONNECTED]: userId => `${getPlayerName(userId)} has disconnected.`,
  [messageKeys.GAME_STARTED]: () => 'The game has started',

  [messageKeys.USED_CARD]: (userId, card) => `${getPlayerName(userId)} used ${card}`
};

export function getMessageText(key, args = []) {
  return messageTexts[key](...args);
}
