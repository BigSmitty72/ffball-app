import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { DropdownButton, MenuItem, Nav, Navbar, NavItem } from "react-bootstrap";

export default class NavBarMain extends React.Component {
  constructor() {
    super()
    this.state = {};
  }
  render() {
    const { isAuthenticated, userName } = this.props;

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">BuffInc</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/ffball">
              <NavItem eventKey={1}>FFball</NavItem>
            </LinkContainer>
            <LinkContainer to="/rocketLeague">
              <NavItem eventKey={2}>Rocket League</NavItem>
            </LinkContainer>
            <LinkContainer to="/projectTest">
              <NavItem eventKey={3}>Projects Test</NavItem>
            </LinkContainer>
            <LinkContainer to="/photos/grid">
              <NavItem eventKey={4}>Photos Test</NavItem>
            </LinkContainer>
          </Nav>
            {isAuthenticated !== true ? (
                <li>Welcome, {userName}!</li>
              ) : (
                <DropdownButton bsStyle="success" title="Login/Signup" id="login-signup-bn" pullRight>
                  <MenuItem eventKey="1" href="/login">Login</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2" href="/signup">Sign Up</MenuItem>
                </DropdownButton>
              )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
