import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Menu from '../components/nav/Menu';
import * as actions from '../actions/loginActions';

class MenuContainer extends React.Component {
  render() {
    return <Menu {...this.props} />;
  }
};

export default connect(
  state => ({
    players: state. players,
    login: state.login,
    games: state.games
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(MenuContainer);
