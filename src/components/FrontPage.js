import React from 'react';
import {Panel} from 'react-bootstrap';
import Chat from '../containers/ChatContainer';
import DocumentTitle from 'react-document-title';

class FrontPage extends React.Component {
  render() {
    return (
      <DocumentTitle title="Game Site">
        <div className="container">
        <Panel>
            <h1>Welcome</h1>
            <p>Good luck, have fun!</p>
            <hr />
            <Chat />
          </Panel>
        </div>
      </DocumentTitle>
    );
  }
}

export default FrontPage;
