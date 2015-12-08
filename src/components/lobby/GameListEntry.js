import React, {PropTypes} from 'react';
import {ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from '../common';
import PlayerList from '../game/PlayerList';

export default class GameListEntry extends React.Component {
  render() {
    const {game, players} = this.props;

    return (
      <LinkContainer to={`/game/${game.id}`}>
        <ListGroupItem>
          <PlayerList players={players} game={game} />
        </ListGroupItem>
      </LinkContainer>
    );
  }
};

GameListEntry.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
  }).isRequired
};
