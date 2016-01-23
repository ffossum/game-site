import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {match, Router} from 'react-router';
import history from './history';
import routes from './routes';

import './stylesheets/main.scss';

const {pathname, search, hash} = window.location;
const location = `${pathname}${search}${hash}`;

match({routes, location}, () => {
  const store = require('./store/store').default;

  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  ), document.getElementById('root'));

  if (__DEVELOPMENT__) {
    const DevTools = require('./DevTools').default;
    ReactDOM.render((
      <Provider store={store}>
        <DevTools />
      </Provider>
    ), document.getElementById('dev-tools'));
  }
});
