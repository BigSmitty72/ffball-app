import React from 'react';
import FFballBestDrafterPanel from './FFballBestDrafterPanel';
import { Grid, Row } from 'react-bootstrap';
import FFballPopoverHeader from '../common/FFballPopoverHeader';

export default class FFballBestDrafter extends React.Component {
  constructor() {
    super();

    this.state = {
      onLoadEndpoints: ['BestDrafter'],
      tableData: {
        tableHeaders: []
      },
      popOverInfo: {
        title: 'Top Drafter',
        description: <div>Best drafter of the year based on that players scores the team drafted (even if that player has been dropped/traded)</div>
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
          <FFballPopoverHeader header={popOverInfo.title} popoverDescription={popOverInfo.description} />
          <Row>
            {draftRes}
          </Row>
        </Grid>
      </div>
    )
  }
}
