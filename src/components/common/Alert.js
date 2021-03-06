import React from 'react';
import {Alert as BsAlert} from 'react-bootstrap';

export default class Alert extends React.Component {
  render() {
    const props = {...this.props};
    props.bsStyle = props.alertStyle;
    delete props.alertStyle;

    return <BsAlert {...props}>{this.props.children}</BsAlert>;
  }
};
