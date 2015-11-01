import React from 'react';
import {Link} from 'react-router';
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Icon from './common/Icon';

class Menu extends React.Component {
  render() {

    const links = [
      {href: '/lobby', text: 'Play'},
      {href: '/about', text: 'About'}
    ];

    const {username, loggedIn, logOut} = this.props;

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
        <Nav right>
          {
            loggedIn ?
              <NavDropdown title={username} id="nav-profile-dropdown">
                <MenuItem onSelect={logOut}><Icon type='sign-out'/> Log out</MenuItem>
              </NavDropdown>
              :
              <LinkContainer to="/login">
                <NavItem><Icon type='sign-in'/> Log in</NavItem>
              </LinkContainer>
          }
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
