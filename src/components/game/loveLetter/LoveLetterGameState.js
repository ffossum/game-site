import React from 'react';
import _ from 'lodash';
import {Alert, Panel} from 'react-bootstrap';
import Avatar from '../../common/Avatar';
import WaitingIcon from '../../common/WaitingIcon';
import Hand from './Hand';

export default function GameState(props) {

  const inGame = _.contains(props.game.players, props.login.id);

  if (!inGame) {
    return <Alert bsStyle='warning'>Game in progress. Spectating coming soon.</Alert>;
  }

  const playerStates = _.map(props.game.state.players, (player, id) => {
    return (
      <Panel key={id}>
        {player.score}
        {' '}
        <Avatar players={props.players} id={id} size="S" />
        {' '}
        {props.players[id].name}
        {' '}
        {props.game.state.toAct === id ? <WaitingIcon /> : null}
      </Panel>
    );
  });

  return (
    <div>
      {playerStates}
      <Hand hand={props.game.state.players[props.login.id].hand} />
    </div>
  );
};