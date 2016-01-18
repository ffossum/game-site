import React, {PropTypes} from 'react';
import {Avatar} from '../components/common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../actions/usersActions';

function getUserAvatar(users, userId) {
  const user = users[userId];
  return user && user.avatar;
}

class AvatarContainer extends React.Component {
  componentDidMount() {
    const {users, userId, fetchUserData} = this.props;
    const avatar = getUserAvatar(users, userId);

    if (!avatar) {
      fetchUserData(userId);
    }
  }
  render() {
    const {users, userId, size} = this.props;
    const avatar = getUserAvatar(users, userId);

    if (avatar) {
      return <Avatar hash={avatar} size={size}/>;
    }
    return null;
  }
}

AvatarContainer.propTypes = {
  userId: PropTypes.string.isRequired
};

export default connect(
  state => ({users: state.users}),
  dispatch => bindActionCreators(usersActions, dispatch)
)(AvatarContainer);
