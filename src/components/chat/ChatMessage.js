import React, {PropTypes} from 'react';
import {getMessageText} from '../../constants/Texts';

class ChatMessage extends React.Component {
  render() {

    const {message, users} = this.props;

    let messageText = message.key ?
      getMessageText(message.key, message.args) : message.text;

    if (message.user) {
      return (
        <div className="chat-message">
          {users[message.user].name}: {messageText}
        </div>
      );
    } else {
      return (
        <div className="chat-info-message">
          {messageText}
        </div>
      );
    }
  }
};

ChatMessage.propTypes = {
  users: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

export default ChatMessage;
