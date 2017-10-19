import React, { Component } from 'react';
import ApiResItem from './ApiResItem';
import PropTypes from 'prop-types';

class PowerRanking extends Component {

  render() {
    const apiRes = this.props.apiResults;
    let apiResults;
    let tblHeaders;
    
    if (apiRes) {
      try {
        if (apiRes[0] !== null && (apiRes).length > 0) {
          tblHeaders = Object.keys(apiRes[0]).map((key, index) => {
            return(
              <th key={index}>{key}</th>
            )
          });
        }
      } catch(err) {
        console.log(err);
      }

      apiResults = apiRes.map((apiResults, index) => {
        return (
          <ApiResItem key={index} apiResults={apiResults} tblHeaders={tblHeaders} />
        );
      });
    }
    return (
      <div className='ApiResults'>
        <table className="table table-striped">
          <thead>
            <tr>
              {tblHeaders}
            </tr>
          </thead>
          <tbody>
            {apiResults}
          </tbody>
        </table>
      </div>
    );
  }
}

PowerRanking.propTypes = {
  apiResults: PropTypes.array
}

export default PowerRanking;
