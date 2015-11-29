import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import Card from './Card';

export default class PlayableCard extends React.Component {
  render() {
    const {login, card, game, playCard} = this.props;

    const onCardClicked = event => {
      playCard(card);
    };

    return (
      <Button
        onClick={onCardClicked}
        disabled={login.id !== game.state.toAct}>
        <Card card={card} />
      </Button>
    );
  }
}

PlayableCard.propTypes = {
  card: PropTypes.string.isRequired,
  playCard: PropTypes.func.isRequired
};
