import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import ffLogoImg from "../../assets/ffLogo.png";

export default class FFballSubNav extends React.Component {
  constructor() {
    super()
    this.state = {
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onChange(e);
  }

  render() {
    const { ffballItems } = this.props;

    const ffballNavItems = ffballItems.map((item, index) => {
      return (
        <NavItem key={index} id={item.id} active={item.active} onClick={this.handleClick}>{item.title}</NavItem>
      )
    });

    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Brand>
            <a href="#" onClick={this.handleClick}>
              <img id='none' alt='FFball' src={ffLogoImg} style={{width:100, marginTop: -7}} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
          <Nav>
            {ffballNavItems}
          </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
}
