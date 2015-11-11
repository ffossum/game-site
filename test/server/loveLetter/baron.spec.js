import loveLetter from '../../../server/loveLetter';
import {expect} from 'chai';

describe('love letter - baron', () => {
  it('player must have baron card to perform baron action', () => {
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
      players: {
        'Bob': {
          hand: ['prince', 'baron'],
          discards: []
        },
        'Jack': {
          hand: ['priest'],
          discards: []
        },
        'Jill': {
          hand: ['handmaiden'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useBaron(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jill',
      players: {
        'Bob': {
          hand: ['prince'],
          discards: ['baron']
        },
        'Jack': {
          hand: [],
          discards: ['priest']
        },
        'Jill': {
          hand: ['handmaiden', 'prince'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron']
    });
  });

  it('lower value than target eliminates self', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['prince', 'baron'],
          discards: []
        },
        'Jack': {
          hand: ['king'],
          discards: []
        },
        'Jill': {
          hand: ['handmaiden'],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: ['baron', 'prince']
    };

    const action = {
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useBaron(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [],
          discards: ['baron', 'prince']
        },
        'Jack': {
          hand: ['king', 'prince'],
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

  it('identical card values eliminates noone', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: ['prince', 'baron'],
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

    const state = loveLetter.useBaron(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: ['prince'],
          discards: ['baron']
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