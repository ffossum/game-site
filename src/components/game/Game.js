import React, {PropTypes} from 'react';
import {Alert, Button, Panel} from 'react-bootstrap';
import Chat from '../chat/Chat';
import _ from 'underscore';
import PlayerList from './PlayerList';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
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

  render() {
    const {loggedIn, username} = this.props.login;
    const gameId = this.props.params.id;
    const {games} = this.props.lobby;
    const game = games[gameId];

    if (!game) {
      return <Alert bsStyle='danger'>Invalid game id</Alert>;
    } else {
      const {messages = []} = game;
      const inGame = _.contains(game.players, username);
      const host = game.host === username;

      return (
        <div>
          <PlayerList game={game} />
          {
            !inGame ?
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
                !host ?
                <div className="form-group">
                  <Button
                    onClick={this.leaveGame}
                    disabled={!loggedIn}>
                    Leave game
                  </Button>
                </div> : null
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
  joinGame: PropTypes.func.isRequired
};