import React from 'react'
//import ApiResTbl from './ApiResTbl'

export default class ApiJiraPage extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  componentWillMount() {
    //this.props.actions.apiActions.fetchApi('http://localhost:9000/powerRankings/season/2016/leagueId/70928');
  }

  componentDidMount() {
    //fetchApi('http://localhost:9000/powerRankings/season/2016/leagueId/70928');
  }

  // handleChange(e) {
  //   console.log(this.refs.category.value);
  //   this.fetchApi(e);
  // }

  // fetchApi(e) {
  //   const category = this.refs.category.value;
  //   let endpoint;
  //   switch(category) {
  //     case 'Power Rankings':
  //       endpoint = 'http://localhost:9000/powerRankings/season/2016/leagueId/70928';
  //       break;
  //     case 'Teams':
  //       endpoint = 'http://localhost:9000/teams/season/2016/leagueId/70928';
  //       break;
  //     default:
  //       endpoint = 'http://localhost:9000/powerRankings/season/2016/leagueId/70928';
  //       break;
  //   }

  //   if(endpoint !== this.state.currentEndpoint) {
  //     this.props.actions.apiActions.fetchApi(endpoint);
  //     this.setState({currentEndpoint: endpoint});
  //   } else {
  //     console.log('Endpoint already set to %s', endpoint)
  //   }
  //   e.preventDefault();
  // }

  render() {
    // // let teamIdOptions;
    // let categoryOptions = this.state.categories.map((category, index) => {
    //   return <option key={index} value={category}>{category}</option>
    // })

    return (
      <div>
        <h1>Jira API</h1>
      </div>
    )
  }
}
