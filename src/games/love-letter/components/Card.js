import React from 'react';
import texts from '../../../constants/Texts';
import '../stylesheets/card.scss';
import {images} from '../constants/cards';

export default class Card extends React.Component {
  render() {
    const {card} = this.props;
    const text = texts[card];
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
