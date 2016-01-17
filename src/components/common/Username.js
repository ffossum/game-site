import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/usersActions';

if (process.env.APP_ENV === 'browser') {
  require('../../stylesheets/common/username.scss');
}

export default class Username extends React.Component {
  render() {
    return <span className={'display-username-common'}>{this.props.name}</span>;
  }
}

function getUserName(users, userId) {
  const user = users[userId];
  return user && user.name;
}

class UsernameContainer extends React.Component {
  componentDidMount() {
    const {users, userId, fetchUserData} = this.props;
    const name = getUserName(users, userId);

    if (!name) {
      fetchUserData(userId);
    }
  }
  render() {
    const {users, userId} = this.props;
    const name = getUserName(users, userId);

    if (name) {
      return <Username name={name} />;
    }
    return null;
  }
}

export const FalcorUsername = connect(
  state => ({
    users: state.users
  }),
  dispatch => bindActionCreators(usersActions, dispatch)
)(UsernameContainer);

Username.propTypes = {
  name: PropTypes.string.isRequired
};

FalcorUsername.propTypes = {
  userId: PropTypes.string.isRequired
};
