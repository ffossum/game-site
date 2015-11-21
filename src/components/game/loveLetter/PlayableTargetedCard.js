import React from 'react';
import {ButtonGroup, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import Card from './Card';
import {map, omit} from 'lodash';

function mayTargetSelf(card) {
  return card === 'PRINCE';
}

export default class PlayableTargetedCard extends React.Component {
  render() {

    const {id, card, index, gameState, players} = this.props;
    const otherPlayerStates = omit(gameState.players, id);

    const targets = mayTargetSelf(card) ? gameState.players : otherPlayerStates;

    return (
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="right"
        overlay={
          <Popover title="Choose target" id={card + index}>
            <ButtonGroup vertical block>
              {
                map(targets, (playerState, playerId) => {
                  return (
                    <Button
                      key={'target-' + playerId}
                      disabled={playerState.protected}>
                      {players[playerId].name}
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