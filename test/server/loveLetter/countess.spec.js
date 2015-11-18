import * as loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';

describe('love letter - countess', () => {
  it('player must have countess card to perform countess action', () => {
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
      card: cards.COUNTESS,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('correctly passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.COUNTESS, cards.HANDMAIDEN],
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
      card: cards.COUNTESS,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.HANDMAIDEN],
          discards: [cards.COUNTESS]
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

  it('player may not play prince if he has countess in hand', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.COUNTESS],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.PRINCESS, cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.equal(previousState);
  });

  it('player may not play king if he has countess in hand', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.COUNTESS, cards.KING],
          discards: []
        },
        'Jack': {
          hand: [cards.GUARD],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.KING,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.equal(previousState);
  });
});