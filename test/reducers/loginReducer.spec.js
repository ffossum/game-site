import {expect} from 'chai';
import reducer from '../../src/reducers/loginReducer';
import * as actions from '../../src/actions/loginActions';
import * as errors from '../../src/constants/Errors';

describe('login reducer', () => {
  it('handles login request correctly', () => {
    const previousState = {};

    const action = actions.logIn('Jack');
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      waiting: true,
      username: 'Jack'
    });
  });

  it('handles login success correctly', () => {
    const previousState = {
      waiting: true,
      username: 'Jack'
    };

    const action = actions.logInSuccess();
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      loggedIn: true,
      username: 'Jack'
    });
  });

  it('handles login failure correctly', () => {
    const previousState = {
      waiting: true,
      username: 'Jack'
    };

    const action = actions.logInFailure(errors.USERNAME_TAKEN);
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      username: 'Jack',
      error: errors.USERNAME_TAKEN
    });
  });
});