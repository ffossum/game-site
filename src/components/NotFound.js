import React from 'react';
import {Panel} from './common';
import DocumentTitle from 'react-document-title';

export default class NotFound extends React.Component {
  render() {
    return (
      <DocumentTitle title="Not found">
        <div className="container">
          <Panel>
            <h1>404</h1>
            <p>This isn't the page you're looking for.</p>
          </Panel>
        </div>
      </DocumentTitle>
    );
  }
}
