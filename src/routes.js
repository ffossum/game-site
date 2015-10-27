import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import FrontPage from './components/FrontPage';
import Lobby from './containers/LobbyContainer';
import Game from './components/game/Game';
import About from './components/About';
import Login from './containers/LoginContainer';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    <Route path="lobby" component={Lobby} />
    <Route path="game/:id" component={Game} />
    <Route path="about" component={About} />
    <Route path="login" component={Login} />
    <Route path="*" component={NotFound} />
  </Route>
);