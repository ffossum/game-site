import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import Lobby from '../components/lobby/Lobby';

class LobbyContainer extends React.Component {
  render() {
    return <Lobby {...this.props} />;
  }
};

export default connect(
  state => ({
    lobby: state.lobby,
    login: state.login
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(LobbyContainer);
