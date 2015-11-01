import React from 'react';
import classNames from 'classnames';

export default props => {
  const iconClass = classNames({
    'fa': true,
    [`fa-${props.type}`]: props.type,
    'fa-spin': props.spin
  });

  return <span className={iconClass}></span>;
};