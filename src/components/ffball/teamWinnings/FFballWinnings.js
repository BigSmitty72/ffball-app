import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import FFballWinningsSeasonsForm from './FFballWinningsSeasonsForm';
import FFballWinningsProgressBarForm from './FFballWinningsProgressBarForm';
import FFballWinningsTrophyPanel from './FFballWinningsTrophyPanel';
import FFballPopoverHeader from '../common/FFballPopoverHeader';

export default class FFballWinnings extends React.Component {
  constructor() {
    super();

    this.state = {
      onLoadEndpoints: ['TeamWinnings', 'TrophiesByTeam', 'Payout'],
      selectedSeason: 'All',
      selectedTeam: {},
      selectedSeasonPayouts: [],
      seasons: ['All'],
      popOverInfo: {
        title: 'Team Winnings',
        description: <div>Amount of money each team has won based on that league Payout structure (can be filtered by season - defaults to current season)</div>
      }
    }
    this.teamPayoutClick = this.teamPayoutClick.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
  }

  componentWillMount() {
    const { ffballApi } = this.props;
    const { onLoadEndpoints } = this.state;
    let method = 'POST';

    onLoadEndpoints.map((endpointName) => {
      const endpointPath = `${ffballApi.ffballApiUrl}/${endpointName}`;
      const payloadAllSeason = (endpointName !== 'Payout' ? Object.assign({}, ffballApi.payload, {seasonId: 'all'}) : ffballApi.payload);
      this.props.actions.apiActions.fetchApi(method, endpointPath, payloadAllSeason, ffballApi.config);
      return null;
    });
  }

  teamPayoutClick(team) {
    this.setState({ selectedTeam: team });
  }

  handleSeasonChange(e) {
    this.setState({selectedSeason: e.target.value.toString()})
  }

  render() {
    const { popOverInfo, selectedSeason, selectedTeam } = this.state;
    let selectedTeamWinnings = [];
    let seasons = ['All'];

    if (this.props.api.apiRes.TeamWinnings) {
      selectedTeamWinnings = this.props.api.apiRes.TeamWinnings.res[selectedSeason];
      /* eslint-disable no-unused-expressions */
      for (const yearProp in this.props.api.apiRes.TeamWinnings.res) {
        yearProp.toLowerCase() !== 'all' ? seasons.push(yearProp) : '';
        seasons.sort(function(a, b){return b-a});
      }
    }

    const trophiesByTeamRes = (this.props.api.apiRes.TrophiesByTeam && selectedTeam.teamId ? this.props.api.apiRes.TrophiesByTeam.res[selectedSeason][selectedTeam.teamId] : [] );
    const payoutRes = (this.props.api.apiRes.Payout ? this.props.api.apiRes.Payout.res.payouts : {} );

    const fullTrophyPanel = (
      <Grid>
        <Row>
          <Col sm={8} md={8} lg={8}>
            <FFballWinningsProgressBarForm selectedTeamWinnings={selectedTeamWinnings} teamPayoutClick={this.teamPayoutClick} />
          </Col>
          <Col sm={4} md={4} lg={4}>
            <FFballWinningsTrophyPanel selectedTeamTrophies={trophiesByTeamRes} selectedTeam={selectedTeam} payout={payoutRes} />
          </Col>
        </Row>
      </Grid>
    );

    return (
      <div>
        <Grid>
          <FFballPopoverHeader header={popOverInfo.title} popoverDescription={popOverInfo.description} />
          <Row>
            <FFballWinningsSeasonsForm ref='season' seasons={seasons} onChange={this.handleSeasonChange} />
            <br />
          </Row>
          <Row>
            {fullTrophyPanel}
          </Row>
        </Grid>
      </div>
    )
  }
}
