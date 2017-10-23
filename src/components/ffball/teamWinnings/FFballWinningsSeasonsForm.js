import React from 'react';
import { ControlLabel, Form, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';

export default class FFballWinningsSeasonsForm extends React.Component {
  constructor() {
    super();

    this.state = {}
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
  }

  handleSeasonChange(e) {
    this.props.onChange(e);
  }

  render() {
    const { seasons } = this.props;
    const seasonOptions = seasons.map((season, index) => {
      return <option key={index} value={season}>{season}</option>
    });

    return (
      <Grid>
        <Row>
          <Col style={{textAlign: "left"}} xs={8} sm={6} md={6}>
            <Form inline>
              <FormGroup controlId="seasonSelectForm">
                <ControlLabel>Season:</ControlLabel>
                {'  '}
                <FormControl style={{textAlign: "left"}} componentClass="select" placeholder="select" onChange={this.handleSeasonChange}>
                  {seasonOptions}
                </FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
