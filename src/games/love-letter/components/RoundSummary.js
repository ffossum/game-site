import React, {PropTypes} from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import UsernameContainer from '../../../containers/UsernameContainer';
import _ from 'lodash';
import MiniCard from './MiniCard';
import ScoreIcon from './ScoreIcon';

export default class RoundSummary extends React.Component {
  constructor(props) {
    super(props);
    this.onHide = this.onHide.bind(this);
  }
  onHide() {
    const {game} = this.props;
    this.props.onHide(game.id);
  }
  render() {
    const {game} = this.props;
    const showModal = this.props.game.modal && this.props.game.modal.key === 'ROUND_SUMMARY';

    const modalBody = showModal ?
      <Modal.Body>
        <h3><UsernameContainer userId={game.modal.args.winner} /> wins the round!</h3>
        <Table className="love-letter-round-summary-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Hand</th>
              <th>Discards</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(game.modal.args.players, (playerState, playerId) => {
                const winner = game.modal.args.winner === playerId;
                return (
                  <tr key={playerId}>
                    <td><UsernameContainer userId={playerId} /></td>
                    <td><ScoreIcon /> {winner ? <b>{playerState.score + 1}</b> : playerState.score}</td>
                    <td>
                      {
                        playerState.hand[0] ?
                          <MiniCard card={playerState.hand[0]} tooltipId={playerId + 'hand'}/>
                          : null
                      }
                    </td>
                    <td>
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
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Modal.Body>
      :
      null;

    return (
      <Modal
        show={showModal}
        onHide={this.onHide}>
        {modalBody}
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

RoundSummary.propTypes = {
  game: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired
};
