import store from '../store/store';
import {findWhere} from 'lodash';
import * as errors from './Errors';
import * as messageKeys from './GameMessages';
import {cards} from '../games/love-letter/constants/cards';

const cardTexts = {
  [cards.GUARD]: {
    value: '1',
    title: 'Guard',
    description: `Name a non-Guard card and choose another player.
If that player has that card, he or she is out of the round.`
  },
  [cards.PRIEST]: {
    value: '2',
    title: 'Priest',
    description: "Look at another player's hand."
  },
  [cards.BARON]: {
    value: '3',
    title: 'Baron',
    description: `You and another player secretly compare hands.
The player with the lower value is out of the round.`
  },
  [cards.HANDMAIDEN]: {
    value: '4',
    title: 'Handmaiden',
    description: "Until your next turn, ignore all effects from other players' cards."
  },
  [cards.PRINCE]: {
    value: '5',
    title: 'Prince',
    description: 'Choose any player (including yourself) to discard his or her hand and draw a new card.'
  },
  [cards.KING]: {
    value: '6',
    title: 'King',
    description: 'Trade hands with another player of your choice.'
  },
  [cards.COUNTESS]: {
    value: '7',
    title: 'Countess',
    description: 'If you have this card and the King or Prince in your hand, you must discard this card.'
  },
  [cards.PRINCESS]: {
    value: '8',
    title: 'Princess',
    description: 'If you discard this card, you are out of the round.'
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
    return `${userName} plays ${cardTexts[cards.BARON].title}.
${userName} compares hands with ${targetName}.
${targetName} is eliminated!`;
  },
  [messageKeys.BARON_FAIL]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.BARON].title}.
${userName} compares hands with ${targetName}.
${userName} is eliminated!`;
  },
  [messageKeys.BARON_DRAW]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.BARON].title}.
${userName} compares hands with ${targetName}.
They have the same hand!`;
  },
  [messageKeys.USED_HANDMAIDEN]: (userId) => {
    const userName = getPlayerName(userId);
    return `${userName} plays ${cardTexts[cards.HANDMAIDEN].title}.
${userName} is protected until their next turn.`;
  },
  [messageKeys.USED_PRINCE]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.PRINCE].title}.
${targetName} discards their hand and draws a card.`;
  },
  [messageKeys.USED_PRINCE_ON_PRINCESS]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.PRINCE].title}.
${targetName} discards the ${cardTexts[cards.PRINCESS].title} and is eliminated!`;
  },
  [messageKeys.DREW_DISCARD]: (userId) => {
    const userName = getPlayerName(userId);
    return `There were no cards in the deck, so ${userName} instead drew the card discarded at the beginning of the round.`;
  },
  [messageKeys.USED_KING]: (userId, targetId) => {
    const userName = getPlayerName(userId);
    const targetName = getPlayerName(targetId);
    return `${userName} plays ${cardTexts[cards.KING].title}.
${userName} switches hands with ${targetName}.`;
  },
  [messageKeys.USED_COUNTESS]: userId =>
    `${getPlayerName(userId)} plays ${cardTexts[cards.COUNTESS].title}.`,
  [messageKeys.USED_PRINCESS]: userId =>
    `${getPlayerName(userId)} plays ${cardTexts[cards.PRINCESS].title} and is eliminated.`,
};

export function getMessageText(key, args = []) {
  return messageTexts[key](...args);
}
