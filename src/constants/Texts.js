import store from '../store/store';
import {findWhere} from 'lodash';
import * as errors from './Errors';
import * as messageKeys from './GameMessages';
import {cards} from '../games/love-letter/constants/cards';

const cardTexts = {
  [cards.GUARD]: {
    title: 'Guard'
  },
  [cards.PRIEST]: {
    title: 'Priest'
  },
  [cards.BARON]: {
    title: 'Baron'
  },
  [cards.HANDMAIDEN]: {
    title: 'Handmaiden'
  },
  [cards.PRINCE]: {
    title: 'Prince'
  },
  [cards.KING]: {
    title: 'King'
  },
  [cards.COUNTESS]: {
    title: 'Countess'
  },
  [cards.PRINCESS]: {
    title: 'Princess'
  }
};

export default {
  [errors.USERNAME_TAKEN]: 'Username already taken.',
  [errors.USER_NOT_FOUND]: 'User not found.',

  ...cardTexts
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

  [messageKeys.GUARD_CORRECT]: (userId, targetId, card) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.GUARD].title}.\n
      ${userName} guesses ${targetName} has a ${cardTexts[card].title}.\n
      The guess is correct! ${targetName} is eliminated!`;
  },
  [messageKeys.GUARD_WRONG]: (userId, targetId, card) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.GUARD].title}.\n
      ${userName} guesses ${targetName} has a ${cardTexts[card].title}.\n
      The guess is wrong!`;
  },
  [messageKeys.USED_PRIEST]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.PRIEST].title}.\n
      ${userName} looks at ${targetName}'s hand.`;
  },
  [messageKeys.HAS_CARD]: (userId, card) => `${getPlayerName(userId)} has a ${cardTexts[card].title}.`,
  [messageKeys.BARON_SUCCESS]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.BARON].title}.\n
      ${userName} compares hands with ${targetName}.\n
      ${targetName} is eliminated!`;
  },
  [messageKeys.BARON_FAIL]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.BARON].title}.\n
      ${userName} compares hands with ${targetName}.\n
      ${userName} is eliminated!`;
  },
  [messageKeys.BARON_DRAW]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.BARON].title}.\n
      ${userName} compares hands with ${targetName}.\n
      They have the same hand!`;
  },
  [messageKeys.USED_HANDMAIDEN]: (userId) => {
    const userName = getPlayerName(userId);
    return `${userName} plays ${cardTexts[cards.HANDMAIDEN].title}.\n
      ${userName} is protected until their next turn.`;
  },
  [messageKeys.USED_PRINCE]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.PRINCE].title}.\n
      ${targetName} discards their hand and draws a card.`;
  },
  [messageKeys.USED_PRINCE_ON_PRINCESS]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.PRINCE].title}.\n
      ${targetName} discards the ${cardTexts[cards.PRINCESS].title} and is eliminated!`;
  },
  [messageKeys.USED_KING]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.PRINCE].title}.\n
      ${targetName} discards their hand and draws a card.`;
  },
  [messageKeys.USED_COUNTESS]: userId =>
    `${getPlayerName(userId)} plays ${cardTexts[cards.COUNTESS].title}.`,
  [messageKeys.USED_PRINCESS]: userId =>
    `${getPlayerName(userId)} plays ${cardTexts[cards.PRINCESS].title} and is eliminated.`,
};

export function getMessageText(key, args = []) {
  return messageTexts[key](...args);
}
