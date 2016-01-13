import React, {PropTypes} from 'react';
import falcorModel, {get} from '../../falcorModel';
import {connect} from 'react-redux';

import '../../stylesheets/common/username.scss';

export default class Username extends React.Component {
  render() {
    return <span className={'display-username-common'}>{this.props.name}</span>;
  }
}

const namePath = userId => ['users', userId, 'name'];

class UsernameContainer extends React.Component {
  componentDidMount() {
    const {falcor, userId} = this.props;
    const name = get(falcor, namePath(userId));

    if (!name) {
      falcorModel.get(namePath(userId)).then();
    }
  }
  render() {
    const {falcor, userId} = this.props;
    const name = get(falcor, namePath(userId));

    if (name) {
      return <Username name={name} />;
    }
    return null;
  }
}

export const FalcorUsername = connect(
  state => ({falcor: state.falcor})
)(UsernameContainer);

Username.propTypes = {
  name: PropTypes.string.isRequired
};

FalcorUsername.propTypes = {
  userId: PropTypes.string.isRequired
};
