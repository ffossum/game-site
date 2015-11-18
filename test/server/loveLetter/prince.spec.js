import * as loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';

describe('love letter - prince', () => {
  it('player must have prince card to perform prince action', () => {
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
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.usePrince(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('target discards hand and draws new card', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.HANDMAIDEN],
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
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.usePrince(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.HANDMAIDEN],
          discards: [cards.PRINCE]
        },
        'Jack': {
          hand: [cards.PRINCE, cards.BARON],
          discards: [cards.PRIEST]
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.PRINCESS]
    });
  });

  it('may target self', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.HANDMAIDEN],
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
      acting: 'Bob',
      target: 'Bob'
    };

    const state = loveLetter.usePrince(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.PRINCE],
          discards: [cards.PRINCE, cards.HANDMAIDEN]
        },
        'Jack': {
          hand: [cards.PRIEST, cards.BARON],
          discards: []
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.PRINCESS]
    });
  });
});