import React from 'react';
import Icon from '../common/Icon';

export default props => (
  <ul>
    {
      props.game.players.map(id => {
        const host = props.game.host === id;

        return (
          <li key={id}>
            {
              host ?
              <span>
                {id} <Icon type='star' />
              </span> :
              id
            }
          </li>
        );
      })
    }
  </ul>
);