import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class LinkContainer extends React.Component {
  render() {
    const {to, children, ...props} = this.props;
    const {history} = this.context;

    const onClick = event => {
      if (this.props.disabled) {
        event.preventDefault();
        return;
      }

      if (children.props.onClick) {
        children.props.onClick(event);
      }

      Link.prototype.handleClick.call(this, event);
    };

    props.onClick = onClick;
    props.active = history.isActive(to);

    return React.cloneElement(this.props.children, props);
  }
}

LinkContainer.contextTypes = {
  history: PropTypes.object
};

LinkContainer.propTypes = {
  to: React.PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: React.PropTypes.node.isRequired
};
