import React from 'react';
import {Alert, Button, LinkContainer, Panel} from '../common';

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.createGame = this.createGame.bind(this);
  }
  createGame(e) {
    e.preventDefault();

    const {createGame} = this.props;
    const {loggedIn} = this.props.login;

    if (loggedIn) {
      createGame();
    }
  }
  render() {
    const {loggedIn} = this.props.login;

    return (
      <div className="container">
        {
          !loggedIn ?
          <Alert alertStyle='warning'>
            You must be logged in to create a game.
          </Alert>
          :
          <Panel>
            <form onSubmit={this.createGame}>
              <Alert alertStyle='info'>
                Game options are coming soon.
              </Alert>
              <Button
                type='submit'
                btnStyle='primary'>
                Create game
              </Button>
              {' '}
              <LinkContainer to='/lobby'>
                <Button type='button'>Cancel</Button>
              </LinkContainer>
            </form>
          </Panel>
        }
      </div>
    );
  }
}
