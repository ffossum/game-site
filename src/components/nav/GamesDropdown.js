import React, {PropTypes} from 'react';
import {MenuItem, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from '../common';
import _ from 'lodash';

export default class GamesDropdown extends React.Component {
  render() {
    if (_.isEmpty(this.props.games)) {
      return null;
    }

    return (
      <NavDropdown title={this.props.title} id="nav-games-dropdown">
        {
          _.map(this.props.games, (game, gameId) => {
            return (
              <LinkContainer key={gameId} to={`/game/${gameId}`}>
                <MenuItem>{gameId}</MenuItem>
              </LinkContainer>
            );
          })
        }
      </NavDropdown>
    );
  }
}

GamesDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  games: PropTypes.object
};
