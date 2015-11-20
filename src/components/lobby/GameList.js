import React from 'react';
import _ from 'lodash';
import GameListEntry from './GameListEntry';
import {ListGroup} from 'react-bootstrap';

export default class GameList extends React.Component {
  render() {
    return (
      <ListGroup>
        {
          _.map(this.props.games, (game, id) => {
            return (
              <GameListEntry players={this.props.players} game={game} key={id} />
            );
          })
        }
      </ListGroup>
    );
  }
}