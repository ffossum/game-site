import React, {PropTypes} from 'react';
import {Button, OverlayTrigger, Popover} from 'react-bootstrap';
import Card from './Card';
import {every, omit} from 'lodash';
import GuardForm from './GuardForm';
import CardTargetForm from './CardTargetForm';
import PlayableCard from './PlayableCard';

function mayTargetSelf(card) {
  return card === 'PRINCE';
}

export default class PlayableTargetedCard extends React.Component {
  render() {

    const {id, login, card, game, players, playCard} = this.props;
    const otherPlayerStates = omit(game.state.players, login.id);

    const targets = mayTargetSelf(card) ? game.state.players : otherPlayerStates;
    const allTargetsProtected = every(targets, target => target.protected);

    if (allTargetsProtected) {
      return <PlayableCard card={card} playCard={playCard} />;
    }

    return (
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="right"
        overlay={
          <Popover id={id} >
            {
              card === 'GUARD' ?
              <GuardForm players={players} targets={targets} playCard={playCard} /> :
              <CardTargetForm card={card} players={players} targets={targets} playCard={playCard} />
            }
          </Popover>
        }>

        <Button>
          <Card card={card} />
        </Button>
      </OverlayTrigger>
    );
  }
}

PlayableTargetedCard.propTypes = {
  playCard: PropTypes.func.isRequired
};