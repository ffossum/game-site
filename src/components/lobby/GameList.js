import React from 'react';
import _ from 'underscore';
import GameListEntry from './GameListEntry';

export default props => (
  <div>
    {
      _.map(props.games, (game, id) => {
        return (
          <GameListEntry game={game} id={id} key={id} />
        );
      })
    }
  </div>
);