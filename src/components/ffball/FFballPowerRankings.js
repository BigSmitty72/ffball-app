import React from 'react';
import ApiResTbl from './ApiResTbl';
import PowerRankingsWeekForm from './PowerRankingsWeekForm';
import FFballPowerRankingChart from './FFballPowerRankingChart';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';

export default class FFballPowerRankings extends React.Component {
  constructor() {
    super();

    this.state = {
      endpointName: '',
      selectedWeek: 'Current',
      onLoadEndpoints: ['PowerRankings', 'PowerRankingsHistory'],
      selectedNavId: 'weeklyPowerRanks',
      powerRankingOptions: [
        {
          id: 'weeklyPowerRanks',
          title: 'Weekly Power Ranking',
          active: true
        },
        {
          id: 'powerRankChart',
          title: 'Power Ranking Chart',
          active: false
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.hangleNavChange = this.hangleNavChange.bind(this);
  }

  componentWillMount() {
    const { onLoadEndpoints } = this.state;
    const { ffballApi } = this.props;
    let method = 'POST';

    onLoadEndpoints.map((endpointName) => {
      const endpointPath = `${ffballApi.ffballApiUrl}/${endpointName}`;
      this.props.actions.apiActions.fetchApi(method, endpointPath, ffballApi.payload, ffballApi.config);
      return null;
    });
    this.setState({endpointName: 'PowerRankings'});
  }

  handleChange(e) {
    this.setState({selectedWeek: e.target.value});
  }

  hangleNavChange(e) {
    const { powerRankingOptions } = this.state;
    const newPowerRankOptions = [];
    let selectedNavId;
    /* eslint-disable array-callback-return */
    powerRankingOptions.map((rankOption) => {
      if (e.target.id === rankOption.id) {
        selectedNavId = e.target.id;
        newPowerRankOptions.push({id: rankOption.id, title: rankOption.title, active: true});
      } else {
        newPowerRankOptions.push({id: rankOption.id, title: rankOption.title, active: false});
      }
    });
    this.setState({powerRankingOptions: newPowerRankOptions, selectedNavId, selectedWeek: 'Current'});
  }

  render() {
    const { endpointName, powerRankingOptions, selectedWeek, selectedNavId } = this.state;
    let endpointRes;
    let weeks = ['Current'];
    let powerRankData = [];

    if (this.props.api.apiRes[endpointName] !== undefined) {
      if (selectedWeek === 'Current') {
        endpointRes = this.props.api.apiRes['PowerRankings'].res;
      } else {
        this.props.api.apiRes['PowerRankingsHistory'].res.map((week) => {
          if (week.week.toString() === selectedWeek.toString()) {
            endpointRes = week.powerRank;
          }
          return null;
        });
      }
    }

    if (this.props.api.apiRes.PowerRankingsHistory) {
      console.log(this.props.api.apiRes.PowerRankingsHistory);
      /* eslint-disable array-callback-return */
      this.props.api.apiRes.PowerRankingsHistory.res.map((week) => {
        week.powerRank.map((weekRank) => {
          powerRankData.push({week: week.week, label: weekRank.Owner, data: weekRank['Power Score']});
        })
        weeks.push(week.week);
      });
    }

    if (this.props.api.apiRes.PowerRankings) {
      /* eslint-disable array-callback-return */
      this.props.api.apiRes.PowerRankings.res.map((currentRank) => {
        powerRankData.push({week: 'Current', label: currentRank.Owner, data: currentRank['Power Score']});
      })
    }

    const powerRankNavOptions = () => {
      return (
        <Nav bsStyle="pills" activeKey="2">
          {
            powerRankingOptions.map((rankOption, index) => {
              return (
                <NavItem eventKey={index + 1} active={rankOption.active} key={index} id={rankOption.id} onClick={this.hangleNavChange}>{rankOption.title}</NavItem>
              )
            })
          }
        </Nav>
      )
    };

    const selectedPowerRankOption = () => {
      if (selectedNavId === 'weeklyPowerRanks') {
        return (
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <PowerRankingsWeekForm ref='week' weeks={weeks} onChange={this.handleChange} />
              <ApiResTbl apiResults={endpointRes} />
            </Col>
          </Row>
        );        
      } else if (selectedNavId === 'powerRankChart') {
        return (<FFballPowerRankingChart weeks={weeks} powerRankData={powerRankData} />);
      } else {
        return null;
      }
    }

    return (
      <Grid>
        <h1>Power Rankings</h1>
        <Row>
          {powerRankNavOptions()}
        </Row>
        <br />
        {selectedPowerRankOption()}
      </Grid>
    )
  }
}
