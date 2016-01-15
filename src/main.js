import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import store from './store/store';
import history from './history';
import routes from './serverRoutes';
import {logInWithToken} from './actions/loginActions';

import './stylesheets/main.scss';

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('root'));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(logInWithToken(token));
}

if (__DEVELOPMENT__) {
  const DevTools = require('./DevTools');
  ReactDOM.render((
    <Provider store={store}>
      <DevTools />
    </Provider>
  ), document.getElementById('dev-tools'));
}
