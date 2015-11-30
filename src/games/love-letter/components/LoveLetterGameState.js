import React from 'react';
import _ from 'lodash';
import {Alert, Panel} from 'react-bootstrap';
import Avatar from '../../../components/common/Avatar';
import Icon from '../../../components/common/Icon';
import WaitingIcon from '../../../components/common/WaitingIcon';
import Hand from './Hand';
import ProtectedIcon from './ProtectedIcon';
import classnames from 'classnames';
import '../stylesheets/love-letter.scss';

export default class LoveLetterGameState extends React.Component {
  render() {
    const {game, login, players, playCard} = this.props;

    const inGame = _.contains(game.players, login.id);

    if (!inGame) {
      return <Alert bsStyle='warning'>Game in progress. Spectating coming soon.</Alert>;
    }

    const playerStates = _(game.state.players)
      .map((playerState, id) => {
        return {
          id,
          ...playerState
        };
      })
      .sortBy(playerState => {
        return _.indexOf(game.state.order, playerState.id);
      })
      .map(playerState => {
        const id = playerState.id;
        return (
          <Panel key={id} className={classnames({'player-state': true, 'eliminated': _.isEmpty(playerState.hand)})}>
            <Avatar players={players} id={id} size="S" /> {players[id].name}
            {game.state.toAct === id ? <span className='waiting-icon'><WaitingIcon /></span> : null}
            <div>
              <hr />
              <Icon type="heart" /> {playerState.score} <ProtectedIcon protect={playerState.protected} />
            </div>
            <div>
              <label>Discards:</label>
              <div>{playerState.discards.join(', ')}</div>
            </div>
          </Panel>
        );
      })
      .value();

    return (
      <div>
        <div className="love-letter-player-states">
          {playerStates}
        </div>
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
