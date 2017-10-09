import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export default class FFballWinnings extends React.Component {
  constructor() {
    super();

    this.state = {
      onLoadEndpoints: ['TeamWinnings']
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
    let teamWinningsRes = [];

    if (this.props.api.apiRes.TeamWinnings !== undefined) {
      teamWinningsRes = this.props.api.apiRes.TeamWinnings.res;
      console.log(teamWinningsRes);
    }

    // const draftRes = bestDraftRes.map((team, index) => {
    //   let defaultExpanded = false;
    //   if (index === 0) {
    //     defaultExpanded = true;
    //   }
    //   return (
    //     <FFballBestDrafterPanel key={index} team={team} tableHeadersList={tableHeadersList} defaultExpanded={defaultExpanded} />
    //   )
    // })

    return (
      <div>
        <Grid>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h1>Team Winnings</h1>
            </Col>
          </Row>
          <Row>
            Stuff here
          </Row>
        </Grid>
      </div>
    )
  }
}
