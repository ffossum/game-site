import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Menu from '../components/Menu';
import * as actions from '../actions/loginActions';

class MenuContainer extends React.Component {
  render() {
    return <Menu {...this.props} />;
  }
};

export default connect(
  state => state.login,
  dispatch => bindActionCreators(actions, dispatch)
)(MenuContainer);