import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/games/love-letter/constants/cards';
import {expect} from 'chai';

describe('love letter - priest', () => {
  it('player must have card to perform action', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.HANDMAIDEN],
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
      card: cards.PRIEST,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('correctly passes turn', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRIEST, cards.BARON],
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
      card: cards.PRIEST,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jack');
  });
});
