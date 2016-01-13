import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Button, Overlay, Panel} from 'react-bootstrap';
import Card from './Card';
import {every, includes, isEmpty, omit} from 'lodash';
import GuardForm from './GuardForm';
import CardTargetForm from './CardTargetForm';
import PlayableCard from './PlayableCard';
import {cards} from '../constants/cards';

function mayTargetSelf(card) {
  return card === cards.PRINCE;
}

function mayPlayCard(game, login, card) {
  const mayAct = login.id === game.state.toAct;

  const hand = game.state.players[login.id].hand;
  return mayAct && !(includes([cards.PRINCE, cards.KING], card) && includes(hand, cards.COUNTESS));
}

export default class PlayableTargetedCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {showPopover: false};

    this.showPopover = this.showPopover.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
  }

  showPopover() {
    this.setState({showPopover: true});
  }

  hidePopover() {
    this.setState({showPopover: false});
  }

  render() {

    const {id, login, card, game, players, playCard} = this.props;
    const otherPlayerStates = omit(game.state.players, login.id);

    let targets = mayTargetSelf(card) ? game.state.players : otherPlayerStates;
    targets = omit(targets, target => {
      return isEmpty(target.hand);
    });
    const allTargetsProtected = every(targets, target => target.protected);

    if (allTargetsProtected) {
      return <PlayableCard
        login={login}
        card={card}
        game={game}
        playCard={playCard} />;
    }

    const hidePopoverAndPlayCard = (...args) => {
      this.hidePopover();
      return playCard.apply(null, args);
    };

    return (
      <div className="targeted-card-container">
        <Button
          className="card-button"
          ref="cardButton"
          onClick={this.showPopover}
          disabled={!mayPlayCard(game, login, card)}>
          <Card card={card} />
        </Button>

        <Overlay
          show={this.state.showPopover}
          container={this}
          rootClose
          onHide={this.hidePopover}
          target={() => ReactDOM.findDOMNode(this.refs.cardButton)}>
          <Panel className="targeted-card-form" id={id} >
            {
              card === cards.GUARD ?
              <GuardForm players={players} targets={targets} playCard={hidePopoverAndPlayCard} /> :
              <CardTargetForm card={card} targets={targets} playCard={hidePopoverAndPlayCard} />
            }
          </Panel>
        </Overlay>
      </div>
    );
  }
}

PlayableTargetedCard.propTypes = {
  playCard: PropTypes.func.isRequired
};
