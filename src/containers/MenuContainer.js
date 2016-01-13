import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Menu from '../components/nav/Menu';
import * as loginActions from '../actions/loginActions';
import * as modalActions from '../actions/modalActions';

class MenuContainer extends React.Component {
  render() {
    return <Menu {...this.props} />;
  }
};

export default connect(
  state => ({
    login: state.login,
    games: state.games,
    modal: state.modal
  }),
  dispatch => bindActionCreators({...loginActions, ...modalActions}, dispatch)
)(MenuContainer);
