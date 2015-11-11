import loveLetter from '../../../server/loveLetter';
import {expect} from 'chai';

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
});