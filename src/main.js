import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import store from './store/store';
import routes from './routes';

import './stylesheets/main.scss';

ReactDOM.render((
  <div>
    <Provider store={store}>
      <ReduxRouter>
        {routes}
      </ReduxRouter>
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
