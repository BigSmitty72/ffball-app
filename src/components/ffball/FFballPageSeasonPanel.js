import React from 'react';
import { ControlLabel, Form, FormGroup, FormControl, Grid, Row, Col, Panel } from 'react-bootstrap';

export default class FFballPageSeasonPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedSeason: 2017,
      selectedTeam: {},
      panelComponents: [
        {
          componentName: 'League'
        },
        {
          componentName: 'Season'
        }
      ],
      seasonsList: [],
      fullTeamsList: [],
      teamsList: []
    }
  }

  // componentWillMount() {
  //   console.log(this.props);
  // }

  componentWillReceiveProps(nextProps) {
    const { userTeamsRes } = nextProps;
    const { selectedSeason } = this.state;

    if (this.state.seasonsList.length === 0) {
      const seasons = [];
      const teamsList = [];
      /* eslint-disable array-callback-return */
      userTeamsRes.map((team) => {
        if (seasons.includes(team.seasonId) === false) {
          seasons.push(team.seasonId);
        }
        if (team.seasonId === selectedSeason) {
          teamsList.push(team);
        }
      });
      this.setState({seasonsList: seasons.sort().reverse(), fullTeamsList: userTeamsRes, teamsList: teamsList, selectedTeam: teamsList[0]});
      this.props.handleSeasonPanelChange('selectedTeam', teamsList[0]);
    }
  }

  handleChange(name, e) {
    // const { selectedSeason, userTeams } = this.props;
    const { fullTeamsList, teamsList } = this.state;

    const updTeamsList = [];
    let selectedTeam = {};

    if (name === 'Season') {
      /* eslint-disable array-callback-return */
      fullTeamsList.map((team) => {
        if (team.seasonId.toString() === e.target.value.toString()) {
          updTeamsList.push(team);
        }
      })

      selectedTeam = updTeamsList[0];
      this.setState({selectedSeason: Number(e.target.value), teamsList: updTeamsList});
      this.props.handleSeasonPanelChange('selectedSeason', e.target.value);
    } else if (name === 'League') {
      /* eslint-disable array-callback-return */
      teamsList.map((team) => {
        if (team.leagueName === e.target.value) {
          selectedTeam = team;
        }
      })
    }
    this.setState({selectedTeam});
    this.props.handleSeasonPanelChange('selectedTeam', selectedTeam);
  }

  render() {
    const { panelComponents, seasonsList, teamsList } = this.state;

    const panelOptions = panelComponents.map((component, index) => {
      const { componentName } = component;
      let options = '';
      if (componentName === 'Season') {
        options = seasonsList.map((season, i) => {
          return <option key={i} value={season}>{season}</option>
        });
      } else if (componentName === 'League') {
        options = teamsList.map((league, i) => {
          return <option key={i} value={league.leagueName}>{league.leagueName}</option>
        });
      }

      return (
        <FormGroup key={index} style={{textAlign: "left", fontSize: "90%"}}>
          <Col sm={2} md={3} lg={3}>
            <ControlLabel>{componentName}:</ControlLabel>
          </Col>
          <Col sm={10} md={9} lg={9}>
            <FormControl style={{textAlign: "left", fontSize: "90%"}} componentClass="select" placeholder="select" onChange={this.handleChange.bind(this, componentName)}>
              {options}
            </FormControl>
          </Col>
        </FormGroup>
      );
    });

    const seasonPanel = () => {
      return (
        <Col style={{textAlign: "left"}} xs={6} xsOffset={6} sm={6} smOffset={6} md={4} mdOffset={8} lg={4} lgOffset={8}>
          <Panel>
            <Form horizontal>
              {panelOptions}
            </Form>
          </Panel>
        </Col>
      )
    };

    return (
      <Grid>
        <Row>
          {seasonPanel()}
        </Row>
      </Grid>
    );
  }
}
