import loveLetter from '../../../server/loveLetter';
import {expect} from 'chai';

describe('love letter', () => {
  it('creates correct initial state for 2 player game', () => {
    const state = loveLetter.createInitialState(['Bob', 'Jack']);

    expect(state.players[0].hand.length).to.equal(2);
    expect(state.toAct).to.equal(state.players[0].name);
    expect(state.deck.length).to.equal(13);
  });

  it('creates correct initial state for 3 player game', () => {
    const state = loveLetter.createInitialState(['Bob', 'Jack', 'Jill']);

    expect(state.players[0].hand.length).to.equal(2);
    expect(state.toAct).to.equal(state.players[0].name);
    expect(state.deck.length).to.equal(12);
  });

  it('creates correct initial state for 4 player game', () => {
    const state = loveLetter.createInitialState(['Bob', 'Jack', 'Jill', 'Chris']);

    expect(state.players[0].hand.length).to.equal(2);
    expect(state.toAct).to.equal(state.players[0].name);
    expect(state.deck.length).to.equal(11);
  });
});