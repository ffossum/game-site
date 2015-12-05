import * as types from '../../constants/ActionTypes';

const initialState = null;

export default function gameModal(state = initialState, action) {

  switch(action.type) {
    case types.UPDATE_GAME_STATE: {
      const stateInfo = action.payload.game.state.info;
      if (!_.isEmpty(stateInfo)) {
        const modalInfo = _.find(stateInfo, info => info.modal);
        if (modalInfo) {
          return modalInfo.modal;
        } else {
          return state;
        }
      }
    }

    case types.DISMISS_MODAL:
      return initialState;

    default:
      return state;
  }
};
