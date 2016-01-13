import React, {PropTypes} from 'react';
import {get} from '../../falcorUtils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as falcorActions from '../../actions/falcorActions';

if (process.env.APP_ENV === 'browser') {
  require('../../stylesheets/common/username.scss');
}

export default class Username extends React.Component {
  render() {
    return <span className={'display-username-common'}>{this.props.name}</span>;
  }
}

const namePath = userId => ['users', userId, 'name'];

class UsernameContainer extends React.Component {
  componentDidMount() {
    const {falcor, userId, fetchFalcorData} = this.props;
    const name = get(falcor, namePath(userId));

    if (!name) {
      fetchFalcorData(namePath(userId));
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
  state => ({falcor: state.falcor}),
  dispatch => bindActionCreators(falcorActions, dispatch)
)(UsernameContainer);

Username.propTypes = {
  name: PropTypes.string.isRequired
};

FalcorUsername.propTypes = {
  userId: PropTypes.string.isRequired
};
