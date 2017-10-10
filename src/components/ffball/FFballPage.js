import React from 'react';
import { Col, Grid, Row, Thumbnail } from "react-bootstrap";
import FFballSubNav from './FFballSubNav';
import FFballPlayoffSimulator from './FFballPlayoffSimulator';
import FFballPowerRankings from './FFballPowerRankings';
import FFballBestDrafter from './FFballBestDrafter';
import FFballLastManStanding from './FFballLastManStanding';
import FFballWinnings from './FFballWinnings';
// import FFballPageSeasonPanel from './FFballPageSeasonPanel';
import ffPowerRankingsImg from "../../assets/ffPowerRankings.png";
import ffBestDrafterImg from "../../assets/ffBestDrafter.jpg";
import ffPlayoffsImg from "../../assets/ffPlayoffs.jpg";
import ffWinningsImg from "../../assets/ffWinnings.jpg";
import ffLastManStandingImg from "../../assets/ffLastManStanding.png";

export default class FFballPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPage: 'none',
      selectedSeason: 2017,
      selectedLeague: {},
      currentUserId: 1,
      pwSalt: 'buffHuntin247!',
      onLoadEndpoints: ['UserTeams'],
      ffballApi: {
        ffballApiUrl: 'http://ec2-18-221-191-1.us-east-2.compute.amazonaws.com:8080/api/ffball/v1',
        config: {
          headers: {'X-Requested-With': 'test-header'}
        },
        payload: {
          leagueId: 70928,
          seasonId: 2017
        }
      },
      ffballItems: [
        {
          id: 'powerRankings',
          title: 'Power Rankings',
          active: false,
          imgSrc: ffPowerRankingsImg,
          description: 'Current/weekly Power Rankings and trending chart'
        },
        {
          id: 'playoffCalc',
          title: 'Playoff Calculator',
          active: false,
          imgSrc: ffPlayoffsImg,
          description: 'Project Playoffs based on remaining matchups and number of simulations'
        },
        {
          id: 'bestDraft',
          title: 'Best Drafter',
          active: false,
          imgSrc: ffBestDrafterImg,
          description: 'Top drafters based on current player pick and value'
        },
        // {
        //   id: 'freeAgency',
        //   title: 'Free Agency',
        //   active: false,
        //   imgSrc: ffPowerRankingsImg,
        //   description: 'View current/weekly Power Rankings and trending chart'
        // },
        {
          id: 'winnings',
          title: 'Winnings',
          active: false,
          imgSrc: ffWinningsImg,
          description: 'Winnings from HighScore/Last man Standing/Playoff payouts'
        },
        {
          id: 'lastManStanding',
          title: 'Last Man Standing',
          active: false,
          imgSrc: ffLastManStandingImg,
          description: 'Last man standing rankings (lowest remaining score eliminated weekly)'
        },
        {
          id: 'gmPayments',
          title: 'GM League Payments',
          active: false,
          imgSrc: ffLastManStandingImg,
          description: 'GM Tools - Keep track of league payments'
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
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.handleSeasonPanelChange = this.handleSeasonPanelChange.bind(this);
  }

  handleNavClick(e) {
    this.updateCurrentPage(e.target.id);
  }

  handleImgClick(id) {
    this.updateCurrentPage(id);
  }

  handleSeasonPanelChange(name, value) {
    console.log(value);
    // ffballApi: {
    //   ffballApiUrl: 'http://localhost:8080/api/ffball/v1',
    //   config: {
    //     headers: {'X-Requested-With': 'test-header'}
    //   },
    //   payload: {
    //     leagueId: 70928,
    //     seasonId: 2016
    //   }
    // }
    if (name === 'selectedSeason') {
      // const newPayload = Object.assign({}, this.state.ffballApi.payload, { seasonId: Number(value) });
      // const newApi = Object.assign({}, this.state.ffballApi, newPayload);
      this.setState({selectedSeason: value}); //, ffballApi: newApi});
    } else if (name === 'selectedTeam') {
      // console.log(value);
      // const newPayload = Object.assign({}, this.state.ffballApi.payload, { leagueId: Number(value.leagueId) });
      // const newApi = Object.assign({}, this.state.ffballApi, newPayload);
      this.setState({selectedTeam: value}); //, ffballApi: newApi});
    }
  }

  updateCurrentPage(pageId) {
    const { ffballItems } = this.state;
    const ffballItemsUpd = [];
    ffballItems.map((item) => {
      if (item.id === pageId) {
        ffballItemsUpd.push({id: item.id, title: item.title, active: true, imgSrc: item.imgSrc, description: item.description});
      } else {
        ffballItemsUpd.push({id: item.id, title: item.title, active: false, imgSrc: item.imgSrc, description: item.description});
      }
      return true;
    })
    this.setState({selectedPage: pageId, ffballItems: ffballItemsUpd});
  }

  componentWillMount() {
    const { ffballApi, onLoadEndpoints, currentUserId } = this.state;
    let method = 'POST';

    onLoadEndpoints.map((endpointName) => {
      if (this.props.api.apiRes.UserTeams === undefined) {
        const endpointPath = `${ffballApi.ffballApiUrl}/${endpointName}`;
        this.props.actions.apiActions.fetchApi(method, endpointPath, {userId: currentUserId}, ffballApi.config);
      }
      return null;
    });
  }

  render() {
    const { ffballItems } = this.state;
    // let userTeamsRes = [];

    // if (this.props.api.apiRes.UserTeams !== undefined) {
    //   userTeamsRes = this.props.api.apiRes.UserTeams.res;
    // }

    const ffballOptionsPage = ffballItems.map((option, index) => {
      return (
        <Col key={index} xs={6} md={4} lg={3}>
          <Thumbnail href="#" alt={option.id} src={option.imgSrc} onClick={this.handleImgClick.bind(this, option.id)}>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </Thumbnail>
        </Col>
      )
    });

    const currentPage = (selectedPage) => {
      if (selectedPage === 'playoffCalc') {
        return (
          <Col>
            <FFballPlayoffSimulator {...this.props} ffballApi={this.state.ffballApi} />
          </Col>
        )
      } else if (selectedPage === 'powerRankings') {
        return (
          <Col>
            <FFballPowerRankings {...this.props} ffballApi={this.state.ffballApi} />
          </Col>
        )
      } else if (selectedPage === 'bestDraft') {
        return (
          <Col>
            <FFballBestDrafter {...this.props} ffballApi={this.state.ffballApi} />
          </Col>
        )
      } else if (selectedPage === 'lastManStanding') {
        return (
          <Col>
            <FFballLastManStanding {...this.props} ffballApi={this.state.ffballApi} />
          </Col>
        )
      } else if (selectedPage === 'winnings') {
        return (
          <Col>
            <FFballWinnings {...this.props} ffballApi={this.state.ffballApi} />
          </Col>
        )
      } else if (selectedPage === 'none') {
        return (
          <Grid>
            <h1>Fantasy Football Tools</h1>
            <Row>
              {ffballOptionsPage}
            </Row>
          </Grid>
        );
      }
    };

    return (
      <div>
        <FFballSubNav {...this.state} onChange={this.handleNavClick} />
        <Grid>
          {/*<Row>
            <FFballPageSeasonPanel userTeamsRes={userTeamsRes} handleSeasonPanelChange={this.handleSeasonPanelChange} />
          </Row>*/}
          <Row>
            {currentPage(this.state.selectedPage)}
          </Row>
        </Grid>
      </div>
    )
  }
}
