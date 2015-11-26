import React, {PropTypes} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {every, map} from 'lodash';

export default class GuardForm extends React.Component {
  render() {
    const {card, players, targets, playCard} = this.props;
    const allTargetsProtected = every(targets, target => target.protected);
    return (
      <div>
        <label>Choose target:</label>
        <ButtonGroup vertical block>
          {
            map(targets, (targetState, targetId) => {
              const onTargetClicked = event => {
                playCard(card, {target: targetId});
              };

              return (
                <Button
                  key={'target-' + targetId}
                  disabled={targetState.protected && !allTargetsProtected}
                  onClick={onTargetClicked} >
                  {players[targetId].name}
                </Button>
              );
            })
          }
        </ButtonGroup>
      </div>
    );
  }
}

GuardForm.propTypes = {
  card: PropTypes.string.isRequired,
  players: PropTypes.object.isRequired,
  targets: PropTypes.object.isRequired,
  playCard: PropTypes.func.isRequired
};