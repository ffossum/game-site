import React, {PropTypes} from 'react';
import {ButtonGroup, Button, Input} from 'react-bootstrap';
import {map} from 'lodash';
import ProtectedIcon from './ProtectedIcon';

const guardOptions = ['PRIEST', 'BARON', 'HANDMAIDEN', 'PRINCE', 'KING', 'COUNTESS', 'PRINCESS'];

export default class GuardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedGuess: 'PRIEST'};

    this.guessChanged = this.guessChanged.bind(this);
  }

  guessChanged(event) {
    this.setState({selectedGuess: event.target.value});
  }

  render() {
    const {players, targets, playCard} = this.props;

    return (
      <div>
        <label>Guess card:</label>
        <Input type='select' value={this.state.selectedGuess} onChange={this.guessChanged}>
          {
            _.map(guardOptions, option => {
              return <option key={option} value={option}>{option}</option>;
            })
          }
        </Input>
        <label>Choose target:</label>
        <ButtonGroup vertical block>
          {
            map(targets, (targetState, targetId) => {
              const onTargetClicked = event => {
                playCard('GUARD', {
                  target: targetId,
                  guess: this.state.selectedGuess
                });
              };

              return (
                <Button
                  key={'target-' + targetId}
                  disabled={targetState.protected}
                  onClick={onTargetClicked} >
                  <ProtectedIcon protect={targetState.protected} /> {players[targetId].name}
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
  players: PropTypes.object.isRequired,
  targets: PropTypes.object.isRequired,
  playCard: PropTypes.func.isRequired
};
