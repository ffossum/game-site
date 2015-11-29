import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';

class ChatMessages extends React.Component {

  constructor(props) {
    super(props);

    this.scrollBottom = this.scrollBottom.bind(this);
  }

  componentWillUpdate() {
    const node = this.refs.chatMessages;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight - node.scrollHeight > -10;
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
            messages.map((message, index) => {
              return <ChatMessage key={index} users={users} message={message} />;
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
