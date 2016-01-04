import React, {PropTypes} from 'react';
import {Input, Button, Spinner} from '../common';
import texts from '../../constants/Texts';
import {isEmpty} from 'lodash';
import fetch from 'isomorphic-fetch';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {username: props.username};

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  onSubmit(event) {
    event.preventDefault();

    const {logIn} = this.props;
    const username = this.state.username.trim();

    if (!isEmpty(username)) {
      fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password: 'asdf'
        })
      }).then(response => {
        if (response.status === 200) {
          logIn(username);
        }
      });
    }
  }
  render() {
    const {waiting, error} = this.props;
    const {username} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          autoFocus
          onChange={this.onUsernameChange}
          type="text"
          label="Username"
          placeholder="Username"
          value={username}
          readOnly={waiting}
          help={error ? texts[error] : null}
          inputStyle={error ? 'error' : null} />

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
