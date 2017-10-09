import React from 'react';
import RocketLeagueTradeFormResults from './RocketLeagueTradeFormResults';
import { Form, Button, Col, ControlLabel, FormGroup, FormControl, Row } from 'react-bootstrap';

export default class RocketLeagueTradeFormOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      itemOptions: {
        category: ['All', 'Black Market Decals', 'Bodies', 'Crates', 'Decals', 'Toppers', 'Trails', 'Wheels'],
        categoryCanPaint: ['All', 'Bodies', 'Toppers', 'Trails', 'Wheels'],
        certification: ['None', 'Acrobat', 'Aviator', 'Goalkeeper', 'Guardian', 'Juggler', 'Paragon', 'Playmaker', 'Scorer', 'Show-Off', 'Sniper', 'Striker', 'Sweeper', 'Tactician', 'Turtle', 'Victor'],
        paint: ['None', 'Black', 'Titanium White', 'Grey', 'Crimson', 'Pink', 'Cobalt Blue', 'Sky Blue', 'Burnt Sienna', 'Saffron', 'Lime', 'Forest Green', 'Orange', 'Purple']
      },
      itemList: [],
      formGroups: [
        {
          label: 'Category',
          placeholder: 'All',
          disabled: false,
          options: 'category',
          md: 3,
          sm: 6,
          xs: 6
        },
        {
          label: 'Item',
          placeholder: 'All',
          disabled: false,
          options: 'category',
          md: 3,
          sm: 6,
          xs: 6
        },
        {
          label: 'Certification',
          placeholder: 'None',
          disabled: false,
          options: 'certification',
          md: 3,
          sm: 6,
          xs: 6
        },
        {
          label: 'Paint',
          placeholder: 'None',
          disabled: true,
          options: 'paint',
          md: 3,
          sm: 6,
          xs: 6
        }
      ],
      currentItem: {
        Paint: 'None',
        Certification: 'None'
      },
      addBn: {
        isLoading: false,
        isDisabled: false
      },
      addedItems: [],
      unitTotals: { Heat: 0 },
      totalUnitsOptions: [{unit: 'Heat',conversionRate: 1,checked: true}],
      selectedUnit: 'Heat',
      itemNotAddedFlag: false,
      itemAmount: {
        amount: 1,
        validationState: 'success',
        itemMax: 999
      }
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleItemAmountChange = this.handleItemAmountChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    const { currentItem } = this.state;
    const { selectedConsole } = this.props;
    const { fullItemList } = this.props.api.RLData[selectedConsole].items;

    const newItemList = [];
    let newCurrentItem = Object.assign({}, currentItem);
    let unitRes = [];

    fullItemList.map((item) => {
      newItemList.push(item);
      return null;
    });
    /* eslint-disable array-callback-return */
    this.props.api.RLData[selectedConsole].totalUnitsOptions.map((unit) => {
      unitRes.push(Object.assign({}, unit, {disabled: true}));
    });
    if (newItemList.length > 0) {
      newCurrentItem.Item = newItemList[0].name;
    } else {
      newCurrentItem.Item = 'Endo';
    }
    
    this.setState({itemList: newItemList, currentItem: newCurrentItem, totalUnitsOptions: unitRes});
  }

  calculateTotal(items) {
    const { selectedConsole } = this.props;
    const { totalUnitsOptions } = this.props.api.RLData[selectedConsole];
    let totalMin = 0;
    let totalMax = 0;
    let newTotals = { Heat: 0 };
    items.map((item) => {
      totalMin += item.values.minValueH;
      totalMax += item.values.maxValueH;
      return null;
    });
    totalUnitsOptions.map((option) => {
      const conversionTotalMin = Math.round(totalMin * option.conversionRate * 100) / 100;
      const conversionTotalMax = Math.round(totalMax * option.conversionRate * 100) / 100;
      newTotals[option.unit] = {minValue: conversionTotalMin, maxValue: conversionTotalMax};
      return null;
    });
    this.setState({unitTotals: newTotals});
  }

  handleUnitChange(updUnitsOptions, selectedUnit) {
    this.setState({totalUnitsOptions: updUnitsOptions, selectedUnit: selectedUnit});
  }

  handleFormChange(e) {
    const { id, value } = e.target;
    const { selectedConsole } = this.props;
    const { currentItem, itemOptions, formGroups } = this.state;
    const { fullItemList } = this.props.api.RLData[selectedConsole].items;
    const newItemList = [];
    const newFormGroups = [];
    let newCurrentItem = Object.assign({}, currentItem);
    let paintDisabled;

    formGroups.map((form) => {
      if (form.label === 'Paint') {
        paintDisabled = form.disabled;
      }
      return null;
    });

    if (value !== 'All' && id !== 'Category') {
      newCurrentItem[id] = value;
    }

    if (id === 'Category') {
      if (itemOptions.categoryCanPaint.indexOf(value) < 0) {
        paintDisabled = true;
      }
      if (value === 'All') {
        fullItemList.map((item) => {
          newItemList.push(item);
          return item;
        });
      } else {
        fullItemList.map((item) => {
          if (item.category === value) {
            newItemList.push(item);
          }
          return item;
        });
      }
      paintDisabled = newItemList[0].paintDisabled;
      newCurrentItem.Item = newItemList[0].name;
      this.setState({itemList: newItemList});
    } else if (id === 'Item') {
      fullItemList.map((item) => {
        if (item.name === value) {
          paintDisabled = item.paintDisabled;
        }
        return item;
      });
    }
    formGroups.map((group) => {
      if (group.label === 'Paint') {
        newFormGroups.push(Object.assign({}, group, {disabled: paintDisabled}))
      } else {
        newFormGroups.push(group);
      }
      return null;
    });

    if (paintDisabled) {
      newCurrentItem.Paint = 'None';
    }
    this.setState({formGroups: newFormGroups, currentItem: newCurrentItem});
  }

  handleKeyPress(e) {
    if (e.key ==='Enter') {
      this.handleAdd(e);
    }
  }

  handleAdd(e) {
    const { selectedConsole } = this.props;
    const { addedItems, currentItem, itemAmount, totalUnitsOptions } = this.state;
    const { certifications, items } = this.props.api.RLData[selectedConsole];
    const updUnitsOptions = [];
    /* eslint-disable array-callback-return */
    totalUnitsOptions.map((unit) => {
      updUnitsOptions.push(Object.assign({}, unit, {disabled: false}));
    })

    this.setState({addBn: {isLoading: true, isDisabled: true}, totalUnitsOptions: updUnitsOptions});
    setTimeout(() => {
      const itemName = currentItem.Item;
      let itemPaint = currentItem.Paint;
      const Amt = itemAmount.amount;
      let newItem = Object.assign({}, currentItem, {Amt});
      let itemCategory;
      let itemAvgValH;
      if (currentItem.Paint === 'None') {
        itemPaint = 'Non Painted';
      }

      items.itemListVals.map((item) => {
        if (itemName === item.name && itemPaint === item.paint) {
          newItem.values = item.values;
          itemCategory = item.category;
          itemAvgValH = (item.values.maxValueH + item.values.minValueH) / 2;
        }
      });

      if (currentItem.Certification !== 'None') {
        let certTier;
        for (const tier in certifications.certTierList) {
          /* eslint-disable no-loop-func */
          certifications.certTierList[tier].map((certName) => {
            if (certName === currentItem.Certification) {
              certTier = tier;
            }
          })
        }
        certifications.certTierMultiplier.map((certMult) => {
          if (certMult.category === itemCategory && certMult.certTier === certTier && itemAvgValH > certMult.moreThan && itemAvgValH <= certMult.lessThan) {
            let newVals = {
              maxValueH: Math.round(newItem.values.maxValueH * certMult.multiplier * 100) / 100,
              minValueH: Math.round(newItem.values.minValueH * certMult.multiplier * 100) / 100
            }
            newItem.values = newVals;
          }
        })
      }

      addedItems.push(newItem);
      let itemNotAddedFlag = false;
      addedItems.map((item) => {
        if (item.values.maxValueH === 0) {
          itemNotAddedFlag = true;
        }
      });
      if (Amt > 1) {
        let newVals = {
          maxValueH: newItem.values.maxValueH * Amt,
          minValueH: newItem.values.minValueH * Amt
        }
        newItem.values = newVals;
      }
      this.setState({addedItems: addedItems, itemNotAddedFlag, addBn: {isLoading: false, isDisabled: false}});
      this.calculateTotal(addedItems);
    }, 500);
    e.preventDefault();
  }

  handleDelete(index) {
    const { addedItems } = this.state;
    addedItems.splice(index, 1);
    let itemNotAddedFlag = false;
    addedItems.map((item) => {
      if (item.values.maxValueH === 0) {
        itemNotAddedFlag = true;
      }
    });
    this.calculateTotal(addedItems);
    this.setState({addedItems, itemNotAddedFlag});
  }

  handleItemAmountChange(e) {
    let amount = Math.ceil(e.target.value.replace(' ', ''));
    const { itemMax } = this.state.itemAmount;

    if (!isNaN(amount) && amount <= itemMax) {
      this.setState({itemAmount: Object.assign({}, this.state.itemAmount, { amount }, {validationState: 'success'})});
    } else if (amount < 1) {
      amount = 1;
      this.setState({itemAmount: Object.assign({}, this.state.itemAmount, { amount }, {validationState: 'error'})});
    } else if (amount > itemMax) {
      amount = itemMax;
      this.setState({itemAmount: Object.assign({}, this.state.itemAmount, { amount }, {validationState: 'error'})});
    } else {
      console.log('cannot process request');
    }
  }

  render() {
    const { addBn, formGroups, itemList, itemOptions } = this.state;

    const formOptions = formGroups.map((formGroup, index) => {
      let items = [];
      if (formGroup.label === 'Item') {
        itemList.map((item) => {
          items.push(item.name);
          return item;
        });
      } else {
        items = itemOptions[formGroup.options];
      }

      const options = items.map((option, i) => {
        return <option key={i} value={option}>{option}</option>
      });

      return (
        <Col key={index} xs={formGroup.xs} sm={formGroup.sm} md={formGroup.md}>
          <FormGroup controlId={formGroup.label}>
            <ControlLabel>{formGroup.label}</ControlLabel>
            <FormControl componentClass='select' placeholder={formGroup.placeholder} onChange={this.handleFormChange} disabled={formGroup.disabled} onKeyPress={this.handleKeyPress}>
              {options}
            </FormControl>
          </FormGroup>
        </Col>
      )
    });

    const addButton = (
      <Button
        bsSize='sm'
        type='submit'
        bsStyle='primary'
        disabled={addBn.isDisabled}
        onClick={!addBn.isLoading ? this.handleAdd : null}>
          { addBn.isLoading ? 'Loading...' : 'Add Item' }
      </Button>
    );

    const itemAmtForm = (itemAmount) => {
      const { amount, validationState } = itemAmount;
      return (
        <Col xs={12} sm={12} md={8} lg={8} style={{textAlign: 'left'}}>
          <Form inline>
            <FormGroup controlId='addItemForm' validationState={validationState}>
              <ControlLabel bsSize='sm' style={{textAlign: 'left'}}>Amt: </ControlLabel>
              {'     '}
              <FormControl style={{width: '50px'}} bsSize='sm' type='text' value={amount} placeholder='1' onChange={this.handleItemAmountChange}/>
              {'     '}
              {addButton}
            </FormGroup>
          </Form>
        </Col>
      );
    };

    return (
      <Col xs={12} sm={12} md={12} lg={12}>
        <Row>
          {formOptions}
        </Row>
        <Row>
          {itemAmtForm(this.state.itemAmount)}
        </Row>
        <br />
        <Row>
          <RocketLeagueTradeFormResults onUnitChange={this.handleUnitChange} onClick={this.handleDelete} {...this.state} />
        </Row>
      </Col>
    );
  }
}
