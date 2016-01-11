import React, {PropTypes} from 'react';
import {Image as BsImage} from 'react-bootstrap';

import '../../stylesheets/common/avatar.scss';

function getPixels(size) {
  switch(size) {
    case 'S': return 24;
    case 'M': return 40;
    case 'L': return 60;

    default: return 24;
  }
}

export default class Avatar extends React.Component {
  static propTypes = {
    hash: PropTypes.string.isRequired,
    size: PropTypes.string
  }
  render() {
    const {hash, size} = this.props;
    const pixels = getPixels(size);

    return <BsImage circle src={`http://www.gravatar.com/avatar/${hash}?d=retro&s=${pixels}`} />;
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
