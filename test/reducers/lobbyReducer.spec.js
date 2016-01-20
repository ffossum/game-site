import {expect} from 'chai';
import reducer from '../../src/reducers/lobbyReducer';
import * as actions from '../../src/actions/lobbyActions';

describe('lobby reducer', () => {
  it('creates correct initial state', () => {
    const state = reducer(undefined, {type: 'INIT'});

    expect(state).to.deep.equal({});
  });

  it('handles game created by other', () => {
    const previousState = {};

    const action = actions.gameCreated({
      id: 'gameId',
      players: ['Jack']
    });

    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      'gameId': {
        id: 'gameId',
        players: ['Jack']
      }
    });
  });

  it("updates empty lobby with new list", () => {
    const previousState = {};

    const action = actions.updateGames({
      'game1': {
        host: 'player1'
      },
      'game2': {
        host: 'player2'
      }
    });

    const state = reducer(previousState, action);

    expect(state.game1.host).to.equal('player1');
    expect(state.game2.host).to.equal('player2');
  });

  it("merges old lobby with new games list", () => {
    const previousState = {
      'game1': {
        host: 'player1',
        state: 'game state'
      },
      'game2': {
        host: 'player2',
        players: ['player1', 'player2']
      }
    };

    const action = actions.updateGames({
      'game1': {
        host: 'player1'
      },
      'game2': {
        host: 'player2',
        players: ['player2']
      }
    });

    const state = reducer(previousState, action);

    expect(state.game1.state).to.equal('game state');
    expect(state.game2.host).to.equal('player2');
    expect(state.game2.players).to.deep.equal(['player2']);
  });

  it('handles game creation success', () => {
    const previousState = {
      'game 1': {
        id: 'game 1',
        players: ['Lisa']
      }
    };

    const action = actions.createGameSuccess({
      id: 'game 2',
      players: ['Jack', 'Bob']
    });

    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      'game 1': {
        id: 'game 1',
        players: ['Lisa']
      },
      'game 2': {
        id: 'game 2',
        players: ['Jack', 'Bob']
      }
    });
  });

  it('handles player joined correctly', () => {
    const previousState = {
      'game 1': {
        players: ['Lisa'],
        messages: []
      }
    };

    const action = actions.playerJoined({
      game: {id: 'game 1'},
      user: {id: 'Bob'}
    });

    const state = reducer(previousState, action);

    expect(state['game 1'].players).to.deep.equal(['Lisa', 'Bob']);
  });

  it('passes through unknown action', () => {
    const previousState = {
      'game 1': {
        players: ['Lisa'],
        messages: []
      }
    };

    const state = reducer(previousState, {type: 'UNKNOWN'});
    expect(state).to.equal(previousState);
  });
});
