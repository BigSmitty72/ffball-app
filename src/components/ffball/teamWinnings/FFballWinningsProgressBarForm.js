import React from 'react';
import { Col, Grid, ListGroup, ListGroupItem, OverlayTrigger, Popover, ProgressBar, Row } from 'react-bootstrap';

export default class FFballWinningsProgressBarForm extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  handleListItemClick(team) {
    this.props.teamPayoutClick(team);
  }

  render() {
    const { selectedTeamWinnings } = this.props || [];
    const maxAmt = (selectedTeamWinnings[0] && selectedTeamWinnings[0].totalPayout > 110) ? selectedTeamWinnings[0].totalPayout : 110;

    const popoverHoverFocus = (team) => {
      return (
        <Popover id='popover-trigger-hover-focus' title={team.ownerName}>
          <strong>First Place: </strong>${team.payouts.firstPlace}<br />
          <strong>Second Place: </strong>${team.payouts.secondPlace}<br />
          <strong>Third Place: </strong>${team.payouts.thirdPlace}<br />
          <strong>High Score: </strong>${team.payouts.highScore}<br />
          <strong>Last Man Standing: </strong>${team.payouts.lastManStanding}<br />
        </Popover>
      );
    };

    const teamWinningsListItems = selectedTeamWinnings.map((team, index) => {
      const winningAmt = team.totalPayout;
      const percentage = winningAmt/maxAmt * 100;
      return (
        <OverlayTrigger key={index} trigger={['hover', 'focus']} placement='bottom' overlay={popoverHoverFocus(team)}>
          <ListGroupItem header={team.ownerName} href='#' onClick={this.handleListItemClick.bind(this, team)}>
            <Grid>
              <Row>
                <Col sm={12} md={12} lg={12} style={{marginTop: 8}}>
                  <ProgressBar active fill bsStyle='success' now={percentage} label={`$${winningAmt}`} style={{width:'60%', verticalAlign:'bottom'}} />
                </Col>
              </Row>
            </Grid>
          </ListGroupItem>
        </OverlayTrigger>
      );
    })

    const teamWinningsList = (
      <ListGroup fill style={{textAlign: 'left', fontWeight: 'bold'}}>
        {teamWinningsListItems}
      </ListGroup>
    );

    return (
      <div>
        {teamWinningsList}
      </div>
    );
  }
}
