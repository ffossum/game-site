import React from 'react';
import Icon from '../common/Icon';

export default props => {
  const {players, game} = props;
  return (
    <ul>
      {
        game.players.map(id => {
          const host = props.game.host === id;

          return (
            <li key={id}>
              <span>
                {players[id].name} {host ? <Icon type='star' /> : null}
              </span>
            </li>
          );
        })
      }
    </ul>
  );
};