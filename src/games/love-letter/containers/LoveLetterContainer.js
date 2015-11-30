import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/loveLetterActions';
import {sendGameMessage} from '../../../actions/lobbyActions';
import LoveLetterGameState from '../components/LoveLetterGameState';

class LoveLetter extends React.Component {
  render() {
    return <LoveLetterGameState {...this.props} />;
  }
}

LoveLetter.propTypes = {
  game: PropTypes.object.isRequired
};

export default connect(
  state => ({
    login: state.login,
    players: state.players
  }),
  dispatch => bindActionCreators({...actions, sendGameMessage}, dispatch)
)(LoveLetter);
