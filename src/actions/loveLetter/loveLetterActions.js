import {performGameAction} from '../gameActions';

export function playCard(userId, gameId, card, options = {}) {
  return performGameAction({
    user: {id: userId},
    game: {id: gameId},
    action: {
      card,
      ...options
    }
  });
};