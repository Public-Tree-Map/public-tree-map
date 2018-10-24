import React, { Component } from 'react';
import logo from './logo.png';
import './Info.css';

export default class InfoPanel extends Component {
  render() {
    return (
      <div className="InfoPanel">
	<h3>This is a tree name</h3>
        <img src={logo} className="App-logo" alt="logo" />
	<p>
	    Here is some neat information
	</p>
      </div>
    );
  }
}
