import React from 'react';
import RocketLeagueMostValTable from './RocketLeagueMostValTable';
import { Col, Grid, FormGroup, FormControl, Panel, Pagination, Radio, Row } from 'react-bootstrap';

export default class RocketLeagueItemTrending extends React.Component {
  constructor() {
    super();

    this.state = {
      itemTrendingOptions: ['Most Valuable Items', 'Item Trends'],
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
      selectedConsole: 'Xbox',
      mostValItemList: [],
      itemOptions: {
        category: ['All', 'Black Market Decals', 'Bodies', 'Decals', 'Toppers', 'Trails', 'Wheels'],
        selectTopRes: [10,20,50,100,200]
      },
      selectedOption: 'Most Valuable Items',
      pagination: {
        totalPages: 1,
        activePage: 1,
        itemsPerPage: 10
      }
    }
    this.handleItemTrendCatChange = this.handleItemTrendCatChange.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.getItemList = this.getItemList.bind(this);
  }

  componentWillMount() {
    const { selectedConsole } = this.state;
    this.getItemList('All', selectedConsole);
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

  handleCategoryChange(e) {
    const { pagination, mostValItemList, selectedConsole } = this.state;
    if (e.target.id === 'resultsOption') {
      const newPageNumber = Math.round(mostValItemList.length / e.target.value);
      this.setState({pagination: Object.assign({}, pagination, {itemsPerPage: e.target.value, totalPages: newPageNumber})});
    } else if (e.target.id === 'categoryOption') {
      this.getItemList(e.target.value, selectedConsole);
    }
  }

  getItemList(category, selectedConsole) {
    const { pagination } = this.state;
    const { itemListVals } = this.props.api.RLData[selectedConsole].items;
    const newMostValItemList = [];
    /* eslint-disable array-callback-return */
    itemListVals.map((item) => {
      if (item.category === category) {
        newMostValItemList.push(
          {
            Paint: item.paint,
            Item: item.name,
            Category: item.category,
            Value: Math.round((item.values.minValueH +  item.values.minValueH) / 2 * 100) / 100
          }
        );
      } else if (category === 'All' && item.category !== 'Crates') {
        newMostValItemList.push(
          {
            Paint: item.paint,
            Item: item.name,
            Category: item.category,
            Value: Math.round((item.values.minValueH +  item.values.minValueH) / 2 * 100) / 100
          }
        );
      }
    });

    function compare(a,b) {
      if (a.Value < b.Value)
        return 1;
      if (a.Value > b.Value)
        return -1;
      return 0;
    }

    newMostValItemList.sort(compare).splice(200, newMostValItemList.length);

    const returnItemList = [];
    /* eslint-disable array-callback-return */
    newMostValItemList.map((item, index) => {
      returnItemList.push(Object.assign({}, {Rank: index + 1}, item));
    });
    const newPageNumber = Math.round(newMostValItemList.length / pagination.itemsPerPage);

    this.setState({mostValItemList: returnItemList, pagination: Object.assign({}, pagination, {totalPages: newPageNumber})});    
  }

  handleItemTrendCatChange(e) {
    this.setState({selectedOption: e.target.value});
  }

  handlePageSelect(e){
    const { pagination } = this.state;
    this.setState({pagination: Object.assign({}, pagination, {activePage: e})});
  }

  render() {
    const { itemTrendingOptions, consoleOptions, itemOptions, pagination } = this.state;

    const itemTrendOptions = itemTrendingOptions.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    });

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

    const categoryOptions = itemOptions.category.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    });

    const topResOptions = itemOptions.selectTopRes.map((res, index) => {
      return <option key={index} value={res}>{res}</option>
    });

    const paginationComponent = (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={pagination.totalPages}
        maxButtons={5}
        activePage={pagination.activePage}
        onSelect={this.handlePageSelect} />
    );

    const filterOptions = (
      <Row>
        <Col xs={2} md={2}>
          <div style={{textAlign: "left", margin: "8%"}}><strong>Top Results</strong></div>
        </Col>
        <Col xs={3} md={3}>
          <FormGroup controlId="resultsOption">
            <FormControl componentClass="select" placeholder="select" onChange={this.handleCategoryChange}>
              {topResOptions}
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={2} md={2}>
          <div style={{textAlign: "left", margin: "6%"}}><strong>Category</strong></div>
        </Col>
        <Col xs={5} md={5}>
          <FormGroup controlId="categoryOption">
            <FormControl componentClass="select" placeholder="select" onChange={this.handleCategoryChange}>
              {categoryOptions}
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
    );

    const pageView = () => {
      const { selectedOption } = this.state;
      if (selectedOption === 'Most Valuable Items') {
        return (
          <div>
            {filterOptions}
            <Row>
              <Col xs={12} md={12}>
                <RocketLeagueMostValTable {...this.state} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                {paginationComponent}
              </Col>
            </Row>
          </div>
        );
      } else {
        return null;
      }
    };

    return (
      <Grid>
        <h1>Item Trending</h1>
        <Row>
          <Col xs={12} md={12}>
            <FormGroup controlId="formControlsSelect">
              <FormControl componentClass="select" placeholder="select" onChange={this.handleItemTrendCatChange}>
                {itemTrendOptions}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            {consoleGroup}
          </Col>
        </Row>
        {pageView()}
      </Grid>
    );
  }
}
