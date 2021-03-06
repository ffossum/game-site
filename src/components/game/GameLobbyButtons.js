import React, {PropTypes} from 'react';
import {Button, Spinner} from '../common';
import _ from 'lodash';
import * as status from '../../constants/GameStatus';

function isStartable(game) {
  return game.players.length >= game.settings.players.required;
}

function isJoinable(game) {
  const {required, optional} = game.settings.players;
  return game.players.length < required + optional;
}

function joinGame() {
  const {game, joinGame} = this.props;
  joinGame(game.id);
}

function leaveGame() {
  const {game, leaveGame} = this.props;
  leaveGame(game.id);
};

function startGame() {
  const {game, startGame} = this.props;
  const userId = this.props.login.id;

  if (game.host === userId) {
    startGame(game.id);
  }
}

export default class GameLobbyButtons extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = joinGame.bind(this);
    this.leaveGame = leaveGame.bind(this);
    this.startGame = startGame.bind(this);
  }

  render() {
    const {game} = this.props;
    const inProgress = game.status === status.IN_PROGRESS;

    if (inProgress) {
      return null;
    }

    const {id, loggedIn}= this.props.login;
    const inGame = _.contains(game.players, id);
    const host = game.host === id;

    if (!inGame) {
      return (
        <div className="form-group">
          <Button
            onClick={this.joinGame}
            disabled={!loggedIn || !isJoinable(game)}>
            Join game
          </Button>
        </div>
      );
    }

    return (
      <div className="form-group">
        {
          (() => {
            if (!inProgress) {
              return host ?
                <Button
                  onClick={this.startGame}
                  disabled={!isStartable(game) || game.status === status.STARTING}
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
          })()
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
