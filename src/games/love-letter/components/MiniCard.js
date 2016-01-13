import React from 'react';
import cardTexts from '../constants/cardTexts';
import {images} from '../constants/cards';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

if (process.env.APP_ENV === 'browser') {
  require('../stylesheets/mini-card.scss');
}

export default class MiniCard extends React.Component {
  render() {
    const {card, tooltipId} = this.props;
    const text = cardTexts[card];

    const tooltip = <Tooltip id={tooltipId}>{text.value} - {text.title}</Tooltip>;

    return (
      <div className="love-letter-mini-card">
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <img className="card-image" src={images[card]} />
        </OverlayTrigger>
      </div>
    );
  }
}
