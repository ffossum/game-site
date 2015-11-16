import React from 'react';
import {Image} from 'react-bootstrap';

function getPixels(size) {
  switch(size) {
    case 'S': return 25;
    case 'M': return 40;
    case 'L': return 60;

    default: return 40;
  }
}

export default props => {
  const {players, id, size} = props;
  const player = players[id];

  const pixels = getPixels(size);

  return <Image circle src={`http://www.gravatar.com/avatar/${player.avatar}?d=mystery&s=${pixels}`} />;
};