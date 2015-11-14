import React, {PropTypes} from 'react';
import {Alert, Button, Panel} from 'react-bootstrap';
import Chat from '../chat/Chat';
import _ from 'underscore';
import PlayerList from './PlayerList';
import Spinner from '../common/Spinner';
import * as status from '../../constants/GameStatus';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  joinGame() {
    const {joinGame} = this.props;
    const gameId = this.props.params.id;

    joinGame(gameId);
  }
  leaveGame() {
    const {leaveGame} = this.props;
    const gameId = this.props.params.id;

    leaveGame(gameId);
  }
  startGame() {
    const {games, startGame} = this.props;
    const {username} = this.props.login;
    const gameId = this.props.params.id;
    const game = games[gameId];

    if (game.host === username) {
      startGame(gameId);
    }
  }

  render() {
    const {loggedIn, username} = this.props.login;
    const gameId = this.props.params.id;
    const {games} = this.props;
    const game = games[gameId];

    if (!game) {
      return <Alert bsStyle='danger'>Invalid game id</Alert>;
    } else {
      const {messages = []} = game;
      const inGame = _.contains(game.players, username);
      const host = game.host === username;
      const inProgress = game.status === status.IN_PROGRESS;

      return (
        <div>
          <PlayerList game={game} />
          {
            !inGame && !inProgress ?
            <div className="form-group">
              <Button
                onClick={this.joinGame}
                disabled={!loggedIn}>
                Join game
              </Button>
            </div>
            :
            <div>
              {
                () => {
                  if (!inProgress) {
                    return host ?
                      <div className="form-group">
                        <Button
                          onClick={this.startGame}
                          disabled={game.players.length < 2 || game.status === status.STARTING}
                          bsStyle="success">
                          {game.status === status.STARTING ? <span><Spinner /> Starting game...</span> : 'Start game'}
                        </Button>
                      </div>
                      :
                      <div className="form-group">
                        <Button
                          onClick={this.leaveGame}
                          disabled={!loggedIn}>
                          Leave game
                        </Button>
                      </div>;
                  }
                }()
              }
              <Panel>
                <Chat
                  login={this.props.login}
                  messages={messages}
                  sendMessage={_.partial(this.props.sendGameMessage, gameId)}
                  />
              </Panel>
            </div>
          }
        </div>
      );
    }
  }
};

Game.propTypes = {
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};