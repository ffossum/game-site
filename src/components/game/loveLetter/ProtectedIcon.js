import React from 'react';
import Icon from '../../common/Icon';

class ProtectedIcon extends React.Component {
  render() {
    const {protect} = this.props;

    return protect ? <Icon type='shield' /> : null;
  }
};

export default ProtectedIcon;