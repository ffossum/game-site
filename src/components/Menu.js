import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal} from 'react-bootstrap';
import {LinkContainer, Icon} from './common';
import _ from 'lodash';
import LoginContainer from '../containers/LoginContainer';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.closeLogin = this.closeLogin.bind(this);
    this.openLogin = this.openLogin.bind(this);

    this.state = {showLogin: false};
  }

  closeLogin() {
    this.setState({showLogin: false});
  }

  openLogin() {
    this.setState({showLogin: true});
  }

  componentWillReceiveProps(nextProps) {
    const {loggedIn} = nextProps.login;

    if (loggedIn) {
      this.closeLogin();
    }
  }

  render() {

    const links = [
      {href: '/lobby', text: 'Play'},
      {href: '/about', text: 'About'}
    ];

    const {id, username, loggedIn} = this.props.login;
    const {logOut} = this.props;

    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Game Site</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
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
                  <Nav pullRight>
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
                  <Nav pullRight>
                    <NavItem onClick={this.openLogin}><Icon type='sign-in'/> Log in</NavItem>
                  </Nav>
                );
              }
            }()
          }
        </Navbar.Collapse>
        <Modal show={this.state.showLogin} onHide={this.closeLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginContainer />
          </Modal.Body>
        </Modal>
      </Navbar>
    );
  }
}

export default Menu;
