import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/loginActions';
import LoginForm from '../components/login/LoginForm';

class LoginContainer extends React.Component {
  render() {
    return <LoginForm {...this.props} />;
  }
};

export default connect(
  state => state.login,
  dispatch => bindActionCreators(actions, dispatch)
)(LoginContainer);