import React from 'react';
import logo from '../logo.svg';

export default class Layout extends React.Component {
  render() {
    return <div>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to BuffInc!</h2>
      </div>
      <h1>Hello World</h1>
    </div>
  }
}
