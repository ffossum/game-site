import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import CreateGame from '../components/lobby/CreateGame';
import DocumentTitle from 'react-document-title';

class CreateGameContainer extends React.Component {
  render() {
    return (
      <DocumentTitle title="Create game">
        <CreateGame {...this.props} />
      </DocumentTitle>
    );
  }
};

export default connect(
  state => ({
    login: state.login,
    players: state.players
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(CreateGameContainer);
