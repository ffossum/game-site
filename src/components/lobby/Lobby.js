import React from 'react';
import {Button, LinkContainer, Panel} from '../common';
import GameList from './GameList';

export default class Lobby extends React.Component {
  render() {
    const {games, login, joinGame} = this.props;
    const {loggedIn} = login;

    return (
      <div className="container">
        <Panel>
          <h1>Lobby</h1>
          <div className="lobby-game-buttons">
            <LinkContainer
              disabled={!loggedIn}
              to="/create">
              <Button>Create game</Button>
            </LinkContainer>
          </div>
          <GameList login={login} games={games} joinGame={joinGame}/>
        </Panel>
      </div>
    );
  }
};
