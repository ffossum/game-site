import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/lobbyActions';
import Game from '../components/game/Game';
import DocumentTitle from 'react-document-title';

class GameContainer extends React.Component {
  render() {
    const game = this.props.games[this.props.params.id];
    return (
      <DocumentTitle title={`Game ${game.id}`}>
        <Game game={game} {...this.props} />
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
)(GameContainer);
