import React, {PropTypes} from 'react';
import {ButtonGroup, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import Card from './Card';
import {map, omit} from 'lodash';

function mayTargetSelf(card) {
  return card === 'PRINCE';
}

export default class PlayableTargetedCard extends React.Component {
  render() {

    const {id, login, card, game, players, playCard} = this.props;
    const otherPlayerStates = omit(game.state.players, login.id);

    const targets = mayTargetSelf(card) ? game.state.players : otherPlayerStates;

    return (
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="right"
        overlay={
          <Popover title="Choose target" id={id} >
            <ButtonGroup vertical block>
              {
                map(targets, (targetState, targetId) => {
                  const onTargetClicked = event => {
                    playCard(card, {target: targetId});
                  };

                  return (
                    <Button
                      key={'target-' + targetId}
                      disabled={targetState.protected}
                      onClick={onTargetClicked} >
                      {players[targetId].name}
                    </Button>
                  );
                })
              }
            </ButtonGroup>
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