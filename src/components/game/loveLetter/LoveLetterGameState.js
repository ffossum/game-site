import React from 'react';
import _ from 'lodash';
import {Alert, Panel} from 'react-bootstrap';
import Avatar from '../../common/Avatar';
import Icon from '../../common/Icon';
import WaitingIcon from '../../common/WaitingIcon';
import Hand from './Hand';

export default class GameState extends React.Component {
  render() {
    const inGame = _.contains(this.props.game.players, this.props.login.id);

    if (!inGame) {
      return <Alert bsStyle='warning'>Game in progress. Spectating coming soon.</Alert>;
    }

    const playerStates = _.map(this.props.game.state.players, (playerState, id) => {
      return (
        <Panel key={id}>
          <Icon type="heart" /> {playerState.score}
          {' '}
          <Avatar players={this.props.players} id={id} size="S" />
          {' '}
          {this.props.players[id].name}
          {this.props.game.state.toAct === id ? <span> <WaitingIcon /></span> : null}
          <span> {_.isEmpty(playerState.hand) ? 'DEAD' : 'ALIVE'}</span>
        </Panel>
      );
    });

    return (
      <div>
        {playerStates}
        <Hand
          players={this.props.players}
          id={this.props.login.id}
          gameState={this.props.game.state}
          hand={this.props.game.state.players[this.props.login.id].hand} />
      </div>
    );
  }
}