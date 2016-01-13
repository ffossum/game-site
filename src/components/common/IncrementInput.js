import React, {PropTypes} from 'react';
import {Button, Input, Icon} from './index';

if (process.env.APP_ENV === 'browser') {
  require('../../stylesheets/common/increment-input.scss');
}

export default class IncrementInput extends React.Component {
  render() {
    const {value, maxValue, minValue} = this.props;

    const decrementButton =
      <Button
        disabled={value <= minValue}
        type='button'
        onClick={this.props.onDecrement}>
        <Icon type='minus' />
      </Button>;

    const incrementButton =
      <Button
        disabled={value >= maxValue}
        type='button'
        onClick={this.props.onIncrement}>
        <Icon type='plus' />
      </Button>;

    return (
      <div className="form-group common-increment-input">
        {this.props.label ? <label>{this.props.label}</label> : null}
        <div>
          <Input
            readOnly
            type='text'
            value={this.props.value}
            buttonBefore={decrementButton}
            buttonAfter={incrementButton} />
        </div>
      </div>
    );
  }
}

IncrementInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};
