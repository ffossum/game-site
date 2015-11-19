import React, {PropTypes} from 'react';
import {Alert, Panel} from 'react-bootstrap';
import Chat from '../chat/Chat';
import GameLobbyButtons from './GameLobbyButtons';
import LoveLetterGameState from './loveLetter/LoveLetterGameState';
import _ from 'lodash';
import PlayerList from './PlayerList';
import * as status from '../../constants/GameStatus';
import '../../stylesheets/game.scss';

export default function Game(props) {
  const userId = props.login.id;
  const {game, players} = props;

  if (!game) {
    return <Alert bsStyle='danger'>Invalid game id</Alert>;
  } else {
    const {messages = []} = game;
    const inGame = _.contains(game.players, userId);

    return (
      <div>
        {
          () => {
            switch (game.status) {
              case status.IN_PROGRESS:
                return <LoveLetterGameState
                  login={props.login}
                  players={players}
                  game={game} />;

              default:
                return [
                  <GameLobbyButtons key='game-buttons'
                    login={props.login}
                    game={game}
                    joinGame={props.joinGame}
                    leaveGame={props.leaveGame}
                    startGame={props.startGame} />,
                  <div key='game-player-list' className='game-player-list'>
                    <PlayerList players={players} game={game} />
                  </div>
                ];
            }
          }()
        }
        {
          inGame ?
            <Panel>
              <Chat
                login={props.login}
                messages={messages}
                users={players}
                sendMessage={_.partial(props.sendGameMessage, game.id)} />
            </Panel> : null
        }
      </div>
    );
  }
};

Game.propTypes = {
  login: PropTypes.object.isRequired,
  game: PropTypes.object,
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};