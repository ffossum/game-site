import {expect} from 'chai';
import reducer from '../../src/reducers/chatReducer';
import * as actions from '../../src/actions/chatActions';

describe('chat reducer', () => {
  it('creates correct initial state', () => {
    const state = reducer(undefined, {type: 'INIT'});

    expect(state).to.deep.equal({
      messages: []
    });
  });

  it('handles send message correctly', () => {
    const previousState = {
      messages: []
    };

    const message = {
      user: 'Jack',
      text: 'message text'
    };

    const action = actions.sendMessage(message.user, message.text);
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      messages: [message]
    });
  });

  it('handles receive message correctly', () => {
    const previousMessage = {
      user: 'Jack',
      text: 'message text'
    };

    const previousState = {
      messages: [previousMessage]
    };

    const newMessage = {
      user: 'Bob',
      text: 'hi'
    };

    const action = actions.newMessage(newMessage);
    const state = reducer(previousState, action);

    expect(state).to.deep.equal({
      messages: [previousMessage, newMessage]
    });
  });

  it('passes through unknown action', () => {
    const previousState = {
      messages: [{
        user: 'Bob',
        text: 'hi'
      }]
    };

    const state = reducer(previousState, {type: 'UNKNOWN'});

    expect(state).to.equal(previousState);
  });
});