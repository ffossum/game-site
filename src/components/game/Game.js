import React, {PropTypes} from 'react';
import {Button, Panel} from 'react-bootstrap';
import Chat from '../chat/Chat';
import _ from 'underscore';
import PlayerList from './PlayerList';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
  }

  joinGame() {
    const {joinGame} = this.props;
    const gameId = this.props.params.id;

    joinGame(gameId);
  }

  render() {
    const {loggedIn, username} = this.props.login;
    const gameId = this.props.params.id;
    const {games} = this.props.lobby;
    const game = games[gameId];

    if (!game) {
      return <h1>Invalid game id</h1>;
    } else {
      const {messages = []} = game;

      return (
        <div>
          <PlayerList game={game} />
          {
            !_.contains(game.players, username) ?
            <div className="form-group">
              <Button
                onClick={this.joinGame}
                disabled={!loggedIn}>
                Join game
              </Button>
            </div>
            :
            <Panel>
              <Chat
                login={this.props.login}
                messages={messages}
                sendMessage={_.partial(this.props.sendGameMessage, gameId)}
                />
            </Panel>
          }
        </div>
      );
    }
  }
};

Game.propTypes = {
  joinGame: PropTypes.func.isRequired
};