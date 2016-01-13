import React from 'react';
import _ from 'lodash';
import GameListEntry from './GameListEntry';

export default class GameList extends React.Component {
  render() {
    const {games} = this.props;
    return (
      <div className='lobby-game-list'>
        {
          _.map(games, (game, id) => {
            return (
              <GameListEntry game={game} key={id} />
            );
          })
        }
      </div>
    );
  }
}
