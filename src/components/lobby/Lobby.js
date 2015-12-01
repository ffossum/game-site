import React from 'react';
import {Button, Panel} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import GameList from './GameList';

export default class Lobby extends React.Component {
  render() {
    const {games, players, loggedIn} = this.props;

    return (
      <div className="container">
        <Panel>
          <h1>Lobby</h1>
          <div className="form-group">
            <LinkContainer
              disabled={!loggedIn}
              to="/create">
              <Button>Create game</Button>
            </LinkContainer>
          </div>

          <GameList players={players} games={games} />
        </Panel>
      </div>
    );
  }
};
