import React from 'react';
import {Panel} from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

class About extends React.Component {
  render() {
    return (
      <DocumentTitle title="About">
        <div className="container">
          <Panel>
            <h1>About</h1>
            <p>Work in progress</p>
          </Panel>
        </div>
      </DocumentTitle>
    );
  }
}

export default About;
