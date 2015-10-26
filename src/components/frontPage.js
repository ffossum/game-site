import React from 'react';
import {Panel} from 'react-bootstrap';
import Chat from '../containers/ChatContainer';

class FrontPage extends React.Component {
  render() {
    return (
      <div>

        <h1>Welcome</h1>
        <p>Good luck, have fun!</p>

        <Panel>
          <Chat />
        </Panel>
      </div>
    );
  }
}

export default FrontPage;
