import React from 'react';
import BsInput from 'react-bootstrap/lib/Input';

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
