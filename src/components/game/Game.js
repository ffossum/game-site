import React, {PropTypes} from 'react';
import {Alert, Panel} from 'react-bootstrap';
import Chat from '../chat/Chat';
import GameLobbyButtons from './GameLobbyButtons';
import _ from 'underscore';
import PlayerList from './PlayerList';

export default class Game extends React.Component {
  render() {
    const {username} = this.props.login;
    const gameId = this.props.params.id;
    const {games} = this.props;
    const game = games[gameId];

    if (!game) {
      return <Alert bsStyle='danger'>Invalid game id</Alert>;
    } else {
      const {messages = []} = game;
      const inGame = _.contains(game.players, username);

      return (
        <div>
          <PlayerList game={game} />
          <GameLobbyButtons
            login={this.props.login}
            gameId={gameId}
            game={game}
            joinGame={this.props.joinGame}
            leaveGame={this.props.leaveGame}
            startGame={this.props.startGame} />
          {
            inGame ?
              <Panel>
                <Chat
                  login={this.props.login}
                  messages={messages}
                  sendMessage={_.partial(this.props.sendGameMessage, gameId)} />
              </Panel> : null
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