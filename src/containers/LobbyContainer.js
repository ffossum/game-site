import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import Lobby from '../components/lobby/Lobby';
import DocumentTitle from 'react-document-title';

class LobbyContainer extends React.Component {
  render() {
    return (
      <DocumentTitle title='Game Lobby'>
        <Lobby games={this.props.games} loggedIn={this.props.login.loggedIn} />
      </DocumentTitle>
    );
  }
};

export default connect(
  state => ({
    games: state.games,
    login: state.login
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(LobbyContainer);
