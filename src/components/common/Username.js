import React, {PropTypes} from 'react';

export default class Username extends React.Component {
  render() {
    return <span className={'display-username-common'}>{this.props.name}</span>;
  }
}

Username.propTypes = {
  name: PropTypes.string.isRequired
};
