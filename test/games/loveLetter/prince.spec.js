import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/server/loveLetterCards';
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
      deck: [cards.PRINCESS, cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

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
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);

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
      deck: [cards.GUARD, cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.PRINCE,
      acting: 'Bob',
      target: 'Jack'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state).to.deep.equal({
      toAct: 'Jill',
      players: {
        'Bob': {
          hand: [cards.HANDMAIDEN],
          discards: [cards.PRINCE]
        },
        'Jack': {
          hand: [],
          discards: [cards.PRINCESS]
        },
        'Jill': {
          hand: [cards.COUNTESS, cards.PRINCE],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.GUARD, cards.BARON]
    });
  });
});