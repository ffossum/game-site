import io from 'socket.io-client';
import * as socketListeners from './store/socketListeners';
import store from './store/store';

const HOST = `${location.protocol}//${location.hostname}:8080`;
const socket = io(HOST);

const module = {
  socket
};

export function getCurrentSocket() {
  return module.socket;
}

export function reconnect() {
  module.socket.disconnect();
  module.socket = io(HOST, {forceNew: true});
  socketListeners.addAll(store, module.socket);
}
