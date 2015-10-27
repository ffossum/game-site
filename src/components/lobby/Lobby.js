import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';
import _ from 'underscore';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.createGame = this.createGame.bind(this);
  }
  createGame() {
    const {createGame} = this.props;
    const {loggedIn} = this.props.login;

    if (loggedIn) {
      createGame();
    }
  }
  render() {
    const {loggedIn} = this.props.login;
    const {games} = this.props.lobby;

    return (
      <div>
        <h1>Lobby</h1>
        <Button
          onClick={this.createGame}
          disabled={!loggedIn}>
          Create game
        </Button>
        <ul>
          {
            _.map(games, (game, id) => {
              return (
                <li key={id}>
                  <Link to={`/game/${id}`}>{id}</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
};