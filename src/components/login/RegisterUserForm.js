import React from 'react';
import {Input, Button, Spinner} from '../common';
import texts from '../../constants/Texts';

export default class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repeat: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onChange.bind(this, 'email');
    this.onUsernameChange = this.onChange.bind(this, 'username');
    this.onPasswordChange = this.onChange.bind(this, 'password');
    this.onRepeatChange = this.onChange.bind(this, 'repeat');
  }
  onChange(property, event) {
    this.setState({[property]: event.target.value});
  }
  onSubmit(event) {
    event.preventDefault();
    const {email, username, password, repeat} = this.state;

    this.props.registerUser(email.trim(), username.trim(), password, repeat);
  }
  render() {
    const {waiting, error = {}} = this.props;
    const registerUserError = error.registerUser || {};

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={this.state.email}
          onChange={this.onEmailChange}
          autoFocus
          type="email"
          label="Email"
          placeholder="Email"
          readOnly={waiting}
          inputStyle={registerUserError.email ? 'error' : null}
          help={registerUserError.email ? texts[registerUserError.email] : null}
          required />

        <Input
          value={this.state.username}
          onChange={this.onUsernameChange}
          type="text"
          label="Username"
          placeholder="Username"
          readOnly={waiting}
          inputStyle={registerUserError.username ? 'error' : null}
          help={registerUserError.username ? texts[registerUserError.username] : null}
          required />

        <Input
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          label="Password"
          placeholder="Password"
          readOnly={waiting}
          inputStyle={registerUserError.password ? 'error' : null}
          required />

        <Input
          value={this.state.repeat}
          onChange={this.onRepeatChange}
          type="password"
          label="Repeat password"
          placeholder="Repeat password"
          readOnly={waiting}
          inputStyle={registerUserError.password ? 'error' : null}
          help={registerUserError.password ? texts[registerUserError.password] : null}
          required />

        <Button
          type="submit"
          disabled={waiting}>
          {waiting ? <span><Spinner /> Registering...</span> : 'Register'}
        </Button>
      </form>
    );
  }
}
