import React from 'react';
import {Link} from 'react-router';
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Icon from './common/Icon';
import _ from 'underscore';

class Menu extends React.Component {
  render() {

    const links = [
      {href: '/lobby', text: 'Play'},
      {href: '/about', text: 'About'}
    ];

    const {id, username, loggedIn} = this.props.login;
    const {logOut} = this.props;

    return (
      <Navbar inverse>
        <NavBrand><Link to="/">Game Site</Link></NavBrand>
        <Nav>
          {
            links.map(link => {
              return (
                 <LinkContainer key={link.href} to={link.href}>
                   <NavItem>{link.text}</NavItem>
                 </LinkContainer>
              );
            })
          }
        </Nav>
        {
          () => {
            if (loggedIn) {
              const myGames = _.pick(this.props.games, (game, gameId) => {
                return _.contains(game.players, id);
              });

              return (
                <Nav right>
                  {
                    !_.isEmpty(myGames) ?
                    <NavDropdown title="My games" id="nav-games-dropdown">
                      {
                        _.map(myGames, (game, gameId) => {
                          return (
                            <LinkContainer key={gameId} to={`/game/${gameId}`}>
                              <MenuItem>{gameId}</MenuItem>
                            </LinkContainer>
                          );
                        })
                      }
                    </NavDropdown> : null
                  }
                  <NavDropdown title={username} id="nav-profile-dropdown">
                    <MenuItem onSelect={logOut}><Icon type='sign-out'/> Log out</MenuItem>
                  </NavDropdown>
                </Nav>
              );

            } else {
              return (
                <Nav right>
                  <LinkContainer to="/login">
                    <NavItem><Icon type='sign-in'/> Log in</NavItem>
                  </LinkContainer>
                </Nav>
              );
            }
          }()
        }
      </Navbar>
    );
  }
}

export default Menu;
