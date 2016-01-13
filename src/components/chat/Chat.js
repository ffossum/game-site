import React, {PropTypes} from 'react';
import ChatMessages from './ChatMessages';
import ChatControls from './ChatControls';

if (process.env.APP_ENV === 'browser') {
  require('../../stylesheets/chat.scss');
}

export default class Chat extends React.Component {
  render() {
    const {messages, sendMessage, messageComponents} = this.props;

    return (
      <div className="chat-container">
        <ChatMessages messages={messages} messageComponents={messageComponents} />
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
      text: PropTypes.string,
      key: PropTypes.string,
      args: PropTypes.array
    })).isRequired,
  login: PropTypes.shape({
    loggedIn: PropTypes.bool,
    username: PropTypes.string
  })
};
