import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';

const GameListEntry = props => {
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

export default GameListEntry;

GameListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  game: PropTypes.shape({
    players: PropTypes.array.isRequired
  }).isRequired
};