import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class RocketLeagueMostValTable extends Component {
  constructor() {
    super();
    this.state = {
      tableData: {
        tableHeaders: []
      },
      pageItems: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { mostValItemList, pagination } = nextProps;
    const itemStartIndex = (pagination.activePage - 1) * pagination.itemsPerPage;
    const newPageItems = Array.from(mostValItemList).splice(itemStartIndex, pagination.itemsPerPage);
    this.setState({pageItems: newPageItems});
  }

  componentWillMount() {
    const { pagination, mostValItemList } = this.props;
    const newTableHeaders = [];
    for (const header in mostValItemList[0]) {
      newTableHeaders.push(header);
    };
    const itemEndIndex = pagination.activePage * pagination.itemsPerPage;
    const itemStartIndex = pagination.itemsPerPage - itemEndIndex;
    const newPageItems = Array.from(mostValItemList).splice(itemStartIndex, itemEndIndex);

    this.setState({pageItems: newPageItems, tableData: {tableHeaders: newTableHeaders}});
  }

  render() {
    const { tableData, pageItems } = this.state;
    const tableHeaders = tableData.tableHeaders.map((header, index) => {
      return <th key={index}>{header}</th>
    });

    const tableHeader = (
      <tr>
        {tableHeaders}
      </tr>
    );

    const itemRows = pageItems.map((item, i) => {
      return (
        <tr key={i}>
          {
            tableData.tableHeaders.map((header, pi) => {
              return <td style={{textAlign: 'left'}} key={pi}>{item[header]}</td>
            })
          }
        </tr>
      );
    });

    return (
      <div className='ApiResults'>
        <Table striped bordered condensed hover responsive>
          <thead>
            {tableHeader}
          </thead>
          <tbody>
            {itemRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default RocketLeagueMostValTable;
