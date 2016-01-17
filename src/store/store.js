import {compose, createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import {syncHistory} from 'redux-simple-router';
import socketMiddleware from './socketMiddleware';
import historyMiddleware from './historyMiddleware';
import thunk from 'redux-thunk';
import * as socketListeners from './socketListeners';
import history from '../history';
import {getCurrentSocket} from '../socket';

const reduxRouterMiddleware = syncHistory(history);

let storeEnhancers = [
  applyMiddleware(
    thunk,
    socketMiddleware,
    reduxRouterMiddleware,
    historyMiddleware(history)
  )
];

if (__DEVELOPMENT__) {
  const DevTools = require('../DevTools').default;
  const {persistState} = require('redux-devtools');
  storeEnhancers = [...storeEnhancers,
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ];
}

const finalCreateStore = compose(...storeEnhancers)(createStore);
const store = finalCreateStore(reducer, window.__INITIAL_STATE__);

if (__DEVELOPMENT__) {
  reduxRouterMiddleware.listenForReplays(store);
}
socketListeners.addAll(store, getCurrentSocket());

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers').default;
    store.replaceReducer(nextReducer);
  });

  module.hot.accept('./socketListeners', () => {
    const socket = getCurrentSocket();
    socket.off();
    const newListeners = require('./socketListeners').default;
    newListeners.addAll(store, socket);
  });
}

export default store;
