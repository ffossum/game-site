import React from 'react';

export default props => (
  <ul>
    {props.players.map(player => (
      <li key={player}>{player}</li>)
    )}
  </ul>
);