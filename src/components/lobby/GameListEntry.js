import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import _ from 'underscore';

const GameListEntry = props => {
  const {game, players} = props;

  const playerNames = _.map(game.players, id => players[id].name);

  return (
    <Panel>
      <Link to={`/game/${game.id}`}>{game.id}</Link>
      {' '}
      <span>
        {'Players: ' + playerNames.join(', ')}
      </span>
    </Panel>
  );
};

export default GameListEntry;

GameListEntry.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
  }).isRequired
};