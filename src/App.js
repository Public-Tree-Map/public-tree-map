import React, { Component } from 'react';
import LeafletWrapper from './Leaflet.js';
import './App.css';
import NavContainer from './NavContainer.js';
import StatsContainer from './StatsContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="static/img/logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Street Tree Map</h1>
        </header>
        <div id="main">
          <LeafletWrapper />
          <NavContainer />
          <StatsContainer />
        </div>
      </div>
    );
  }
}

export default App;
