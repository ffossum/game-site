const cards = {
  GUARD: 'GUARD',
  PRIEST: 'PRIEST',
  BARON: 'BARON',
  HANDMAIDEN: 'HANDMAIDEN',
  PRINCE: 'PRINCE',
  KING: 'KING',
  COUNTESS: 'COUNTESS',
  PRINCESS: 'PRINCESS'
};

const values = {
  [cards.GUARD]: 1,
  [cards.PRIEST]: 2,
  [cards.BARON]: 3,
  [cards.HANDMAIDEN]: 4,
  [cards.PRINCE]: 5,
  [cards.KING]: 6,
  [cards.COUNTESS]: 7,
  [cards.PRINCESS]: 8
};

module.exports = {
  cards,
  values
};