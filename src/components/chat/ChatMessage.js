import React, {PropTypes} from 'react';
import {FalcorUsername} from '../common/';
import commonMessageComponents from './commonMessageComponents';

class ChatMessage extends React.Component {
  render() {
    const {message, messageComponents} = this.props;

    if (message.user) {
      return (
        <div className="chat-message">
          <FalcorUsername userId={message.user} />: {message.text}
        </div>
      );
    }

    const Message = commonMessageComponents[message.key] || (messageComponents && messageComponents[message.key]);

    if (Message) {
      return (
        <div className="chat-info-message">
          <Message args={message.args} />
        </div>
      );
    }
  }
};

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
  messageComponents: PropTypes.object
};

export default ChatMessage;
