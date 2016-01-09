import React, {PropTypes} from 'react';
import {Button as BsButton} from 'react-bootstrap';

export default class Button extends React.Component {
  render() {
    const props = {...this.props};
    props.bsStyle = props.btnStyle;
    delete props.btnStyle;

    return (
      <BsButton {...props} >
        {this.props.children}
      </BsButton>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  btnStyle: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
