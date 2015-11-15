import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/loginActions';
import LoginForm from '../components/login/LoginForm';
import DocumentTitle from 'react-document-title';

class LoginContainer extends React.Component {
  render() {
    return (
      <DocumentTitle title="Log in">
        <LoginForm {...this.props} />
      </DocumentTitle>
    );
  }
};

export default connect(
  state => state.login,
  dispatch => bindActionCreators(actions, dispatch)
)(LoginContainer);