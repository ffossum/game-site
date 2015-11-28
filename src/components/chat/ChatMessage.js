import React, {PropTypes} from 'react';

class ChatMessage extends React.Component {
  render() {

    const {message, users} = this.props;

    if (message.user) {
      return (
        <div className="chat-message">
          {users[message.user].name}: {message.text}
        </div>
      );
    } else {
      return (
        <div className="chat-info-message">
          {message.text}
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