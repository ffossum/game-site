import React from 'react';
import {ButtonGroup, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import Card from './Card';

export default class PlayableTargetedCard extends React.Component {
  render() {
    return (
      <OverlayTrigger
        trigger="click"
        placement="top"
        overlay={
          <Popover title="Choose target" id={this.props.card + this.props.index}>
            <ButtonGroup vertical block>
              {
                _.map(this.props.gameState.players, (playerState, playerId) => {
                  return <Button key={'target-' + playerId}>
                    {this.props.players[playerId].name}
                  </Button>;
                })
              }
            </ButtonGroup>
          </Popover>
        }>

        <Button>
          <Card card={this.props.card} />
        </Button>
      </OverlayTrigger>
    );
  }
}