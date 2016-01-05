import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/loginActions';
import RegisterUserForm from '../components/login/RegisterUserForm';

class RegisterContainer extends React.Component {
  render() {
    return (
      <RegisterUserForm {...this.props} />
    );
  }
};

export default connect(
  state => state.login,
  dispatch => bindActionCreators(actions, dispatch)
)(RegisterContainer);
