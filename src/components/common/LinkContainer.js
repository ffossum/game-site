import React from 'react';

export default class LinkContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (this.props.disabled) {
      event.preventDefault();
      return;
    }

    const {to} = this.props;
    const {history} = this.context;

    history.pushState(null, to);
  }

  render() {
    const {to} = this.props;
    const {history} = this.context;

    const props = {
      onClick: this.onClick,
      active: history.isActive(to)
    };
    return React.cloneElement(this.props.children, props);
  }
}

LinkContainer.contextTypes = {
  history: React.PropTypes.object
};
