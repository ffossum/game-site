import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/games/love-letter/constants/cards';
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.HANDMAIDEN
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jack');
    expect(state.players['Jack'].hand).to.be.not.empty;
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
      deck: [cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state.toAct).to.equal('Jill');
    expect(state.players['Jack'].hand).to.be.empty;
  });
});
