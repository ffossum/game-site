import React, {PropTypes} from 'react';
import {getMessageText} from '../../constants/Texts';
import _ from 'lodash';

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
      const messageLines = messageText.split('\n');
      return (
        <div className="chat-info-message">
          {_.map(messageLines, (line, index) => <div key={index}>{line}</div>)}
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
