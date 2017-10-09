import React, { Component } from 'react';
import { Glyphicon } from "react-bootstrap";

class RocketLeagueItemTrendRow extends Component {
  render() {
    let rankingItems;
    rankingItems = Object.keys(this.props.apiResults).map((key, index) => {
      const value = this.props.apiResults[key];
      const header = this.props.tblHeaders[index].props.children;
      let displayEl = {
        value: value,
        color: 'black',
        weight: null,
        size: '100%',
        glyphIcon: null
      };

      if (header === 'Rank Change') {
        let addSize = 0;

        if (value > 0) {
          if (value > 1) {
            addSize = value * 15;
          }

          displayEl = {
            value: ' ' + value.toString(),
            color: 'green',
            weight: 'bold',
            size: (100 + addSize).toString() + '%',
            glyphIcon: (<Glyphicon glyph="arrow-up" style={{color: "green"}} />)
          };
        } else if (value === 0) {
          displayEl.glyphIcon = (<Glyphicon glyph="minus" />);
          displayEl.value = '';
        } else if (value < 0) {
          if ((value * -1) > 1) {
            addSize = (value * -1) * 15;
          }
          displayEl = {
            value: ' ' + (value * -1).toString(),
            color: 'red',
            weight: 'bold',
            size: (100 + addSize).toString() + '%',
            glyphIcon: (<Glyphicon glyph="arrow-down" style={{color: "red"}} />)
          };
        }
      }

      if (header.includes('Perc')) {
        displayEl.value = value.toString() + '%';
      }

      return (
        <td key={index} style={{color: displayEl.color, fontWeight:displayEl.weight, fontSize:displayEl.size}}>
          {displayEl.glyphIcon}
          {displayEl.value}
        </td>
      )
    })

    return (
      <tr>
        {rankingItems}
      </tr>
    );
  }
}

export default RocketLeagueItemTrendRow;
