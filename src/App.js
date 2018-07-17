import React, { Component } from 'react';
import LeafletWrapper from './Leaflet.js';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Street Tree Map</h1>
        </header>
	<LeafletWrapper />
      </div>
    );
  }
}

export default App;
