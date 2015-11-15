import React, {PropTypes} from 'react';
import ChatMessages from './ChatMessages';
import ChatControls from './ChatControls';

import '../../stylesheets/chat.scss';

export default class Chat extends React.Component {
  render() {
    const {sendMessage} = this.props;
    const {messages} = this.props;

    return (
      <div className="chat-container">
        <ChatMessages messages={messages} />
        <ChatControls login={this.props.login} sendMessage={sendMessage} />
      </div>
    );
  }
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string,
      text: PropTypes.string.isRequired
    })).isRequired,
  login: PropTypes.shape({
    loggedIn: PropTypes.bool,
    username: PropTypes.string
  })
};