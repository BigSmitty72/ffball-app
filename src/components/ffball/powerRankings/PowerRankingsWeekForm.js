import React from 'react';
import { ControlLabel, Form, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';

export default class PowerRankingsWeekForm extends React.Component {
  constructor() {
    super();

    this.state = {}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const { weeks } = this.props;

    const weekOptions = weeks.map((week, index) => {
      return <option key={index} value={week}>{week}</option>
    });

    return (
      <Grid>
        <Row>
          <Col style={{textAlign: "left"}} xs={8} sm={6} md={6}>
            <Form inline>
              <FormGroup controlId="weekSelectForm">
                <ControlLabel>Week:</ControlLabel>
                {' '}
                <FormControl style={{textAlign: "left"}} componentClass="select" placeholder="select" onChange={this.handleChange}>
                  {weekOptions}
                </FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
