import React from 'react';
import classNames from 'classnames';

export default props => {
  const iconClass = classNames({
    'fa': true,
    [`fa-${props.type}`]: props.type
  });

  return <span className={iconClass}></span>;
};