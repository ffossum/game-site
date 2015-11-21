import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import Card from './Card';

export default class PlayableCard extends React.Component {
  render() {
    const {card, playCard} = this.props;

    const onCardClicked = event => {
      playCard(card);
    };

    return (
      <Button onClick={onCardClicked}>
        <Card card={card} />
      </Button>
    );
  }
}

PlayableCard.propTypes = {
  card: PropTypes.string.isRequired,
  playCard: PropTypes.func.isRequired
};