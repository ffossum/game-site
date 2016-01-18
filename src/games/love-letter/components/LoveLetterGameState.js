import React from 'react';
import _ from 'lodash';
import Chat from '../../../components/chat/Chat';
import {
  Alert,
  Panel,
  WaitingIcon,
  Spinner
} from '../../../components/common/';
import AvatarContainer from '../../../containers/AvatarContainer';
import UsernameContainer from '../../../containers/UsernameContainer';
import RoundSummary from './RoundSummary';
import Hand from './Hand';
import MiniCard from './MiniCard';
import ProtectedIcon from './ProtectedIcon';
import ScoreIcon from './ScoreIcon';
import classnames from 'classnames';
import messageComponents from './messageComponents';

export default class LoveLetterGameState extends React.Component {
  render() {
    const {game, login, playCard, closeGameModal} = this.props;

    const inGame = _.contains(game.players, login.id);

    if (!inGame) {
      return <Alert bsStyle='warning'>Game in progress. Spectating coming soon.</Alert>;
    }

    if (!game.state) {
      return <Alert alertStyle='info' ><Spinner /> Loading game...</Alert>;
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
            <AvatarContainer userId={id} size='S'/> <UsernameContainer userId={id} />
            {game.state.toAct === id ? <span className='waiting-icon'><WaitingIcon /></span> : null}
            <div>
              <hr />
              <ScoreIcon /> {playerState.score} <ProtectedIcon protect={playerState.protected} />
            </div>
            <div>
              <label>Discards:</label>
              <div className="love-letter-mini-card-list">
                {
                  _.map(playerState.discards, (discard, i) => {
                    return (
                      <div key={discard + i} className="mini-card-list-item">
                        <MiniCard tooltipId={discard + i} card={discard} />
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </Panel>
        );
      })
      .value();

    return (
      <div className="love-letter-game">
        <RoundSummary game={game} onHide={closeGameModal} />
        <div className="love-letter-player-states">
          {playerStates}
        </div>
        <div className="love-letter-deck">
          <Panel>
            Deck: {game.state.deck}
          </Panel>
        </div>
        <div className="love-letter-game-controls">
          <Hand
            login={login}
            game={game}
            playCard={_.partial(playCard, login.id, game.id)} />
          <div className="love-letter-game-chat">
            <Panel>
              <Chat
                login={this.props.login}
                messages={game.messages}
                messageComponents={messageComponents}
                sendMessage={_.partial(this.props.sendGameMessage, game.id)} />
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}
