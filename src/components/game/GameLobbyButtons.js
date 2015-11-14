import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import _ from 'underscore';
import Spinner from '../common/Spinner';
import * as status from '../../constants/GameStatus';

export default class GameLobbyButtons extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  joinGame() {
    const {gameId, joinGame} = this.props;

    joinGame(gameId);
  }
  leaveGame() {
    const {gameId, leaveGame} = this.props;

    leaveGame(gameId);
  }
  startGame() {
    const {gameId, game, startGame} = this.props;
    const {username} = this.props.login;

    if (game.host === username) {
      startGame(gameId);
    }
  }

  render() {
    const {game} = this.props;
    const {username, loggedIn}= this.props.login;
    const inGame = _.contains(game.players, username);
    const host = game.host === username;
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
                  bsStyle="success">
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
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};