import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';

export default class FFballWinningsTrophyPanel extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { payout, selectedTeam, selectedTeamTrophies } = this.props;
    const trophyList = selectedTeamTrophies.map((trophy, index) => {
      const trophyDate = new Date(trophy.date);
      const displayDate = (trophyDate.getMonth() + 1) + '/' + (trophyDate.getDate() + 1) + '/' +  trophyDate.getFullYear();
      return (
        <p key={index}><strong>{displayDate}: </strong>{trophy.description} - <strong style={{color:'green'}}>${trophy.payout}</strong></p>
      );
    });

    const teamTrophyPanel = (
      <Panel header={selectedTeam.ownerName} bsStyle='primary' style={{textAlign:'left'}}>
        {trophyList}
      </Panel>
    );

    const payoutPanel = (
      <Panel header='League Payout' bsStyle='success' style={{textAlign:'left'}}>
        <p>1st Place - ${payout.firstPlace || 0}</p>
        <p>2nd Place - ${payout.secondPlace || 0}</p>
        <p>Last Man Standing - ${payout.lastManStanding || 0}</p>
        <p>3rd Place - ${payout.thirdPlace || 0}</p>
        <p>Weekly High Score - ${payout.highScore || 0}</p>
      </Panel>
    );

    return (
      <Grid>
        <Row>
          <Col sm={4} md={4} lg={4}>
            {payoutPanel}
          </Col>
        </Row>
        <Row>
          <Col sm={4} md={4} lg={4}>
            {teamTrophyPanel}
          </Col>
        </Row>
      </Grid>
    );
  }
}
