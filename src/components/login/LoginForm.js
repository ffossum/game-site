import React, {PropTypes} from 'react';
import {Input, Button, Spinner} from '../common';
import texts from '../../constants/Texts';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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

    const {username, password} = this.state;
    this.props.logInWithUsernameAndPassword(username.trim(), password.trim());
  }
  render() {
    const {waiting, error = {}} = this.props;
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
          inputStyle={error.login ? 'error' : null}
          required />

        <Input
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          label="Password"
          placeholder="Password"
          help={error.login ? texts[error.login] : null}
          inputStyle={error.login ? 'error' : null}
          readOnly={waiting}
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
  logInWithUsernameAndPassword: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  waiting: PropTypes.bool
};
