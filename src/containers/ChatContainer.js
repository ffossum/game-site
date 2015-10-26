import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/chatActions';
import Chat from '../components/chat/Chat';

class ChatContainer extends React.Component {
  render() {
    return <Chat {...this.props} />;
  }
};

export default connect(
  state => {
    return {
      login: state.login,
      chat: state.chat
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(ChatContainer);
