import React from 'react';
import _ from 'lodash';
import GameListEntry from './GameListEntry';

export default class GameList extends React.Component {
  render() {
    return (
      <div className='lobby-game-list'>
        {
          _.map(this.props.games, (game, id) => {
            return (
              <GameListEntry players={this.props.players} game={game} key={id} />
            );
          })
        }
      </div>
    );
  }
}
