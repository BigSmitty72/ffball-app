import React from 'react';
import { Col, Grid, ListGroup, ListGroupItem, Row, Panel } from 'react-bootstrap';

export default class FFballLastManStanding extends React.Component {
  constructor() {
    super();

    this.state = {
      onLoadEndpoints: ['LastManStanding']
    }
  }

  componentWillMount() {
    const { ffballApi } = this.props;
    const { onLoadEndpoints } = this.state;
    let method = 'POST';

    onLoadEndpoints.map((endpointName) => {
      const endpointPath = `${ffballApi.ffballApiUrl}/${endpointName}`;
      this.props.actions.apiActions.fetchApi(method, endpointPath, ffballApi.payload, ffballApi.config);
      return null;
    });
  }

  render() {
    let eliminatedTeamsList = [];
    let remainingTeamsList = [];

    if (this.props.api.apiRes.LastManStanding !== undefined) {
      eliminatedTeamsList = this.props.api.apiRes.LastManStanding.res.eliminatedTeams;
      remainingTeamsList = this.props.api.apiRes.LastManStanding.res.remainingTeams;
    }

    const eliminatedTeamsListItems = eliminatedTeamsList.map((team, index) => {
      return (
        <ListGroupItem key={index}>Week {team.weekNum} - {team.ownerName} ({team.teamPoints})</ListGroupItem>
      );
    })

    const remainingTeamsListItems = remainingTeamsList.map((team, index) => {
      return (
        <ListGroupItem key={index}>{team.ownerName}</ListGroupItem>
      );
    })

    const remainingTeamsPanel = () => {
      return (
        <Panel collapsible defaultExpanded bsStyle='success' header='Remaining Teams'>
          <ListGroup fill style={{textAlign: 'left', fontWeight: 'bold'}}>
            {remainingTeamsListItems}
          </ListGroup>
        </Panel>
      );
    };

    const eliminatedTeamsPanel = () => {
      return (
        <Panel collapsible defaultExpanded bsStyle='danger' header='Eliminated Teams'>
          <ListGroup fill style={{textAlign: 'left', textDecoration: 'line-through', fontWeight: 'bold'}}>
            {eliminatedTeamsListItems}
          </ListGroup>
        </Panel>
      );
    };

    const lastManPanels = () => {
      return (
        <Row>
          <Col xs={6} sm={6} lg={6}>
            {remainingTeamsPanel()}
          </Col>
          <Col xs={6} sm={6} lg={6}>
            {eliminatedTeamsPanel()}
          </Col>
        </Row>
      );
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h1>Last Man Standing</h1>
            </Col>
          </Row>
          <Row>
            {lastManPanels()}
          </Row>
        </Grid>
      </div>
    )
  }
}
