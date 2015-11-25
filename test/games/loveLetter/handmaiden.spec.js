import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/server/loveLetterCards';
import {expect} from 'chai';
import _ from 'lodash';

describe('love letter - handmaiden', () => {
  it('player must have handmaiden card to perform handmaiden action', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.PRIEST],
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
      card: cards.HANDMAIDEN,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('player gains protection when using handmaiden', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.HANDMAIDEN, cards.PRIEST],
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
      card: cards.HANDMAIDEN,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);

    expect(_.last(state.players['Bob'].discards)).to.equal(cards.HANDMAIDEN);
    expect(state.players['Bob'].protected).to.be.true;
  });

  it("player loses protection when it's their turn", () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.HANDMAIDEN, cards.PRIEST],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: [],
          protected: true
        }
      },
      order: ['Bob', 'Jack'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.HANDMAIDEN,
      acting: 'Bob'
    };

    const state = loveLetter.useCard(previousState, action);
    expect(state.toAct).to.equal('Jack');
    expect(state.players['Jack'].protected).to.be.not.true;
  });

  it('cannot use guard on player protected by handmaiden', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.GUARD],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: [cards.HANDMAIDEN],
          protected: true
        },
        'Jill': {
          hand: [cards.KING],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state.toAct).to.equal('Bob');
    expect(state.players['Jack'].hand).to.be.not.empty;
  });

  it('can use guard on player with discarded handmaiden if not protected', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.GUARD],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: [cards.HANDMAIDEN]
        },
        'Jill': {
          hand: [cards.KING],
          discards: []
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state.players['Jack'].hand).to.be.empty;
  });

  it('can use guard with no effect if all other players are protected', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.GUARD],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: [cards.HANDMAIDEN],
          protected: true
        },
        'Jill': {
          hand: [cards.KING],
          discards: [],
          protected: true
        }
      },
      order: ['Bob', 'Jack', 'Jill'],
      deck: [cards.BARON, cards.PRINCE]
    };

    const action = {
      card: cards.GUARD,
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useCard(previousState, action);

    expect(state.toAct).to.equal('Jack');
    expect(state.players['Jack'].hand).to.be.not.empty;
  });
});
