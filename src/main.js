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
          const {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
          return (
            <DebugPanel top right bottom>
              <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
          );
        }
      }()
    }
  </div>
), document.getElementById('root'));
