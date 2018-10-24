import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js';
import NavContainer from './NavContainer.js';
import StatsContainer from './StatsContainer.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/img/logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Street Tree Map</h1>
        </header>
        <div id="main">
          <MapContainer />
          <NavContainer />
          <StatsContainer />
        </div>
      </div>
    );
  }
}

export default App;
