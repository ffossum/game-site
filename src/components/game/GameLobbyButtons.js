import React, {PropTypes} from 'react';
import {Button, Spinner} from '../common';
import _ from 'lodash';
import * as status from '../../constants/GameStatus';

export default class GameLobbyButtons extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  joinGame() {
    const {game, joinGame} = this.props;

    joinGame(game.id);
  }
  leaveGame() {
    const {game, leaveGame} = this.props;

    leaveGame(game.id);
  }
  startGame() {
    const {game, startGame} = this.props;
    const userId = this.props.login.id;

    if (game.host === userId) {
      startGame(game.id);
    }
  }

  render() {
    const {game} = this.props;
    const {id, loggedIn}= this.props.login;
    const inGame = _.contains(game.players, id);
    const host = game.host === id;
    const inProgress = game.status === status.IN_PROGRESS;

    if (inProgress) {
      return null;
    }

    if (!inGame) {
      return (
        <div className="form-group">
          <Button
            onClick={this.joinGame}
            disabled={!loggedIn}>
            Join game
          </Button>
        </div>
      );
    }

    return (
      <div className="form-group">
        {
          () => {
            if (!inProgress) {
              return host ?
                <Button
                  onClick={this.startGame}
                  disabled={game.players.length < 2 || game.status === status.STARTING}
                  btnStyle="success">
                  {game.status === status.STARTING ? <span><Spinner /> Starting game...</span> : 'Start game'}
                </Button>
                :
                <Button
                  onClick={this.leaveGame}
                  disabled={!loggedIn}>
                  Leave game
                </Button>;
            }
          }()
        }
      </div>
    );
  }
};

GameLobbyButtons.propTypes = {
  login: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};
