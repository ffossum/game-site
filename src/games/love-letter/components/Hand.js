import React from 'react';
import _ from 'lodash';
import PlayableCard from './PlayableCard';
import PlayableTargetedCard from './PlayableTargetedCard';

import '../stylesheets/hand.scss';

function requiresTarget(card) {
  return _.includes(['GUARD', 'PRIEST', 'BARON', 'PRINCE', 'KING'], card);
}

export default class Hand extends React.Component {
  render() {
    const {login, players, game, playCard} = this.props;
    const hand = game.state.players[login.id].hand;

    return (
      <div className='love-letter-player-hand'>
        {
          _.map(hand, (card, index) => {
            if (requiresTarget(card)) {
                return <span key={card + index}>
                  <PlayableTargetedCard
                    id={card + index}
                    login={login}
                    card={card}
                    players={players}
                    game={game}
                    playCard={playCard} />
                </span>;
            } else {
              return <span key={card+index}>
                <PlayableCard
                  card={card}
                  playCard={playCard} />
              </span>;
            }
          })
        }
      </div>
    );
  }
}
