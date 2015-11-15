import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import Game from '../components/game/Game';

class GameContainer extends React.Component {
  render() {
    const game = this.props.games[this.props.params.id];
    return <Game game={game} {...this.props} />;
  }
};

export default connect(
  state => ({
    games: state.games,
    login: state.login
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(GameContainer);
