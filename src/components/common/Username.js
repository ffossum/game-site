import React, {PropTypes} from 'react';
import falcorModel from '../../falcorModel';
import '../../stylesheets/common/username.scss';

export default class Username extends React.Component {
  render() {
    return <span className={'display-username-common'}>{this.props.name}</span>;
  }
}

export class FalcorUsername extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  }
  componentDidMount() {
    const {userId} = this.props;
    falcorModel.get(['users', userId, 'name']).then(response => {
      this.setState({username: response.json.users[userId].name});
    });
  }
  render() {
    const username = this.state && this.state.username;
    if (username) {
      return <Username name={username} />;
    }
    return null;
  }
}

Username.propTypes = {
  name: PropTypes.string.isRequired
};

FalcorUsername.propTypes = {
  userId: PropTypes.string.isRequired
};
