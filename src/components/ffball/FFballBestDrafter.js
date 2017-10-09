import React from 'react';
import FFballBestDrafterPanel from './FFballBestDrafterPanel';
import { Col, Grid, Row } from 'react-bootstrap';

export default class FFballBestDrafter extends React.Component {
  constructor() {
    super();

    this.state = {
      onLoadEndpoints: ['BestDrafter'],
      tableData: {
        tableHeaders: []
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
    let bestDraftRes = [];
    const tableHeadersList = [];
    if (this.props.api.apiRes.BestDrafter !== undefined) {
      bestDraftRes = Array.from(this.props.api.apiRes.BestDrafter.res);
      for (const header in bestDraftRes[0].Players[0]) {
        tableHeadersList.push(header);
      }
    }

    const draftRes = bestDraftRes.map((team, index) => {
      let defaultExpanded = false;
      if (index === 0) {
        defaultExpanded = true;
      }
      return (
        <FFballBestDrafterPanel key={index} team={team} tableHeadersList={tableHeadersList} defaultExpanded={defaultExpanded} />
      )
    })

    return (
      <div>
        <Grid>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <h1>Top Drafter</h1>
            </Col>
          </Row>
          <Row>
            {draftRes}
          </Row>
        </Grid>
      </div>
    )
  }
}
