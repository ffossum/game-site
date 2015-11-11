import loveLetter from '../../../server/loveLetter';
import {expect} from 'chai';

describe('love letter - guard', () => {
  it('player must have guard card to perform guard action', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['priest', 'handmaiden'],
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
      target: 'Jack',
      guess: 'handmaiden'
    };

    const state = loveLetter.useGuard(previousState, action);
    expect(state).to.equal(previousState);

  });

  it('wrong guess simply passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['guard', 'guard'],
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
      target: 'Jack',
      guess: 'handmaiden'
    };

    const state = loveLetter.useGuard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: ['guard'],
          discards: ['guard']
        },
        'Jack': {
          hand: ['priest', 'prince'],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: ['baron']
    });
  });

  it('correct guess eliminates target and passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['guard', 'guard'],
          discards: []
        },
        'Jack': {
          hand: ['priest'],
          discards: []
        },
        'Jill': {
          hand: ['king'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack',
      guess: 'priest'
    };

    const state = loveLetter.useGuard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jill',
      players: {
        'Bob': {
          hand: ['guard'],
          discards: ['guard']
        },
        'Jack': {
          hand: [],
          discards: ['priest']
        },
        'Jill': {
          hand: ['king', 'prince'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron']
    });
  });
});