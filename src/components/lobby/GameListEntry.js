import React, {PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import PlayerList from '../game/PlayerList';

const GameListEntry = props => {
  const {game, players} = props;

  return (
    <Panel>
      <Link to={`/game/${game.id}`}>{game.id}</Link>
      {' '}
      <span>
        <PlayerList players={players} game={game} />
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