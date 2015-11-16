import React from 'react';
import Icon from '../common/Icon';
import Avatar from '../common/Avatar';

import '../../stylesheets/playerList.scss';

export default props => {
  const {players, game} = props;
  return (
    <span className='player-list'>
      {
        game.players.map(id => {
          const host = props.game.host === id;

          return (
            <span className='player-list-item' key={id}>
              <Avatar players={players} id={id} size='S' /> {players[id].name} {host ? <Icon type='star' /> : null}
            </span>
          );
        })
      }
    </span>
  );
};