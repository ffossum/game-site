import React, {PropTypes} from 'react';
import {ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import PlayerList from '../game/PlayerList';

const GameListEntry = props => {
  const {game, players} = props;

  return (
    <LinkContainer to={`/game/${game.id}`}>
      <ListGroupItem>
        <PlayerList players={players} game={game} />
      </ListGroupItem>
    </LinkContainer>
  );
};

export default GameListEntry;

GameListEntry.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
  }).isRequired
};