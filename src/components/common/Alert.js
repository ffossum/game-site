import React from 'react';
import BsAlert from 'react-bootstrap/lib/Alert';

export default class Alert extends React.Component {
  render() {
    const props = {...this.props};
    props.bsStyle = props.alertStyle;
    delete props.alertStyle;

    return <BsAlert {...props}>{this.props.children}</BsAlert>;
  }
};
