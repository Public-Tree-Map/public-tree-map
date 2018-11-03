import React, { Component } from 'react';
import Map from './Map.js';

export default class MapContainer extends Component {

  constructor() {
    super();
    this.state = { 
      trees: [] 
    };
  }

  render()  {
    return <Map trees={trees} />
  }
}
