import {
  OPEN_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  CLOSE_MODAL,
  LOG_IN_SUCCESS
} from '../constants/ActionTypes';

import * as modalType from '../constants/ModalTypes';
const initialState = false;

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_LOGIN_MODAL:
      return modalType.LOGIN;

    case OPEN_REGISTER_MODAL:
      return modalType.REGISTER;

    case CLOSE_MODAL:
    case LOG_IN_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
