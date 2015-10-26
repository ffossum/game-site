import React, {PropTypes} from 'react';
import {Input, ButtonInput, Panel} from 'react-bootstrap';
import {text} from '../../constants/Errors';
import {isEmpty} from 'underscore';

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
    const {username, loggedIn, waiting, error} = this.props;
    if (loggedIn) {
      return <div>{`Logged in as ${username}`}</div>;
    } else {
      return (
        <Panel>
          <form onSubmit={this.onSubmit}>
            <Input
              autoFocus
              ref="username"
              type="text"
              label="Username"
              placeholder="Username"
              defaultValue={username}
              readOnly={waiting}
              help={error ? text[error] : null}
              bsStyle={error ? 'error' : null} />

            <ButtonInput
              type="submit"
              value={waiting ? 'Logging in...' : 'Log in'}
              disabled={waiting} />
          </form>
        </Panel>
      );
    }
  }
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  waiting: PropTypes.bool
};