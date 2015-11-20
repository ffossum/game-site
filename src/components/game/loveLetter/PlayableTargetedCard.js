import React from 'react';
import {ButtonGroup, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import Card from './Card';

export default function PlayableTargetedCard(props) {
  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={
        <Popover title="Choose target" id={props.card + props.index}>
          <ButtonGroup vertical block>
            {
              _.map(props.gameState.players, (playerState, playerId) => {
                return <Button key={'target-' + playerId}>
                  {props.players[playerId].name}
                </Button>;
              })
            }
          </ButtonGroup>
        </Popover>
      }>

      <Button>
        <Card card={props.card} />
      </Button>
    </OverlayTrigger>
  );
}