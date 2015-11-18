import * as types from '../../constants/ActionTypes';

const initialState = null;

export default function gameState(state = initialState, action) {
  switch(action.type) {
    case types.UPDATE_GAME_STATE:
      return action.payload.game.state;

    default:
      return state;
  }
};