import React, {PropTypes} from 'react';
import {Button, Input} from '../common';

class ChatControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.messageChanged = this.messageChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  messageChanged(e) {
    this.setState({
      message: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const {loggedIn, id} = this.props.login;

    if (loggedIn) {
      const message = this.state.message;
      this.state.message = '';
      this.props.sendMessage(id, message);
    }
  }
  render() {
    const {loggedIn} = this.props.login;

    const sendButton = (
      <Button
        type='submit'
        btnStyle='primary'
        disabled={!loggedIn}>
        Send
      </Button>
    );

    return (
      <form onSubmit={this.onSubmit} className="chat-controls">
        <Input
          standalone
          autoFocus={loggedIn}
          type="text"
          placeholder={loggedIn ? 'Say something...' : 'Please log in to chat'}
          value={this.state.message}
          onChange={this.messageChanged}
          readOnly={!loggedIn}
          buttonAfter={sendButton} />
      </form>
    );
  }
}

ChatControls.propTypes = {
  sendMessage: PropTypes.func.isRequired
};

export default ChatControls;
