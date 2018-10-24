import React, { Component } from 'react';
import Map from './Map.js';

export default class MapContainer extends Component {

  constructor() {
    super();
    this.state = { 
      trees: [] 
    };
  }

  componentDidMount() {
    fetch('/api/v1/trees')
      .then(response => response.json())
      .then(json => this.setState({ trees: json  }));
  }

  render()  {
    return <Map trees={this.state.trees} />
  }
}
