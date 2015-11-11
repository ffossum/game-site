import loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';
import _ from 'underscore';

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
      acting: 'Bob'
    };

    const state = loveLetter.useHandmaiden(previousState, action);
    expect(state).to.equal(previousState);
  });

  it('handmaiden is added as latest discard when used', () => {
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
      acting: 'Bob'
    };

    const state = loveLetter.useHandmaiden(previousState, action);

    expect(_.last(state.players['Bob'].discards)).to.equal(cards.HANDMAIDEN);
  });

  it('cannot use guard on player with handmaiden as last discard', () => {
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
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useGuard(previousState, action);

    expect(state.players['Jack'].hand).to.be.not.empty;
  });

  it('can use guard on player with handmaiden as earlier discard', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          hand: [cards.GUARD, cards.GUARD],
          discards: []
        },
        'Jack': {
          hand: [cards.PRIEST],
          discards: [cards.HANDMAIDEN, cards.GUARD]
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
      acting: 'Bob',
      target: 'Jack',
      guess: cards.PRIEST
    };

    const state = loveLetter.useGuard(previousState, action);

    expect(state.players['Jack'].hand).to.be.empty;
  });
});
