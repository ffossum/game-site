import {compose, createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import createHistory from 'history/lib/createBrowserHistory';
import {reduxReactRouter} from 'redux-router';
import socketMiddleware from './socketMiddleware';
import historyMiddleware from './historyMiddleware';
import * as socketListeners from './socketListeners';
import socket from './socket';
import globals from './globals';
import routes from '../routes';

let storeEnhancers = [
  reduxReactRouter({
    routes,
    createHistory
  }),
  applyMiddleware(
    socketMiddleware(socket),
    historyMiddleware(globals)
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

globals.history = store.history;

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