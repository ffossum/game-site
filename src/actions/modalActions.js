import * as type from '../constants/ActionTypes';

export function openLoginModal() {
  return {type: type.OPEN_LOGIN_MODAL};
}

export function openRegisterModal() {
  return {type: type.OPEN_REGISTER_MODAL};
}

export function closeModal() {
  return {type: type.CLOSE_MODAL};
}
