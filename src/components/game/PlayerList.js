import React from 'react';
import {OptionalPlayerAvatar, RequiredPlayerAvatar} from '../common';
import AvatarContainer from '../../containers/AvatarContainer';
import UsernameContainer from '../../containers/UsernameContainer';
import _ from 'lodash';
import {CREATED} from '../../constants/GameStatus';

export default class PlayerList extends React.Component {
  render() {
    const {game} = this.props;
    const playerIds = game.players;
    const playerComponents = _.map(playerIds, id => {
      const isHost = this.props.game.host === id;
      return (
        <div className='player-list-item' key={id}>
          <div className='player-avatar'><AvatarContainer userId={id} size='S' /></div>
          <div className='player-name-container'>
            <div className='player-name'><UsernameContainer userId={id} /></div>
            <div className='player-description'>{isHost ? 'Host' : null}</div>
          </div>
        </div>
      );
    });

    if (!game.status || game.status === CREATED) {
      const {required, optional} = game.settings.players;
      for (let i = playerComponents.length; i < required; i++) {
        playerComponents.push(
          <div className='player-list-item' key={'req'+i}>
            <div className='player-avatar'><RequiredPlayerAvatar size='S' /></div>
            <div className='player-name-container'>
              <div className='player-name'>Open</div>
              <div className='player-description'>Required</div>
            </div>
          </div>
        );
      }

      for (let i = playerComponents.length; i < required + optional; i++) {
        playerComponents.push(
          <div className='player-list-item' key={'opt'+i}>
            <div className='player-avatar'><OptionalPlayerAvatar size='S' /></div>
            <div className='player-name-container'>
              <div className='player-name'>Open</div>
              <div className='player-description'>Optional</div>
            </div>
          </div>
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
