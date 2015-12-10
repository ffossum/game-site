import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import store from './store/store';
import history from './history';
import routes from './routes';
import {logIn} from './actions/loginActions';

import './stylesheets/main.scss';

const storedLogin = localStorage.getItem('login');
if (storedLogin) {
  const username = JSON.parse(storedLogin).name;
  store.dispatch(logIn(username));
}

ReactDOM.render((
  <div>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
    {
      () => {
        if (__DEVELOPMENT__) {
          const DevTools = require('./DevTools');
          return (
            <Provider store={store}>
              <DevTools />
            </Provider>
          );
        }
      }()
    }
  </div>
), document.getElementById('root'));
