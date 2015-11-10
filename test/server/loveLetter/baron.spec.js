import loveLetter from '../../../server/loveLetter';
import {expect} from 'chai';

describe('love letter - baron', () => {
  it('player must have baron card to perform baron action', () => {
    const previousState = {
      toAct: 'Bob',
      players: [{
        name: 'Bob',
        hand: ['priest', 'handmaiden'],
        discards: []
      }, {
        name: 'Jack',
        hand: ['priest'],
        discards: []
      }],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      guess: {
        player: 'Jack',
        card: 'handmaiden'
      }
    };

    const state = loveLetter.useBaron(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('higher value than target eliminates target', () => {
    const previousState = {
      toAct: 'Bob',
      players: [{
        name: 'Bob',
        hand: ['prince', 'baron'],
        discards: []
      }, {
        name: 'Jack',
        hand: ['priest'],
        discards: []
      }, {
        name: 'Jill',
        hand: ['handmaiden'],
        discards: []
      }],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useBaron(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jill',
      players: [{
        name: 'Bob',
        hand: ['prince'],
        discards: ['baron']
      }, {
        name: 'Jack',
        hand: [],
        discards: ['priest']
      }, {
        name: 'Jill',
        hand: ['handmaiden', 'prince'],
        discards: []
      }],
      deck: ['baron']
    });
  });

  it('lower value than target eliminates self', () => {
    const previousState = {
      toAct: 'Bob',
      players: [{
        name: 'Bob',
        hand: ['prince', 'baron'],
        discards: []
      }, {
        name: 'Jack',
        hand: ['king'],
        discards: []
      }, {
        name: 'Jill',
        hand: ['handmaiden'],
        discards: []
      }],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useBaron(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: [{
        name: 'Bob',
        hand: [],
        discards: ['baron', 'prince']
      }, {
        name: 'Jack',
        hand: ['king', 'prince'],
        discards: []
      }, {
        name: 'Jill',
        hand: ['handmaiden'],
        discards: []
      }],
      deck: ['baron']
    });
  });

  it('identical card values eliminates noone', () => {
    const previousState = {
      toAct: 'Bob',
      players: [{
        name: 'Bob',
        hand: ['prince', 'baron'],
        discards: []
      }, {
        name: 'Jack',
        hand: ['prince'],
        discards: []
      }, {
        name: 'Jill',
        hand: ['handmaiden'],
        discards: []
      }],
      deck: ['baron', 'priest']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useBaron(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: [{
        name: 'Bob',
        hand: ['prince'],
        discards: ['baron']
      }, {
        name: 'Jack',
        hand: ['prince', 'priest'],
        discards: []
      }, {
        name: 'Jill',
        hand: ['handmaiden'],
        discards: []
      }],
      deck: ['baron']
    });
  });
});