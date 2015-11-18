import * as loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';

describe('love letter - guard', () => {
  it('player must have guard card to perform guard action', () => {
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
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.HANDMAIDEN
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.equal(previousState);

  });

  it('wrong guess simply passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.GUARD],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.HANDMAIDEN
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.GUARD],
          discards: [cards.GUARD]
        },
        'Jack': {
          hand: [cards.PRIEST, cards.PRINCE],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.BARON]
    });
  });

  it('correct guess eliminates target and passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.GUARD],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: []
        },
        'Jill': {
          hand: [cards.KING],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jill',
      players: {
        'Bob': {
          hand: [cards.GUARD],
          discards: [cards.GUARD]
        },
        'Jack': {
          hand: [],
          discards: [cards.PRIEST]
        },
        'Jill': {
          hand: [cards.KING, cards.PRINCE],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON]
    });
  });
});