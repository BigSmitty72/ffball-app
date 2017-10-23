import React from 'react';
import { Col, Panel, Row, Table } from 'react-bootstrap';

export default class FFballBestDrafterPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      positionTiers: [
        {
          pos: ['QB', 'K', 'DST', 'TE'],
          green: '1-9',
          gold: '10-14',
          orange: '15-19',
          red: '20-5000'
        },
        {
          pos: ['RB', 'WR'],
          green: '1-19',
          gold: '20-29',
          orange: '30-49',
          red: '50-5000'
        }
      ]
    }
  }
  render() {
    const { positionTiers } = this.state;
    const { defaultExpanded, team, tableHeadersList } = this.props;

    const tableHeaders = tableHeadersList.map((header, index) => {
      return <th key={index}>{header}</th>
    });

    const tableHeader = (
      <tr>
        {tableHeaders}
      </tr>
    );
    /* eslint-disable array-callback-return */
    const playerRows = team.Players.map((player, i) => {
      return (
        <tr key={i}>
          {
            tableHeadersList.map((header, pi) => {
              let color = "black";
              let fontWeight = "none";
              if (header === 'Rank') {
                fontWeight = "bold";
                positionTiers.map((tier) => {
                  if (tier.pos.indexOf(player.Pos) >= 0) {
                    for (const prop in tier) {
                      if (tier[prop].includes("-")) {
                        const range = tier[prop].split("-");
                        if (player.Rank >= range[0] && player.Rank <= range[1]) {
                          color = prop;
                        }
                      }
                    }
                  }
                })
              }
              return <td style={{textAlign: 'left', color: color, fontWeight: fontWeight}} key={pi}>{player[header]}</td>
            })
          }
        </tr>
      );
    });

    const draftCol = () => {
      const header = (
        <Row>
          <Col xs={9} sm={9} md={9} lg={9} style={{textAlign: "left", fontSize: "90%"}}>
            #{team.DraftRank} - {team.Team}
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} style={{textAlign: "right", fontSize: "90%"}}>
            {team.DraftScore}
          </Col>
        </Row>
      );
      
      return (
        <Col xs={12} sm={12} md={6} lg={6}>
          <Panel collapsible defaultExpanded={defaultExpanded} bsStyle='primary' header={header}>
            <Table fill>
              <thead>
                {tableHeader}
              </thead>
              <tbody>
                {playerRows}
              </tbody>
            </Table>
          </Panel>
        </Col>
      );
    };

    return (
      <div>
        {draftCol()}
      </div>
    )
  }
}
