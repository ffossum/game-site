import {compose, createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import {syncReduxAndRouter} from 'redux-simple-router';
import socketMiddleware from './socketMiddleware';
import historyMiddleware from './historyMiddleware';
import localStorageMiddleware from './localStorageMiddleware';
import thunk from 'redux-thunk';
import * as socketListeners from './socketListeners';
import history from '../history';
import socket from '../socket';

let storeEnhancers = [
  applyMiddleware(
    thunk,
    socketMiddleware(socket),
    historyMiddleware(history),
    localStorageMiddleware
  )
];

if (__DEVELOPMENT__) {
  const DevTools = require('../DevTools');
  const {persistState} = require('redux-devtools');
  storeEnhancers = [...storeEnhancers,
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ];
}

const finalCreateStore = compose(...storeEnhancers)(createStore);
const store = finalCreateStore(reducer);

syncReduxAndRouter(history, store);

socketListeners.addAll(socket, store);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers');
    store.replaceReducer(nextReducer);
  });

  module.hot.accept('./socketListeners', () => {
    socket.off();
    const newListeners = require('./socketListeners');
    newListeners.addAll(socket, store);
  });
}

export default store;
