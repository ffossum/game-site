import React from 'react';
import _ from 'underscore';
import GameListEntry from './GameListEntry';

export default props => (
  <div>
    {
      _.map(props.games, (game, id) => {
        return (
          <GameListEntry players={props.players} game={game} key={id} />
        );
      })
    }
  </div>
);