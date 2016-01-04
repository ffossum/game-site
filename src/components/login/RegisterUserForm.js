import React from 'react';
import {Input, Button} from '../common';

export default class RegisterUserForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          autoFocus
          type="email"
          label="Email"
          placeholder="Email" />

        <Input
          type="text"
          label="Username"
          placeholder="Username" />

        <Input
          type="password"
          label="Password"
          placeholder="Password" />

        <Input
          type="password"
          label="Repeat password"
          placeholder="Repeat password" />

        <Button
          type="submit" >
          Register
        </Button>
      </form>
    );
  }
}
