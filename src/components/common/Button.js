import React, {PropTypes} from 'react';
import {Button as BsButton} from 'react-bootstrap';

export default class Button extends React.Component {
  render() {
    const {type, btnStyle, onClick} = this.props;

    return (
      <BsButton type={type} bsStyle={btnStyle} onClick={onClick}>
        {this.props.children}
      </BsButton>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  btnStyle: PropTypes.string,
  onClick: PropTypes.func
};
