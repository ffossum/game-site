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
        players: ['Jack', 'Bob'],
        messages: []
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

    expect(state).to.deep.equal({
      'game 1': {
        players: ['Lisa', 'Bob'],
        messages: [{
          text: 'Bob has joined the game.'
        }]
      }
    });
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