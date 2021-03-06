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

  it('handles login success correctly', () => {
    const previousState = {
      loggedIn: false,
      waiting: true
    };

    const action = actions.logInSuccess({
      id: 'userId',
      name: 'Jack'
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

    expect(state.error).to.deep.equal({login: errors.USERNAME_TAKEN});
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
