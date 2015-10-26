import React from 'react';
import ChatMessages from './ChatMessages';
import ChatControls from './ChatControls';

import '../../stylesheets/chat.scss';

export default class Chat extends React.Component {
  render() {
    const {sendMessage} = this.props;
    const {messages} = this.props.chat;
    const {loggedIn, username} = this.props.login;

    return (
      <div className="chat-container">
        <ChatMessages messages={messages} />
        <ChatControls username={username} loggedIn={loggedIn} sendMessage={sendMessage} />
      </div>
    );
  }
}