import React from 'react';
import texts from '../../../constants/Texts';

export default class Card extends React.Component {
  render() {
    const {card} = this.props;
    const text = texts[card];
    return (
      <div className="love-letter-card">
        <h1>{text.value}</h1>
        <h2>{text.title}</h2>
        <p>{text.description}</p>
      </div>
    );
  }
}
