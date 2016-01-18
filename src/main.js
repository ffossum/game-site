import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import store from './store/store';
import history from './history';
import routes from './serverRoutes';

if (process.env.APP_ENV === 'browser') {
  require('./stylesheets/main.scss');
}

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
