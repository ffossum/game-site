import React from 'react';
import _ from 'lodash';
import PlayerList from '../game/PlayerList';
import {LinkContainer, Button, Table} from '../common';

function isJoinable(game, userId) {
  const {optional, required} = game.settings.players;
  const maxPlayers = optional + required;
  const joinedPlayers = _.size(game.players);
  const alreadyJoined = _.includes(game.players, userId);

  return joinedPlayers < maxPlayers && !alreadyJoined;
}

function joinGame(gameId) {
  const {joinGame} = this.props;
  return joinGame(gameId);
}

export default class GameList extends React.Component {
  render() {
    const {games, login} = this.props;
    return (
      <Table className='lobby-game-list'>
        <tbody>
        {
          _.map(games, (game, gameId) => {
            return (
              <tr key={gameId}>
                <td>
                  <PlayerList game={game} />
                </td>
                <td className='game-buttons'>
                  {
                    login.id && isJoinable(game, login.id)
                    ? <Button onClick={joinGame.bind(this, gameId)}>Join</Button>
                    : null
                  }
                  {' '}
                  <LinkContainer to={`/game/${game.id}`}>
                    <Button>Open</Button>
                  </LinkContainer>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );
  }
}
