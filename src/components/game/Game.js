import React, {PropTypes} from 'react';
import {Alert, Panel} from '../common';
import Chat from '../chat/Chat';
import GameLobbyButtons from './GameLobbyButtons';
import _ from 'lodash';
import PlayerList from './PlayerList';
import * as status from '../../constants/GameStatus';
import LoveLetterContainer from '../../games/love-letter/containers/LoveLetterContainer';

if (process.env.APP_ENV === 'browser') {
  require('../../stylesheets/game.scss');
}

export default class Game extends React.Component {
  render() {
    const userId = this.props.login.id;
    const {game} = this.props;

    if (!game) {
      return <Alert alertStyle='danger'>Invalid game id</Alert>;
    } else if (game.status === status.IN_PROGRESS) {
      return <LoveLetterContainer game={game} />;
    } else {
      const {messages = []} = game;
      const inGame = _.contains(game.players, userId);

      return (
        <div className="container">
          <Panel>
            <GameLobbyButtons key='game-buttons'
              login={this.props.login}
              game={game}
              joinGame={this.props.joinGame}
              leaveGame={this.props.leaveGame}
              startGame={this.props.startGame} />

            <div className='game-player-list'>
              <PlayerList game={game} />
            </div>
            {
              inGame ?
                <div>
                  <hr />
                  <Chat
                    login={this.props.login}
                    messages={messages}
                    sendMessage={_.partial(this.props.sendGameMessage, game.id)} />
                </div>
                :
                null
            }
          </Panel>
        </div>
      );
    }
  }
};

Game.propTypes = {
  login: PropTypes.object.isRequired,
  game: PropTypes.object,
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};
