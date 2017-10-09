import React from 'react';
import axios from 'axios';
import RocketLeagueSubNav from './RocketLeagueSubNav';
import RocketLeagueTradeCalc from './RocketLeagueTradeCalc';
import RocketLeagueItemTrending from './RocketLeagueItemTrending';
import { Col, Grid, Row, Thumbnail } from "react-bootstrap";
import rlTradeCalcImg from "../../assets/rlTradeCalc.png";
import rlItemTrendingImg from "../../assets/itemTrending.jpg";
import rlXboxMassMessageImg from "../../assets/rlXboxMassMessage.png";
import rlAutoUpdTradeImg from "../../assets/rlAutoUpdTrade.png";

export default class RocketLeaguePage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedPage: 'none',
      googleSpreadsheetPayload: {},
      getItemListEndpoint: 'http://localhost:8080/api/rocketLeague/v1/GetItemList',
      getGoogleSpreadsheetEndpoint: 'http://localhost:8080/api/rocketLeague/v1/GoogleSpreadsheetData',
      consoleNames: ['Xbox'],
      rlItemCrates: [
        {
          crate: 'CC1',
          items: []
        }
      ],
      rlItemOptions: [
        {
          id: 'tradeCalc',
          imgSrc: rlTradeCalcImg,
          header: 'Trade Calculator',
          description: 'Calculator to compare trade offers in "Heats" or Crates'
        },
        {
          id: 'itemTrending',
          imgSrc: rlItemTrendingImg,
          header: 'Item Trending',
          description: 'Pull the latest closed trades for items to see Heat value'
        },
        {
          id: 'autoUpdateTrade',
          imgSrc: rlAutoUpdTradeImg,
          header: 'Trade - Auto Update',
          description: 'Automatically repost your trade on https://rocket-league.com'
        },
        {
          id: 'messageTraders',
          imgSrc: rlXboxMassMessageImg,
          header: 'Mass Message',
          description: 'Message multiple GamerTags with the same offers'
        }
      ]
      // user: {
      //   isAuthenticated: true,
      //   userName: "BigSmitty72",
      //   email: "jasonsmith7272@gmail.com",
      //   userId: 9999,
      //   firstName: "Jason",
      //   lastName: "Smith"
      // }
    }

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentWillMount() {
    const { getItemListEndpoint, getGoogleSpreadsheetEndpoint } = this.state;
    const consoleName = 'Xbox';
    const payload = { consoleName: consoleName };
    const config = {
      headers: {'X-Requested-With': 'test-header'}
    };

    if (this.props.api.RLData === undefined) {
      axios.post(getGoogleSpreadsheetEndpoint, payload, config).then((response) => {
        const googleSpreadsheetPayload = response.data;
        this.props.actions.apiActions.rocketLeaguePriceIndex(getItemListEndpoint, googleSpreadsheetPayload, config, consoleName);
      }).catch((err) => {
        console.log(err);
      })
    } else {
      const currentTime = new Date().getTime();
      if (currentTime > this.props.api.RLData[consoleName].fetchTimeout) {
        axios.post(getGoogleSpreadsheetEndpoint, payload, config).then((response) => {
          const googleSpreadsheetPayload = response.data;
          this.props.actions.apiActions.rocketLeaguePriceIndex(getItemListEndpoint, googleSpreadsheetPayload, config, consoleName);
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }

  handleNavClick(e) {
    const pageId = e.target.id;
    this.setState({selectedPage: pageId});
  }

  handleImgClick(id) {
    this.setState({selectedPage: id});
  }

  render() {
    const { rlItemOptions } = this.state;

    const rlOptionsPage = rlItemOptions.map((option, index) => {
      return (
        <Col key={index} xs={6} md={4} lg={3}>
          <Thumbnail href="#" alt={option.id} src={option.imgSrc} onClick={this.handleImgClick.bind(this, option.id)}>
            <h3>{option.header}</h3>
            <p>{option.description}</p>
          </Thumbnail>
        </Col>
      )
    });

    const currentPage = (selectedPage) => {
      if (selectedPage === 'tradeCalc') {
        return (
          <RocketLeagueTradeCalc {...this.props} />
        )
      } else if (selectedPage === 'autoUpdateTrade') {
        return(
          <h1>Auto Update Trades</h1>
        )
      } else if (selectedPage === 'itemTrending') {
        return (
          <RocketLeagueItemTrending {...this.props}/>
        )
      } else if (selectedPage === 'none') {
        return (
          <Grid>
            <h1>Rocket League Tools</h1>
            <Row>
              {rlOptionsPage}
            </Row>
          </Grid>
        )
      }
    };

    return (
      <div>
        <RocketLeagueSubNav {...this.state} onChange={this.handleNavClick} />
        {currentPage(this.state.selectedPage)}
      </div>
    )
  }
}
