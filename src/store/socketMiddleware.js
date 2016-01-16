import {getCurrentSocket} from '../socket';

export default store => next => action => {
  if (action.meta && action.meta.socket) {
    const socket = getCurrentSocket();
    socket.emit(action.type, action.payload);
  }
  next(action);
};
