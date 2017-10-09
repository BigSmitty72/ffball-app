import React, { Component } from 'react';
import './App.css';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Nav';

class App extends Component {
  componentWillMount() {
    // console.log(this.state);
  }

  componentDidMount() {
    // this.getApi(); 
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        <Nav {...this.props.user} />
        {React.cloneElement(this.props.children, this.props)}
        <Footer />
      </div>
    );
  }
}

export default App;
