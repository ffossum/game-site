import React from 'react';
import {Alert, Button, IncrementInput, LinkContainer, Panel} from '../common';
import PlayerList from '../game/PlayerList';
import _ from 'lodash';

if (process.env.APP_ENV === 'browser') {
  require('../../stylesheets/create-game.scss');
}

const inc = x => x + 1;
const dec = y => y - 1;

const gamePlayerCounts = [2, 3, 4];
const gamePlayersMax = _.max(gamePlayerCounts);
const gamePlayersMin = _.min(gamePlayerCounts);

function onChangePlayers(func, key, event) {
  const players = this.state.players;
  players[key] = func(players[key]);

  this.setState({
    players
  });
}

function createGame(e) {
  e.preventDefault();

  const {createGame} = this.props;
  const {loggedIn} = this.props.login;

  const settings = {
    players: this.state.players
  };

  if (loggedIn) {
    createGame(settings);
  }
}

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {
        required: 3,
        optional: 1
      }
    };
    this.createGame = createGame.bind(this);
    this.onChangePlayers = onChangePlayers.bind(this);
  }

  render() {
    const {loggedIn} = this.props.login;
    const {required, optional} = this.state.players;

    const game = {
      settings: {
        players: this.state.players
      },
      host: this.props.login.id,
      players: [this.props.login.id]
    };

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

              <IncrementInput
                label="Required players"
                value={this.state.players.required}
                minValue={gamePlayersMin}
                maxValue={gamePlayersMax - optional}
                onDecrement={_.partial(this.onChangePlayers, dec, 'required')}
                onIncrement={_.partial(this.onChangePlayers, inc, 'required')} />

              <IncrementInput
                label="Optional players"
                value={this.state.players.optional}
                minValue={0}
                maxValue={gamePlayersMax - required}
                onDecrement={_.partial(this.onChangePlayers, dec, 'optional')}
                onIncrement={_.partial(this.onChangePlayers, inc, 'optional')} />

              <div className="create-game-player-list">
                <PlayerList game={game}/>
              </div>

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
