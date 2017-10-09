import React from 'react';
import monteCarloSimulator from './monteCarloSimulator';
import ApiResTbl from './ApiResTbl';
import { Button, Col, Grid, Row, Form, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

export default class FFballPlayoffSimulator extends React.Component {
  constructor() {
    super();

    this.state = {
      monteCarloEndpoints: ['Matchups', 'Teams', 'LeagueSettings'],
      simValue: {
        isDisabled: false,
        isLoading: false,
        simulations: 999,
        validationState: 'success',
        warningMessage: '',
        warningMin: 50,
        warningMax: 9999
      }
    }

    this.handleSimClick = this.handleSimClick.bind(this);
    this.handleSimValueChange = this.handleSimValueChange.bind(this);
  }

  componentWillMount() {
    const { ffballApi } = this.props;

    // //TODO - check if api res exist or not
    this.state.monteCarloEndpoints.map((simEndpoint) => {
      if (this.props.api.apiRes[simEndpoint] !== undefined) {
        console.log('Exists!', simEndpoint);
        //TODO - check timing if expired rerun call
      } else {
        const method = 'POST';
        const endpoint = `${ffballApi.ffballApiUrl}/${simEndpoint}`;
        this.props.actions.apiActions.fetchApi(method, endpoint, ffballApi.payload, ffballApi.config);
      }
      return true;
    })
  }

  handleSimValueChange(e) {
    const simulations = Math.ceil(e.target.value.replace(' ', ''));
    const { warningMin, warningMax } = this.state.simValue;
    let warningMessage = '';

    if (!isNaN(simulations) && simulations >= warningMin && simulations <= warningMax) {
      this.setState({simValue: Object.assign({}, this.state.simValue, { simulations }, {validationState: 'success'}, {warningMessage}, {isDisabled: false})});
    } else if (simulations >= 1 && simulations < warningMin) {
      warningMessage = `More than ${warningMin} simulations recommended for best results`
      this.setState({simValue: Object.assign({}, this.state.simValue, { simulations }, {validationState: 'warning'}, {warningMessage}, {isDisabled: false})});
    } else if (simulations < 1 || simulations > warningMax) {
      warningMessage = `Must be whole number from 1 to ${warningMax}`
      this.setState({simValue: Object.assign({}, this.state.simValue, { simulations }, {validationState: 'error'}, {warningMessage}, {isDisabled: true})});
    } else {
      console.log('cannot process request');
    }
  }

  handleSimClick(e) {
    const { simulations } = this.state.simValue;
    this.setState({simValue: Object.assign({}, this.state.simValue, {isLoading: true}, {isDisabled: true})});

    const weeklyMatchups = this.props.api.apiRes.Matchups.res;
    const leagueSettings = this.props.api.apiRes.LeagueSettings.res;
    const simTeams = Array.from(this.props.api.apiRes.Teams.res);

    monteCarloSimulator(simTeams, weeklyMatchups, leagueSettings, simulations, function(err, res) {
      setTimeout(() => {
        this.setState({simValue: Object.assign({}, this.state.simValue, {isLoading: false}, {playoffResults: res}, {isDisabled: false})});
      }, 1000);
    }.bind(this))

    e.preventDefault();
  }

  render() {

    const simulationForm = (simValue) => {
      const { simulations, isLoading, isDisabled, warningMessage, validationState } = simValue;
      return (
        <Form horizontal>
          <FormGroup controlId="formBasicText" validationState={validationState}>
            <Row>
              <Col componentClass={ControlLabel}>
                <ControlLabel>Simulations: </ControlLabel>
              </Col>
            </Row>
            <Col componentClass={ControlLabel}>
              <FormControl type="text" value={simulations} placeholder="999" onChange={this.handleSimValueChange}/>
            </Col>
            <Col componentClass={ControlLabel}>
              <Button
                type="submit"
                bsStyle="primary"
                disabled={isDisabled}
                onClick={!isLoading ? this.handleSimClick : null}>
                { isLoading ? 'Loading...' : 'Calculate' }
              </Button>
            </Col>
            <Col>
              { warningMessage.length > 0 ? <ControlLabel>{warningMessage}</ControlLabel> : null }
            </Col>
          </FormGroup>
            <Col>
              <FormGroup>
                <HelpBlock>Simulate matchups for playoff predictions (must be number 1-9999)</HelpBlock>
              </FormGroup>
            </Col>
        </Form>
      );
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h1>Playoff Simulator</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              {simulationForm(this.state.simValue)}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <ApiResTbl apiResults={this.state.simValue.playoffResults} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
