import React from 'react';
import {Avatar, Icon} from '../common';
import _ from 'lodash';
import {CREATED} from '../../constants/GameStatus';

import '../../stylesheets/playerList.scss';

export default class PlayerList extends React.Component {
  render() {
    const {players, game} = this.props;
    const playerIds = game.players;
    const playerComponents = _.map(playerIds, id => {
      const host = this.props.game.host === id;

      return (
        <span className='player-list-item' key={id}>
          <Avatar players={players} id={id} size='S' /> {players[id].name} {host ? <Icon type='star' /> : null}
        </span>
      );
    });

    if (!game.status || game.status === CREATED) {
      const {required, optional} = game.settings.players;
      for (let i = playerIds.length; i < required; i++) {
        playerComponents.push(
          <span className='player-list-item' key={'req'+i}>required</span>
        );
      }

      for (let i = required; i < required + optional; i++) {
        playerComponents.push(
          <span className='player-list-item' key={'opt'+i}>optional</span>
        );
      }
    }

    return (
      <div className='player-list'>
        {playerComponents}
      </div>
    );
  }
};
