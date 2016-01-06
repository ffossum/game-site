import React from 'react';
import {Input, Button, Spinner} from '../common';
import {isEmpty} from 'lodash';

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
    let {email, username, password, repeat} = this.state;
    email = email.trim();
    username = username.trim();

    if (isEmpty(email) || isEmpty(username) || isEmpty(password) || password !== repeat) {
      //TODO show validation errors
      return;
    }

    const {registerUser} = this.props;
    registerUser(email, username, password);
  }
  render() {
    const {waiting} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={this.state.email}
          onChange={this.onEmailChange}
          autoFocus
          type="email"
          label="Email"
          placeholder="Email"
          disabled={waiting}
          required />

        <Input
          value={this.state.username}
          onChange={this.onUsernameChange}
          type="text"
          label="Username"
          placeholder="Username"
          disabled={waiting}
          required />

        <Input
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          label="Password"
          placeholder="Password"
          disabled={waiting}
          required />

        <Input
          value={this.state.repeat}
          onChange={this.onRepeatChange}
          type="password"
          label="Repeat password"
          placeholder="Repeat password"
          disabled={waiting}
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
