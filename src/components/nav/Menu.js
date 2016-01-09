import React from 'react';
import {Link} from 'react-router';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {Avatar, Icon, LinkContainer, Modal} from '../common';
import GamesDropdown from './GamesDropdown';
import {contains, map, pick} from 'lodash';
import LoginContainer from '../../containers/LoginContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import * as modalTypes from '../../constants/ModalTypes';

import '../../stylesheets/nav.scss';

class Menu extends React.Component {
  render() {
    const links = [
      {href: '/lobby', text: 'Play'},
      {href: '/about', text: 'About'}
    ];

    const linkComponents = map(links, link => {
      return (
         <LinkContainer key={link.href} to={link.href}>
           <NavItem>{link.text}</NavItem>
         </LinkContainer>
      );
    });

    const {id, username, loggedIn} = this.props.login;
    const {logOut} = this.props;

    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><strong>Game Site</strong></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {linkComponents}
          </Nav>
          {
            () => {
              if (loggedIn) {
                const myGames = pick(this.props.games, (game, gameId) => {
                  return contains(game.players, id);
                });

                const profileDropdownTitle = (
                  <span className="nav-profile-dropdown-title">
                    <Avatar players={this.props.players} id={id} size='S' />{username}
                  </span>
                );

                return (
                  <Nav pullRight>
                    <GamesDropdown games={myGames} title="My games" />

                    <NavDropdown title={profileDropdownTitle} id="nav-profile-dropdown">
                      <MenuItem onSelect={logOut}><Icon type='sign-out'/> Log out</MenuItem>
                    </NavDropdown>
                  </Nav>
                );

              } else {
                return (
                  <Nav pullRight>
                    <NavItem onClick={this.props.openRegisterModal}><Icon type='user-plus' /> Register</NavItem>
                    <NavItem onClick={this.props.openLoginModal}><Icon type='sign-in'/> Log in</NavItem>
                  </Nav>
                );
              }
            }()
          }
        </Navbar.Collapse>
        <Modal show={this.props.modal === modalTypes.LOGIN} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginContainer />
          </Modal.Body>
        </Modal>
        <Modal show={this.props.modal === modalTypes.REGISTER} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterContainer />
          </Modal.Body>
        </Modal>
      </Navbar>
    );
  }
}

export default Menu;
