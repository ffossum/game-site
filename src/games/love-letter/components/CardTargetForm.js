import React, {PropTypes} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {map} from 'lodash';
import ProtectedIcon from './ProtectedIcon';
import {FalcorUsername} from '../../../components/common';

export default class GuardForm extends React.Component {
  render() {
    const {card, targets, playCard} = this.props;

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
                  disabled={targetState.protected}
                  onClick={onTargetClicked} >
                  <ProtectedIcon protect={targetState.protected} /> <FalcorUsername userId={targetId} />
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
  targets: PropTypes.object.isRequired,
  playCard: PropTypes.func.isRequired
};
