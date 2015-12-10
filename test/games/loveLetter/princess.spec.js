import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/games/love-letter/constants/cards';
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
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
      toAct: 'Jack',
      players: {
        'Bob': {
          hand: [cards.BARON],
          discards: []
        },
        'Jack': {
          hand: [cards.PRINCESS, cards.KING],
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
      card: cards.PRINCESS,
      acting: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state.toAct).to.equal('Jill');
    expect(state.players['Jack'].hand).to.be.empty;
    expect(state.players['Jack'].discards).to.deep.equal([cards.PRINCESS, cards.KING]);
  });
});
