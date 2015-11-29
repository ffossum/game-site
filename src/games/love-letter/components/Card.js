import React from 'react';
import texts from '../../../constants/Texts';

export default class Card extends React.Component {
  render() {
    const {card} = this.props;
    return <div>{texts[card].title}</div>;
  }
}
