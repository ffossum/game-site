import loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';

describe('love letter - king', () => {
  it('player must have card to perform action', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRIEST, cards.HANDMAIDEN],
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
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useKing(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('switches cards with target', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRIEST, cards.KING],
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
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useKing(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.GUARD],
          discards: [cards.KING]
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
});