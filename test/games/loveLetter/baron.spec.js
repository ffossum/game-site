import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/server/loveLetterCards';
import {expect} from 'chai';

describe('love letter - baron', () => {
  it('player must have baron card to perform baron action', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRIEST, cards.HANDMAIDEN],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.BARON,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('higher value than target eliminates target', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.BARON],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: []
        },
        'Jill': {
          hand: [cards.HANDMAIDEN],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.BARON,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jill',
      players: {
        'Bob': {
          hand: [cards.PRINCE],
          discards: [cards.BARON]
        },
        'Jack': {
          hand: [],
          discards: [cards.PRIEST]
        },
        'Jill': {
          hand: [cards.HANDMAIDEN, cards.PRINCE],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON],
      info: []
    });
  });

  it('lower value than target eliminates self', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.BARON],
          discards: []
        },
        'Jack': {
          hand: [cards.KING],
          discards: []
        },
        'Jill': {
          hand: [cards.HANDMAIDEN],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.BARON,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [],
          discards: [cards.BARON, cards.PRINCE]
        },
        'Jack': {
          hand: [cards.KING, cards.PRINCE],
          discards: []
        },
        'Jill': {
          hand: [cards.HANDMAIDEN],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON],
      info: []
    });
  });

  it('identical card values eliminates noone', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.BARON],
          discards: []
        },
        'Jack': {
          hand: [cards.PRINCE],
          discards: []
        },
        'Jill': {
          hand: [cards.HANDMAIDEN],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRIEST],
      info: []
    };

    const action = {
      card: cards.BARON,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.PRINCE],
          discards: [cards.BARON]
        },
        'Jack': {
          hand: [cards.PRINCE, cards.PRIEST],
          discards: []
        },
        'Jill': {
          hand: [cards.HANDMAIDEN],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON],
      info: []
    });
  });
});
