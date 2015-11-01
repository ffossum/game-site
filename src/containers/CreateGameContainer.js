import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import CreateGame from '../components/lobby/CreateGame';

class CreateGameContainer extends React.Component {
  render() {
    return <CreateGame {...this.props} />;
  }
};

export default connect(
  state => ({
    lobby: state.lobby,
    login: state.login
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(CreateGameContainer);
