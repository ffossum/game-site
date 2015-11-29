import * as loveLetter from '../../../src/server/loveLetter';
import {cards} from '../../../src/games/love-letter/constants/cards';
import {expect} from 'chai';

describe('love letter', () => {
  describe('game initial state', () => {
    it('deals two cards to first player', () => {
      const state = loveLetter.createInitialState(['Bob', 'Jack']);
      const firstPlayer = state.players[state.toAct];

      expect(firstPlayer.hand.length).to.equal(2);
    });

    it('deck has 12 cards in 2 player game', () => {
      const state = loveLetter.createInitialState(['Bob', 'Jack']);

      expect(state.deck.length).to.equal(12);
    });

    it('deck has 11 cards in 3 player game', () => {
      const state = loveLetter.createInitialState(['Bob', 'Jack', 'Jill']);

      expect(state.deck.length).to.equal(11);
    });

    it('deck has 10 cards in 4 player game', () => {
      const state = loveLetter.createInitialState(['Bob', 'Jack', 'Jill', 'Chris']);

      expect(state.deck.length).to.equal(10);
    });
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
        deck: [cards.BARON, cards.PRINCE],
        info: []
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
        deck: 2,
        info: []
      });
    });

    it('hiding does not alter original state', () => {
      const originalState = JSON.parse(JSON.stringify(state));

      loveLetter.asVisibleBy(state, 'Bob');

      expect(state).to.deep.equal(originalState);
    });
  });

  describe('end of round', () => {
    const previousState = {
      toAct: 'Bob',
      players: {
        'Bob': {
          score: 0,
          hand: [cards.GUARD, cards.GUARD],
          discards: [],
          protected: true
        },
        'Jack': {
          score: 0,
          hand: [cards.PRIEST],
          discards: [cards.COUNTESS]
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
      guess: cards.PRIEST
    };

    const state = loveLetter.useCard(previousState, action);

    it('the only remaining player scores a point', () => {
      expect(state.players['Bob'].score).to.equal(1);
    });

    it('winning player starts next round', () => {
      expect(state.toAct).to.equal('Bob');
    });

    it('handmaiden protection from previous round no longer applies', () => {
      expect(state.players['Bob'].protected).to.be.not.true;
    });

    it('discards are emptied for next round', () => {
      expect(state.players['Bob'].discards).to.be.empty;
      expect(state.players['Jack'].discards).to.be.empty;
    });

    it('new deck is created for next round', () => {
      expect(state.deck.length).to.equal(12);
    });

    it('new hands are dealt', () => {
      expect(state.players['Bob'].hand.length).to.equal(2);
      expect(state.players['Jack'].hand.length).to.equal(1);
    });
  });
});
