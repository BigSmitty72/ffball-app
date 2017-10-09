import React from 'react';
import RocketLeagueTradeFormOptions from './RocketLeagueTradeFormOptions';
import { Checkbox, Col, FormGroup, Grid, Panel, Radio, Row } from 'react-bootstrap';

export default class RocketLeagueTradeCalc extends React.Component {
  constructor() {
    super();

    this.state = {
      compareChecked: false,
      consoleOptions: [
        {
          consoleName: 'Xbox',
          checked: true,
          disabled: false
        },
        {
          consoleName: 'PS4',
          checked: false,
          disabled: true
        },
        {
          consoleName: 'Steam',
          checked: false,
          disabled: true
        }
      ],
      selectedConsole: 'Xbox'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.type === 'checkbox') {
      this.setState({compareChecked: e.target.checked})
    }
  }

  handleConsoleChange(index) {
    const { consoleOptions } = this.state;
    const updConsoleOptions = [];
    let selectedConsole;
    consoleOptions.map((option, i) => {
      if (i === index) {
        selectedConsole = option.consoleName;
        updConsoleOptions.push(Object.assign({}, option, {checked: true}));
      } else {
        updConsoleOptions.push(Object.assign({}, option, {checked: false}));
      }
      return null;
    });
    this.setState({consoleOptions: updConsoleOptions, selectedConsole: selectedConsole});
  }

  render() {
    const { compareChecked, consoleOptions } = this.state;

    const tradeWindows = () => {
      if (compareChecked) {
        return (
          <Row>
            <Col xs={6} sm={6} md={6}>
              <RocketLeagueTradeFormOptions radioGroup='radioGroup1' {...this.state} {...this.props} onChange={this.handleChange} />
            </Col>
            <Col xs={6} sm={6} md={6}>
              <RocketLeagueTradeFormOptions radioGroup='radioGroup2' ref='trade' {...this.state} {...this.props} onChange={this.handleChange} />
            </Col>
          </Row>
        )
      } else {
        return (<RocketLeagueTradeFormOptions radioGroup='radioGroup1' {...this.state} {...this.props} onChange={this.handleChange} />);
      }
    };

    const consoleOptionList = consoleOptions.map((consoleOption, index) => {
      return (
        <Radio key={index} checked={consoleOption.checked} onChange={this.handleConsoleChange.bind(this,index)} disabled={consoleOption.disabled} inline>{consoleOption.consoleName}</Radio>
      )
    });

    const consoleGroup = (
      <Panel style={{textAlign: 'left'}} header="Console">
        <FormGroup bsSize="sm">
          {consoleOptionList}
        </FormGroup>
      </Panel>
    );

    return (
      <div>
        
          <Grid>
            <h1>Trade Calculator</h1>
            <Row>
              <Col xs={12} sm={12} md={12}>
                {consoleGroup}
              </Col>
            </Row>
            <Row>
              <Col xs={10} sm={10} md={10}>
                <Checkbox style={{textAlign: 'left'}} onChange={this.handleChange}>
                  Compare Trades
                </Checkbox>
              </Col>
              <Col xs={8} sm={8} md={8}/>
            </Row>
            {tradeWindows()}
          </Grid>
        
      </div>
    );
  }
}
