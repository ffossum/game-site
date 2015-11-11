import loveLetter from '../../../server/loveLetter';
import {expect} from 'chai';

describe('love letter - priest', () => {
  it('player must have card to perform action', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['guard', 'handmaiden'],
          discards: []
        },
        'Jack': {
          hand: ['priest'],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.usePriest(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('correctly passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['priest', 'baron'],
          discards: []
        },
        'Jack': {
          hand: ['prince'],
          discards: []
        },
        'Jill': {
          hand: ['handmaiden'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron', 'priest']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.usePriest(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: ['baron'],
          discards: ['priest']
        },
        'Jack': {
          hand: ['prince', 'priest'],
          discards: []
        },
        'Jill': {
          hand: ['handmaiden'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron']
    });
  });
});