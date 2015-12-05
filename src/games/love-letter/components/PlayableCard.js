import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import Card from './Card';

export default class PlayableCard extends React.Component {
  render() {
    const {login, card, game, playCard} = this.props;

    const mayPlayCard = login.id === game.state.toAct;

    const onCardClicked = event => {
      if (mayPlayCard) {
        playCard(card);
      }
    };

    return (
      <Button
        className="card-button"
        onClick={onCardClicked}
        disabled={!mayPlayCard}>
        <Card card={card} />
      </Button>
    );
  }
}

PlayableCard.propTypes = {
  card: PropTypes.string.isRequired,
  playCard: PropTypes.func.isRequired
};
