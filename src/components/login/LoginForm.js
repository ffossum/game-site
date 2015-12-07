import React, {PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';
import texts from '../../constants/Texts';
import {isEmpty} from 'lodash';
import Spinner from '../common/Spinner';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const {logIn} = this.props;
    const username = this.refs.username.getValue().trim();

    if (!isEmpty(username)) {
      logIn(username);
    }
  }

  render() {
    const {username, waiting, error} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          autoFocus
          ref="username"
          type="text"
          label="Username"
          placeholder="Username"
          defaultValue={username}
          readOnly={waiting}
          help={error ? texts[error] : null}
          bsStyle={error ? 'error' : null} />

        <Button
          type="submit"
          disabled={waiting}>
          {waiting ? <span><Spinner /> Logging in...</span> : 'Log in'}
        </Button>
      </form>
    );
  }
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  waiting: PropTypes.bool
};
