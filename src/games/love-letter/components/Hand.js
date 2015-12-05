import React from 'react';
import _ from 'lodash';
import PlayableCard from './PlayableCard';
import PlayableTargetedCard from './PlayableTargetedCard';
import {cards} from '../constants/cards';

import '../stylesheets/hand.scss';

function requiresTarget(card) {
  return _.includes([cards.GUARD, cards.PRIEST, cards.BARON, cards.PRINCE, cards.KING], card);
}

export default class Hand extends React.Component {
  render() {
    const {login, players, game, playCard} = this.props;
    const hand = game.state.players[login.id].hand;

    return (
      <div className='love-letter-player-hand'>
        {
          _.map(hand, (card, index) => {
            return (
              <div key={card + index}>
                {
                  requiresTarget(card) ?
                    <PlayableTargetedCard
                      id={card + index}
                      login={login}
                      card={card}
                      players={players}
                      game={game}
                      playCard={playCard} />
                    :
                    <PlayableCard
                      login={login}
                      card={card}
                      game={game}
                      playCard={playCard} />
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}
