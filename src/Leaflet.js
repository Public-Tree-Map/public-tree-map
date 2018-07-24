import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Leaflet.css';
import 'leaflet/dist/leaflet.css';

const GRAPHQL_URL = 'http://localhost:5000/graphql';
const QUERY = { 'query': '{ allTrees { latitude longitude nameCommon address street } }' };

export default class LeafletWrapper extends Component {
  constructor() {
    super();
    this.state = {
      lat: 34.02,
      long: -118.48,
      zoom: 14,
    };
  }

  componentDidMount() {
    fetch(GRAPHQL_URL, {
      body: JSON.stringify(QUERY),
      method: 'POST',
      cache: 'no-cache',
      credentials: 'include',
    }).then(response => {
      response.json().then(json => {
        console.log(json);
      });
    });
  }

  render() {
    const position = [this.state.lat, this.state.long];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
