// polyfill webpack require.ensure for server side rendering
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getFrontPage} />
    <Route path="lobby" getComponent={getLobby} />
    <Route path="create" getComponent={getCreateGame} />
    <Route path="game/:id" getComponent={getGame} />
    <Route path="about" getComponent={getAbout} />
    <Route path="*" component={NotFound} />
  </Route>
);

function getFrontPage(location, cb) {
  require.ensure([], require => {
    cb(null, require('./components/FrontPage').default);
  });
}

function getLobby(location, cb) {
  require.ensure([], require => {
    cb(null, require('./containers/LobbyContainer').default);
  });
}

function getCreateGame(location, cb) {
  require.ensure([], require => {
    cb(null, require('./containers/CreateGameContainer').default);
  });
}

function getGame(location, cb) {
  require.ensure([], require => {
    cb(null, require('./containers/GameContainer').default);
  });
}

function getAbout(location, cb) {
  require.ensure([], require => {
    cb(null, require('./components/About').default);
  });
}
