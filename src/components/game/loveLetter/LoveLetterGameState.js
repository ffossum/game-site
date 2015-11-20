import React from 'react';
import _ from 'lodash';
import {Alert, Panel} from 'react-bootstrap';
import Avatar from '../../common/Avatar';
import Icon from '../../common/Icon';
import WaitingIcon from '../../common/WaitingIcon';
import Hand from './Hand';

export default function GameState(props) {

  const inGame = _.contains(props.game.players, props.login.id);

  if (!inGame) {
    return <Alert bsStyle='warning'>Game in progress. Spectating coming soon.</Alert>;
  }

  const playerStates = _.map(props.game.state.players, (playerState, id) => {
    return (
      <Panel key={id}>
        <Icon type="heart" /> {playerState.score}
        {' '}
        <Avatar players={props.players} id={id} size="S" />
        {' '}
        {props.players[id].name}
        {props.game.state.toAct === id ? <span> <WaitingIcon /></span> : null}
        <span> {_.isEmpty(playerState.hand) ? 'DEAD' : 'ALIVE'}</span>
      </Panel>
    );
  });

  return (
    <div>
      {playerStates}
      <Hand
        players={props.players}
        id={props.login.id}
        gameState={props.game.state}
        hand={props.game.state.players[props.login.id].hand} />
    </div>
  );
};