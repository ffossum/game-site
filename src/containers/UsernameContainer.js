import React, {PropTypes} from 'react';
import {Username} from '../components/common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../actions/usersActions';

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

UsernameContainer.propTypes = {
  userId: PropTypes.string.isRequired
};

export default connect(
  state => ({
    users: state.users
  }),
  dispatch => bindActionCreators(usersActions, dispatch)
)(UsernameContainer);
