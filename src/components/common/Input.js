import React from 'react';
import {Input as BsInput} from 'react-bootstrap';

export default class Input extends React.Component {
  getValue() {
    return this.state.value;
  }
  render() {
    const props = {...this.props};
    props.bsStyle = props.inputStyle;
    delete props.inputStyle;

    return <BsInput {...props}>{this.props.children}</BsInput>;
  }
};
