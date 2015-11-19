import React from 'react';
import _ from 'lodash';
import Card from './Card';
import {Button} from 'react-bootstrap';

import '../../../stylesheets/loveLetter/hand.scss';

export default function Hand(props) {
  return (
    <div className='love-letter-player-hand'>
      {
        _.map(props.hand, (card, index) => (
          <Button key={card+index}>
            <Card card={card} />
          </Button>
        ))
      }
    </div>
  );
}
