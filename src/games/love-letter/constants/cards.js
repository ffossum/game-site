export const cards = {
  GUARD: 'GUARD',
  PRIEST: 'PRIEST',
  BARON: 'BARON',
  HANDMAIDEN: 'HANDMAIDEN',
  PRINCE: 'PRINCE',
  KING: 'KING',
  COUNTESS: 'COUNTESS',
  PRINCESS: 'PRINCESS',
  FACE_DOWN: '?'
};

export const values = {
  [cards.GUARD]: 1,
  [cards.PRIEST]: 2,
  [cards.BARON]: 3,
  [cards.HANDMAIDEN]: 4,
  [cards.PRINCE]: 5,
  [cards.KING]: 6,
  [cards.COUNTESS]: 7,
  [cards.PRINCESS]: 8
};

export const images = {
  [cards.GUARD]: '/static/love-letter/guard.jpg',
  [cards.PRIEST]: '/static/love-letter/priest.jpg',
  [cards.BARON]: '/static/love-letter/baron.jpg',
  [cards.HANDMAIDEN]: '/static/love-letter/handmaid.jpg',
  [cards.PRINCE]: '/static/love-letter/prince.jpg',
  [cards.KING]: '/static/love-letter/king.jpg',
  [cards.COUNTESS]: '/static/love-letter/countess.jpg',
  [cards.PRINCESS]: '/static/love-letter/princess.jpg'
};

export default {
  cards,
  values,
  images
};
