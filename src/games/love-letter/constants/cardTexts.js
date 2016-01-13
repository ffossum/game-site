import {cards} from './cards';

export default {
  [cards.GUARD]: {
    value: '1',
    title: 'Guard',
    description: `Name a non-Guard card and choose another player.
If that player has that card, he or she is out of the round.`
  },
  [cards.PRIEST]: {
    value: '2',
    title: 'Priest',
    description: "Look at another player's hand."
  },
  [cards.BARON]: {
    value: '3',
    title: 'Baron',
    description: `You and another player secretly compare hands.
The player with the lower value is out of the round.`
  },
  [cards.HANDMAIDEN]: {
    value: '4',
    title: 'Handmaiden',
    description: "Until your next turn, ignore all effects from other players' cards."
  },
  [cards.PRINCE]: {
    value: '5',
    title: 'Prince',
    description: 'Choose any player (including yourself) to discard his or her hand and draw a new card.'
  },
  [cards.KING]: {
    value: '6',
    title: 'King',
    description: 'Trade hands with another player of your choice.'
  },
  [cards.COUNTESS]: {
    value: '7',
    title: 'Countess',
    description: 'If you have this card and the King or Prince in your hand, you must discard this card.'
  },
  [cards.PRINCESS]: {
    value: '8',
    title: 'Princess',
    description: 'If you discard this card, you are out of the round.'
  }
};
