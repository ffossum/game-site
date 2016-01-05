import React, {PropTypes} from 'react';
import {Input, Button, Spinner} from '../common';
import texts from '../../constants/Texts';
import {isEmpty} from 'lodash';
import fetch from 'isomorphic-fetch';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      password: ''
    };

    this.onUsernameChange = this.onChange.bind(this, 'username');
    this.onPasswordChange = this.onChange.bind(this, 'password');
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(property, event) {
    this.setState({[property]: event.target.value});
  }
  onSubmit(event) {
    event.preventDefault();

    const {logIn} = this.props;
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    if (isEmpty(username) || isEmpty(password)) {
      //TODO show validation errors
      return;
    }

    fetch('/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(response => {
      if (response.status === 200) {
        logIn(username);
      }
    });
  }
  render() {
    const {waiting, error} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          autoFocus
          onChange={this.onUsernameChange}
          type="text"
          label="Username"
          placeholder="Username"
          value={this.state.username}
          readOnly={waiting}
          help={error ? texts[error] : null}
          inputStyle={error ? 'error' : null}
          required />

        <Input
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          label="Password"
          placeholder="Password"
          required />

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
