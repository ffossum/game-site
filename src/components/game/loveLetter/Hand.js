import React from 'react';
import _ from 'lodash';
import PlayableCard from './PlayableCard';
import PlayableTargetedCard from './PlayableTargetedCard';

import '../../../stylesheets/loveLetter/hand.scss';

function requiresTarget(card) {
  return _.includes(['GUARD', 'PRIEST', 'BARON', 'PRINCE', 'KING'], card);
}

export default class Hand extends React.Component {
  render() {
    const hand = this.props.gameState.players[this.props.id].hand;

    return (
      <div className='love-letter-player-hand'>
        {
          _.map(hand, (card, index) => {
            if (requiresTarget(card)) {
                return <span key={card+index}>
                  <PlayableTargetedCard
                    id={this.props.id}
                    index={index}
                    card={card}
                    players={this.props.players}
                    gameState={this.props.gameState} />
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
}
