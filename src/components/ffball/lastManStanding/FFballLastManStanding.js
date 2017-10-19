import React from 'react';
import { Col, Grid, ListGroup, ListGroupItem, Row, Panel } from 'react-bootstrap';
import FFballPopoverHeader from '../common/FFballPopoverHeader';

export default class FFballLastManStanding extends React.Component {
  constructor() {
    super();

    this.state = {
      onLoadEndpoints: ['LastManStanding'],
      popOverInfo: {
        title: 'Last Man Standing',
        description: <div>Lowest scoring team still in the pot each week is eliminated. Last team standing wins</div>
      }
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
    const { popOverInfo } = this.state;
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
          <FFballPopoverHeader header={popOverInfo.title} popoverDescription={popOverInfo.description} />
          <Row>
            {lastManPanels()}
          </Row>
        </Grid>
      </div>
    )
  }
}
