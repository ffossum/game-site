import {expect} from 'chai';
import reducer from '../../src/reducers/loginReducer';
import * as actions from '../../src/actions/loginActions';
import * as errors from '../../src/constants/Errors';

describe('login reducer', () => {
  it('creates correct initial state', () => {
    const action = {type: 'INIT'};
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
      loggedIn: false
    });
  });

  it('handles login request correctly', () => {
    const previousState = {
      loggedIn: false
    };

    const action = actions.logInWithToken('token');
    const state = reducer(previousState, action);

    expect(state.waiting).to.be.true;
  });

  it('handles login success correctly', () => {
    const previousState = {
      loggedIn: false,
      waiting: true
    };

    const action = actions.logInSuccess({
      user: {
        id: 'userId',
        name: 'Jack'
      }
    });
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      loggedIn: true,
      id: 'userId',
      username: 'Jack'
    });
  });

  it('handles login failure correctly', () => {
    const previousState = {
      loggedIn: false,
      waiting: true,
      username: 'Jack'
    };

    const action = actions.logInFailure(errors.USERNAME_TAKEN);
    const state = reducer(previousState, action);

    expect(state.error).to.equal(errors.USERNAME_TAKEN);
  });

  it('handles logout correctly', () => {
    const previousState = {
      loggedIn: true,
      username: 'Jack'
    };

    const action = actions.logOut();
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      loggedIn: false
    });
  });

  it('passes through unknown action', () => {
    const previousState = {
      loggedIn: true,
      username: 'Jack'
    };

    const state = reducer(previousState, {type: 'UNKNOWN'});

    expect(state).to.equal(previousState);
  });
});
