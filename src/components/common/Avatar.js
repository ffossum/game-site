import React, {PropTypes} from 'react';
import {Image as BsImage} from 'react-bootstrap';
import {get} from '../../falcorUtils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as falcorActions from '../../actions/falcorActions';

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

const avatarPath = userId => ['users', userId, 'avatar'];
class AvatarContainer extends React.Component {
  componentDidMount() {
    const {falcor, userId, fetchFalcorData} = this.props;
    const avatar = get(falcor, avatarPath(userId));

    if (!avatar) {
      fetchFalcorData(avatarPath(userId));
    }
  }
  render() {
    const {falcor, userId, size} = this.props;
    const avatar = get(falcor, avatarPath(userId));

    if (avatar) {
      return <Avatar hash={avatar} size={size}/>;
    }
    return null;
  }
}

export const FalcorAvatar = connect(
  state => ({falcor: state.falcor}),
  dispatch => bindActionCreators(falcorActions, dispatch)
)(AvatarContainer);

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
