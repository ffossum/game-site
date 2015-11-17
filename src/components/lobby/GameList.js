import React from 'react';
import _ from 'lodash';
import GameListEntry from './GameListEntry';
import {ListGroup} from 'react-bootstrap';

export default props => (
  <ListGroup>
    {
      _.map(props.games, (game, id) => {
        return (
          <GameListEntry players={props.players} game={game} key={id} />
        );
      })
    }
  </ListGroup>
);