import React from 'react';
import {Input, Button} from '../common';
import fetch from 'isomorphic-fetch';
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

    const formData = {email, username, password};
    const {logIn} = this.props;

    fetch('/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(json => {
      localStorage.setItem('token', json.token);
      logIn(json.token);
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={this.state.email}
          onChange={this.onEmailChange}
          autoFocus
          type="email"
          label="Email"
          placeholder="Email"
          required />

        <Input
          value={this.state.username}
          onChange={this.onUsernameChange}
          type="text"
          label="Username"
          placeholder="Username"
          required />

        <Input
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          label="Password"
          placeholder="Password"
          required />

        <Input
          value={this.state.repeat}
          onChange={this.onRepeatChange}
          type="password"
          label="Repeat password"
          placeholder="Repeat password"
          required />

        <Button
          type="submit" >
          Register
        </Button>
      </form>
    );
  }
}
