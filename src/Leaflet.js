import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './Leaflet.css';
import 'leaflet/dist/leaflet.css';

const GRAPHQL_URL = 'http://localhost:5000/graphql';
const QUERY = '{ allTrees(maxLat:34.03219, minLat: 34.01971, minLon: -118.49517, maxLon: -118.48067) { latitude longitude nameCommon address street } }';

export default class LeafletWrapper extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        lat: 34.02,
        lon: -118.48,
        zoom: 14,
      },
      markers: []
    };
  }

  componentDidMount() {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    fetch(GRAPHQL_URL, {
      body: JSON.stringify({ query: QUERY }),
      method: 'POST',
      cache: 'no-cache',
      headers,
      credentials: 'include',
    }).then(response => {
      response.json().then(json => {
        const trees = json.data.allTrees;
        const markers = trees.map(t => ({
          lat: t.latitude,
          lon: t.longitude
        }));
        const state = {
          ...this.state,
          markers
        };
        this.setState(state);
        console.log(json);
      });
    });
  }

  render() {
    const position = [this.state.view.lat, this.state.view.lon];
    const markerList = this.state.markers.map(m => {
      return (
        <Marker position = { [m.lat, m.lon] }></Marker>
      );
    });

    return (
      <Map center={position} zoom={this.state.view.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { markerList }
      </Map>
    );
  }
}
