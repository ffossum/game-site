import React from 'react';
import texts from '../../../constants/Texts';
import {images} from '../constants/cards';
import '../stylesheets/mini-card.scss';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class MiniCard extends React.Component {
  render() {
    const {card} = this.props;
    const text = texts[card];

    const tooltip = <Tooltip>{text.value} - {text.title}</Tooltip>;

    return (
      <div className="love-letter-mini-card">
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <img className="card-image" src={images[card]} />
        </OverlayTrigger>
      </div>
    );
  }
}
