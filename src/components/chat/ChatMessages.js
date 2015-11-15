import React, {PropTypes} from 'react';

class ChatMessages extends React.Component {

  constructor(props) {
    super(props);

    this.scrollBottom = this.scrollBottom.bind(this);
  }

  componentWillUpdate() {
    const node = this.refs.chatMessages;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.scrollBottom();
    }
  }
  componentDidMount() {
    this.scrollBottom();
  }
  scrollBottom() {
    const node = this.refs.chatMessages;
    node.scrollTop = node.scrollHeight;
  }
  render() {
    const {users, messages} = this.props;
    return (
      <div className="chat-messages-container">
        <div className="chat-messages" ref="chatMessages">
          {
            messages.map((msg, index) => {
              if (msg.user) {
                return (
                  <div key={index} className="chat-message">
                    {users[msg.user].name}: {msg.text}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="chat-info-message">
                    {msg.text}
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    );
  }
}

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatMessages;
