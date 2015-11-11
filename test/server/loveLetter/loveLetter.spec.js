import loveLetter from '../../../server/loveLetter';
import {cards} from '../../../server/loveLetterCards';
import {expect} from 'chai';
import _ from 'underscore';

describe('love letter', () => {
  it('creates correct initial state for 2 player game', () => {
    const state = loveLetter.createInitialState(['Bob', 'Jack']);
    const firstPlayer = state.players[state.order[0]];

    expect(firstPlayer.hand.length).to.equal(2);
    expect(state.toAct).to.equal(state.order[0]);
    expect(state.deck.length).to.equal(13);
  });

  it('creates correct initial state for 3 player game', () => {
    const state = loveLetter.createInitialState(['Bob', 'Jack', 'Jill']);
    const firstPlayer = state.players[state.order[0]];

    expect(firstPlayer.hand.length).to.equal(2);
    expect(state.toAct).to.equal(state.order[0]);
    expect(state.deck.length).to.equal(12);
  });

  it('creates correct initial state for 4 player game', () => {
    const state = loveLetter.createInitialState(['Bob', 'Jack', 'Jill', 'Chris']);
    const firstPlayer = state.players[state.order[0]];

    expect(firstPlayer.hand.length).to.equal(2);
    expect(state.toAct).to.equal(state.order[0]);
    expect(state.deck.length).to.equal(11);
  });

  describe('secret information', () => {
    let state;

    beforeEach(() => {
      state = {
        toAct: 'Bob',
        players: {
          'Bob': {
            hand: [cards.GUARD, cards.GUARD],
            discards: []
          },
          'Jack': {
            hand: [cards.PRIEST],
            discards: [cards.COUNTESS]
          },
          'Jill': {
            hand: [cards.KING],
            discards: []
          }
        },
        order: ['Bob', 'Jack', 'Jill'],
        deck: [cards.BARON, cards.PRINCE]
      };
    });

    it('is hidden from players', () => {
      const visibleState = loveLetter.asVisibleBy(state, 'Bob');

      expect(visibleState).to.deep.equal({
        toAct: 'Bob',
        players: {
          'Bob': {
            hand: [cards.GUARD, cards.GUARD],
            discards: []
          },
          'Jack': {
            hand: [cards.FACE_DOWN],
            discards: [cards.COUNTESS]
          },
          'Jill': {
            hand: [cards.FACE_DOWN],
            discards: []
          }
        },
        order: ['Bob', 'Jack', 'Jill'],
        deck: 2
      });
    });

    it('hiding does not alter original state', () => {
      const originalState = _.clone(state);

      loveLetter.asVisibleBy(state, 'Bob');

      expect(state).to.deep.equal(originalState);
    });
  });
});