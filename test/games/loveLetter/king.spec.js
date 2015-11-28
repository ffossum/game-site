import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/server/loveLetterCards';
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.KING,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.KING,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.players['Bob'].hand).to.deep.equal([cards.GUARD]);
    expect(state.players['Jack'].hand).to.deep.equal([cards.PRIEST, cards.PRINCE]);
  });
});
