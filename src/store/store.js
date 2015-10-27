import {compose, createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import createHistory from 'history/lib/createBrowserHistory';
import {reduxReactRouter} from 'redux-router';
import socketMiddleware from './socketMiddleware';
import * as socketListeners from './socketListeners';
import socket from './socket';
import routes from '../routes';

let storeEnhancers = [
  reduxReactRouter({
    routes,
    createHistory
  }),
  applyMiddleware(
    socketMiddleware(socket)
  )
];

if (__DEVELOPMENT__) {
  const {devTools, persistState} = require('redux-devtools');
  storeEnhancers = [...storeEnhancers,
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ];
}

const finalCreateStore = compose(...storeEnhancers)(createStore);

const store = finalCreateStore(reducer);
export default store;

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
