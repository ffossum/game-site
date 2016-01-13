import React, {PropTypes} from 'react';
import {LinkContainer, Button} from '../common';
import PlayerList from '../game/PlayerList';

export default class GameListEntry extends React.Component {
  render() {
    const {game} = this.props;

    return (
      <div className='lobby-game-list-entry'>
        <LinkContainer to={`/game/${game.id}`}>
          <Button>
            <PlayerList game={game} />
          </Button>
        </LinkContainer>
      </div>
    );
  }
};

GameListEntry.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
  }).isRequired
};
