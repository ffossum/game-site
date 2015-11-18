import * as loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';

describe('love letter - princess', () => {
  it('player must have princess card to perform princess action', () => {
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
      card: cards.PRINCESS,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('player using princess is eliminated', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCESS, cards.BARON],
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
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.PRINCESS,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [],
          discards: [cards.PRINCESS, cards.BARON]
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
      deck: [cards.BARON]
    });
  });
});