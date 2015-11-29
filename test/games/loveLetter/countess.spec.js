import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/games/love-letter/constants/cards';
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.COUNTESS,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jack');
    expect(state.players['Jack'].hand).to.deep.equal([cards.PRIEST, cards.PRINCE]);
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
      deck: [cards.PRINCESS, cards.BARON, cards.PRINCE],
      info: []
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
});
