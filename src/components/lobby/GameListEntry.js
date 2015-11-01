import React from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';

export default props => {
  const {game, id} = props;

  return (
    <Panel>
      <Link to={`/game/${id}`}>{id}</Link>
      {' '}
      <span>
        {'Players: ' + game.players.join(', ')}
      </span>
    </Panel>
  );
};