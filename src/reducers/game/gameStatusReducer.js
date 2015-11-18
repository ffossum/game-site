import * as status from '../../constants/GameStatus';
import * as types from '../../constants/ActionTypes';

const initialState = status.CREATED;

export default function gameStatus(state = initialState, action) {
  switch (action.type) {
    case types.START_GAME_REQUEST:
      return status.STARTING;

    case types.START_GAME_SUCCESS:
    case types.GAME_STARTED:
      return status.IN_PROGRESS;

    default:
      return state;
  }
}