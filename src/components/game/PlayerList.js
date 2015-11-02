import React from 'react';
import Icon from '../common/Icon';

export default props => (
  <ul>
    {
      props.game.players.map(player => {
        const host = props.game.host === player;

        return (
          <li key={player}>
            {
              host ?
              <span>
                <Icon type='star' /> {player}
              </span> :
              player
            }
          </li>
        );
      })
    }
  </ul>
);