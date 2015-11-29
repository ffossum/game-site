import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/games/love-letter/constants/cards';
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
      deck: [cards.BARON, cards.PRINCE],
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
      deck: [cards.PRINCESS, cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jack');
    expect(state.players['Jack'].hand).to.deep.equal([cards.PRINCE, cards.BARON]);
    expect(state.players['Jack'].discards).to.deep.equal([cards.PRIEST]);
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
      deck: [cards.PRINCESS, cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jack');
    expect(state.players['Bob'].hand).to.deep.equal([cards.PRINCE]);
    expect(state.players['Bob'].discards).to.deep.equal([cards.PRINCE, cards.HANDMAIDEN]);
  });

  it('target is eliminated if they are forced to discard Princess', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.PRINCE, cards.HANDMAIDEN],
          discards: []
        },
        'Jack': {
          hand: [cards.PRINCESS],
          discards: []
        },
        'Jill': {
          hand: [cards.COUNTESS],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.GUARD, cards.BARON, cards.PRINCE],
      info: []
    };

    const action = {
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jill');
    expect(state.players['Jack'].hand).to.be.empty;
    expect(state.players['Jack'].discards).to.deep.equal([cards.PRINCESS]);
  });
});
