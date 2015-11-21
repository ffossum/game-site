import React from 'react';
import _ from 'lodash';
import {Alert, Panel} from 'react-bootstrap';
import Avatar from '../../common/Avatar';
import Icon from '../../common/Icon';
import WaitingIcon from '../../common/WaitingIcon';
import Hand from './Hand';

export default class LoveLetterGameState extends React.Component {
  render() {
    const {game, login, players, playCard} = this.props;

    const inGame = _.contains(game.players, login.id);

    if (!inGame) {
      return <Alert bsStyle='warning'>Game in progress. Spectating coming soon.</Alert>;
    }

    const playerStates = _.map(game.state.players, (playerState, id) => {
      return (
        <Panel key={id}>
          <Icon type="heart" /> {playerState.score}
          {' '}
          <Avatar players={players} id={id} size="S" />
          {' '}
          {players[id].name}
          {game.state.toAct === id ? <span> <WaitingIcon /></span> : null}
          <span> {_.isEmpty(playerState.hand) ? 'DEAD' : 'ALIVE'}</span>
        </Panel>
      );
    });

    return (
      <div>
        {playerStates}
        <div>Deck: {game.state.deck}</div>
        <Hand
          login={login}
          players={players}
          game={game}
          playCard={_.partial(playCard, login.id, game.id)} />
      </div>
    );
  }
}