import React from 'react';
import Icon from '../common/Icon';
import Avatar from '../common/Avatar';

import '../../stylesheets/playerList.scss';

export default class PlayerList extends React.Component {
  render() {
    const {players, game} = this.props;
    return (
      <span className='player-list'>
        {
          game.players.map(id => {
            const host = this.props.game.host === id;

            return (
              <span className='player-list-item' key={id}>
                <Avatar players={players} id={id} size='S' /> {players[id].name} {host ? <Icon type='star' /> : null}
              </span>
            );
          })
        }
      </span>
    );
  }
};