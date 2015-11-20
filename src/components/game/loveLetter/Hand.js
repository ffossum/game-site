import React from 'react';
import _ from 'lodash';
import PlayableCard from './PlayableCard';
import PlayableTargetedCard from './PlayableTargetedCard';

import '../../../stylesheets/loveLetter/hand.scss';

function requiresTarget(card) {
  return _.includes(['GUARD', 'PRIEST', 'BARON', 'PRINCE', 'KING'], card);
}

export default function Hand(props) {
  const hand = props.gameState.players[props.id].hand;

  return (
    <div className='love-letter-player-hand'>
      {
        _.map(hand, (card, index) => {
          if (requiresTarget(card)) {
              return <span key={card+index}>
                <PlayableTargetedCard
                  index={index}
                  card={card}
                  players={props.players}
                  gameState={props.gameState} />
              </span>;
          } else {
            return <span key={card+index}>
              <PlayableCard card={card} />
            </span>;
          }
        })
      }
    </div>
  );
}
