import * as gameActions from '../../../actions/gameActions';

export function playCard(userId, gameId, card, options = {}) {
  return gameActions.performGameAction({
    user: {id: userId},
    game: {id: gameId},
    action: {
      card,
      ...options
    }
  });
};

export const closeGameModal = gameActions.closeGameModal;
