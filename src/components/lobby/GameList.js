import React from 'react';
import {Link} from 'react-router';
import _ from 'underscore';

export default props => (
  <ul>
    {
      _.map(props.games, (game, id) => {
        return (
          <li key={id}>
            <Link to={`/game/${id}`}>{id}</Link>
          </li>
        );
      })
    }
  </ul>
);