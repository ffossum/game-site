import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import Game from '../components/game/Game';

class GameContainer extends React.Component {
  render() {
    return <Game {...this.props} />;
  }
};

export default connect(
  state => ({
    games: state.games,
    login: state.login
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(GameContainer);
