import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import FrontPage from './components/FrontPage';
import Lobby from './containers/LobbyContainer';
import CreateGame from './containers/CreateGameContainer';
import Game from './containers/GameContainer';
import About from './components/About';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    <Route path="lobby" component={Lobby} />
    <Route path="create" component={CreateGame} />
    <Route path="game/:id" component={Game} />
    <Route path="about" component={About} />
    <Route path="*" component={NotFound} />
  </Route>
);
