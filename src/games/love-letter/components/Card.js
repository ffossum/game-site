import React from 'react';
import texts from '../../../constants/Texts';
import '../stylesheets/card.scss';
import {cards} from '../constants/cards';

const images = {
  [cards.GUARD]: '/static/love-letter/guard.jpg',
  [cards.PRIEST]: '/static/love-letter/priest.jpg',
  [cards.BARON]: '/static/love-letter/baron.jpg',
  [cards.HANDMAIDEN]: '/static/love-letter/handmaid.jpg',
  [cards.PRINCE]: '/static/love-letter/prince.jpg',
  [cards.KING]: '/static/love-letter/king.jpg',
  [cards.COUNTESS]: '/static/love-letter/countess.jpg',
  [cards.PRINCESS]: '/static/love-letter/princess.jpg'
};

export default class Card extends React.Component {
  render() {
    const {card} = this.props;
    const text = texts[card];
    return (
      <div className="love-letter-card">
        <img className="love-letter-card-image" src={images[card]} />
        <div className="card-value">{text.value}</div>
        <div className="card-title">{text.title}</div>
        <p>{text.description}</p>
      </div>
    );
  }
}
