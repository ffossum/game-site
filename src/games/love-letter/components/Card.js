import React from 'react';
import cardTexts from '../constants/cardTexts';
import {images} from '../constants/cards';

if (process.env.APP_ENV === 'browser') {
  require('../stylesheets/card.scss');
}

export default class Card extends React.Component {
  render() {
    const {card} = this.props;
    const text = cardTexts[card];
    return (
      <div className="love-letter-card">
        <img className="card-image" src={images[card]} />
        <div className="card-value">{text.value}</div>
        <div className="card-title">{text.title}</div>
        <p>{text.description}</p>
      </div>
    );
  }
}
