import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FrontPage from './components/FrontPage';
import About from './components/About';
import Login from './containers/LoginContainer';
import NotFound from './components/NotFound';
import {Provider} from 'react-redux';
import {Route, IndexRoute} from 'react-router';
import {ReduxRouter} from 'redux-router';
import store from './store/store';

import './stylesheets/main.scss';

ReactDOM.render((
  <div>
    <Provider store={store}>
      <ReduxRouter>
        <Route path="/" component={App}>
          <IndexRoute component={FrontPage} />
          <Route path="about" component={About} />
          <Route path="login" component={Login} />
          <Route path="*" component={NotFound} />
        </Route>
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
