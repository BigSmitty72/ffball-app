import React from 'react';
import { Alert, Col, FormGroup, ListGroup, ListGroupItem, OverlayTrigger, Panel, Radio, Tooltip, Row } from 'react-bootstrap';

export default class RocketLeagueTradeFormResults extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  deleteItem(index) {
    this.props.onClick(index);
  }

  handleUnitChange(index) {
    const { onUnitChange, totalUnitsOptions } = this.props;
    const updUnitsOptions = [];
    let selectedUnit;
    totalUnitsOptions.map((option, i) => {
      if (i === index) {
        selectedUnit = option.unit;
        updUnitsOptions.push(Object.assign({}, option, {checked: true}));
      } else {
        updUnitsOptions.push(Object.assign({}, option, {checked: false}));
      }
      return null;
    });
    onUnitChange(updUnitsOptions, selectedUnit);
  }

  render() {
    const { addedItems, itemNotAddedFlag, radioGroup, selectedUnit, totalUnitsOptions, unitTotals } = this.props;
    let currentConversionRate;

    const popoverHoverFocus = (
      <Tooltip id="tooltip"><strong>Click to remove item</strong></Tooltip>
    );

    const itemList = addedItems.map((item, index) => {
      totalUnitsOptions.map((option) => {
        if (option.unit === selectedUnit) {
          currentConversionRate = option.conversionRate;
        }
        return null;
      });

      const conversionValueMin = Math.round(item.values.minValueH * currentConversionRate * 100) / 100;
      const conversionValueMax = Math.round(item.values.maxValueH * currentConversionRate * 100) / 100;

      return (
        <OverlayTrigger key={index} trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
          <ListGroupItem bsStyle='info' onClick={this.deleteItem.bind(this,index)}>
            <Row>
              <Col xs={6} md={6} lg={6}>
                <div style={{textAlign: 'left'}}><strong>Item:</strong> {item.Item}</div>
                <div style={{textAlign: 'left'}}><strong>Cert:</strong> {item.Certification}</div>
                <div style={{textAlign: 'left'}}><strong>Paint:</strong> {item.Paint}</div>
                <div style={{textAlign: 'left'}}><strong>Amt:</strong> {item.Amt}</div>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <div style={{textAlign: 'right', fontWeight: 'bold', fontSize: '120%'}}>
                {
                  conversionValueMin === conversionValueMax ? (<div>Value: {conversionValueMin}</div>) : (<div>Value: {conversionValueMin} - {conversionValueMax}</div>)
                }
                </div>
              </Col>
            </Row>
          </ListGroupItem>
        </OverlayTrigger>
      );
    });

    const itemListGroup = (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <ListGroup>
            {itemNotAddedFlag === true ? <Alert style={{textAlign: 'left'}} key='warningMessage' bsStyle='danger'><strong>Warning:</strong> Some new items have not yet been added to Price Index</Alert> : null}
            {itemList}
            <ListGroupItem bsStyle='success'>
              <Row>
                <Col xs={4} md={4} lg={4}>
                  <div style={{textAlign: 'left', fontWeight: 'bold', fontSize: '120%'}}>Total: </div>
                </Col>
                <Col xs={8} md={8} lg={8}>
                  <div style={{textAlign: 'right', fontWeight: 'bold', fontSize: '120%'}}>
                  {
                    unitTotals[selectedUnit].minValue === unitTotals[selectedUnit].maxValue ? 
                    (<div>Value: {unitTotals[selectedUnit].minValue}  {selectedUnit}</div>) : 
                    (<div>Value: {unitTotals[selectedUnit].minValue} - {unitTotals[selectedUnit].maxValue} {selectedUnit}</div>)
                  }
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );   

    const totalUnitOptionsList = totalUnitsOptions.map((option, index) => {
      return (
        <Radio key={index} name={radioGroup} checked={option.checked} onChange={this.handleUnitChange.bind(this,index)} disabled={option.disabled} inline>{option.unit}</Radio>
      )
    });

    const totalUnitGroup = (
      <Row>
        <Col xs={3} sm={3} md={3}>
          <div style={{textAlign: 'left'}}>Results:</div>
        </Col>
        <Col xsPush={8} smPush={8} mdPush={8}>
          <FormGroup>
            <div style={{textAlign: 'right', paddingRight: 20}}>
              {totalUnitOptionsList}
            </div>
          </FormGroup>
        </Col>
      </Row>
    );

    return (
      <Col xs={12} sm={12} md={12}>
        <Panel>
          {totalUnitGroup}
          {itemListGroup}
        </Panel>
      </Col>
    );
  }
}
