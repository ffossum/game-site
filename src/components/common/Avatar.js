import React from 'react';
import BsImage from 'react-bootstrap/lib/Image';

import '../../stylesheets/common/avatar.scss';

function getPixels(size) {
  switch(size) {
    case 'S': return 25;
    case 'M': return 40;
    case 'L': return 60;

    default: return 40;
  }
}

export default class Image extends React.Component {
  render() {
    const {players, id, size} = this.props;
    const player = players[id];

    const pixels = getPixels(size);

    return <BsImage circle src={`http://www.gravatar.com/avatar/${player.avatar}?d=retro&s=${pixels}`} />;
  }
};

export class RequiredPlayerAvatar extends React.Component {
  render() {
    const pixels = getPixels(this.props.size);
    return <BsImage
      circle
      className="required-player-avatar"
      src={`http://www.gravatar.com/avatar/0?d=mm&s=${pixels}&f=y`} />;
  }
}

export class OptionalPlayerAvatar extends React.Component {
  render() {
    const pixels = getPixels(this.props.size);
    return <BsImage
      circle
      className="optional-player-avatar"
      src={`http://www.gravatar.com/avatar/0?d=mm&s=${pixels}&f=y`} />;
  }
}
