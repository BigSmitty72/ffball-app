import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import rlLogoImg from "../../assets/rlLogo.png";

export default class RocketLeagueSubNav extends React.Component {
  constructor() {
    super()
    this.state = {
      rocketLeagueItems: [
        {
          id: 'tradeCalc',
          title: 'Trade Calculator',
          active: false
        },
        {
          id: 'itemTrending',
          title: 'Item Trending',
          active: false
        },
        {
          id: 'autoUpdateTrade',
          title: 'Trade Auto Update',
          active: false
        },
        {
          id: 'messageTraders',
          title: 'Message Traders',
          active: false
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateNavItems = this.updateNavItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selectedPageId = nextProps.selectedPage;
    this.updateNavItems(selectedPageId);
  }

  updateNavItems(selectedPageId) {
    const { rocketLeagueItems } = this.state;
    const rocketLeagueItemsUpd = [];
    rocketLeagueItems.map((item) => {
      if (item.id === selectedPageId) {
        rocketLeagueItemsUpd.push({id: item.id, title: item.title, active: true});
      } else {
        rocketLeagueItemsUpd.push({id: item.id, title: item.title, active: false});
      }
      return true;
    })
    this.setState({rocketLeagueItems: rocketLeagueItemsUpd});
  }

  handleClick(e) {
    const selectedPageId = e.target.id;
    this.updateNavItems(selectedPageId);
    this.props.onChange(e);
  }

  render() {
    const { rocketLeagueItems } = this.state;

    const rocketLeagueNavItems = rocketLeagueItems.map((item, index) => {
      return (
        <NavItem key={index} id={item.id} active={item.active} onClick={this.handleClick}>{item.title}</NavItem>
      )
    });

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Brand>
          <a href="#" onClick={this.handleClick}>
            <img id='none' alt='RL' src={rlLogoImg} style={{width:100, marginTop: -7}} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            {rocketLeagueNavItems}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
