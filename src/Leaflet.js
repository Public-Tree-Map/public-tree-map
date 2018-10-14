import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './Leaflet.css';
import treeData from './data.json';

const GRAPHQL_URL = 'graphql';
const QUERY =
  '{ allTrees(maxLat: {{maxLat}}, minLat: {{minLat}}, minLon: {{minLon}}, maxLon: {{maxLon}}) { latitude longitude nameCommon address street } }';

const TILE_URL = 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
const MAX_ZOOM = 18;
const ATTRIBUTION =
  'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export default class LeafletWrapper extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        center: [34.02, -118.48],
        zoom: 14,
      },
      markers: [],
    };
    this._debouncer = undefined;
  }

  componentDidMount() {
    this._fetchData(this.state.view);
  }

  componentWillUnmount() {
    if (this._debouncer) {
      window.clearTimeout(this._debouncer);
    }
  }

  _fetchData(viewport) {
    const bounds = this.refs.map.leafletElement.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const query = QUERY.split('{{minLon}}')
      .join(sw.lng)
      .split('{{maxLon}}')
      .join(ne.lng)
      .split('{{minLat}}')
      .join(sw.lat)
      .split('{{maxLat}}')
      .join(ne.lat);
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    fetch(GRAPHQL_URL, {
      body: JSON.stringify({ query }),
      method: 'POST',
      cache: 'no-cache',
      headers,
      credentials: 'include',
    }).then(response => {
      if (response.ok) {
        response.json().then(json => this._setData(json.data));
      } else {
        this._setData(treeData);
      }
    });
  }

  _setData(data) {
    const trees = data.allTrees;
    const markers = trees
      .map(t => [t.latitude, t.longitude])
      .filter((t, i) => i % 100 === 0);

    const state = {
      ...this.state,
      markers,
    };

    this.setState(state);
  }

  onViewportChanged(viewport) {
    if (this._debouncer) {
      window.clearTimeout(this._debouncer);
    }
    this._debouncer = window.setTimeout(() => {
      this._fetchData(viewport);
    }, 300);
  }

  render() {
    const markerList = this.state.markers.map(m => {
      return <Marker position={m} />;
    });

    return (
      <Map
        ref="map"
        viewport={this.state.view}
        onViewportChanged={v => this.onViewportChanged(v)}
      >
        <TileLayer
          attribution={ATTRIBUTION}
          url={TILE_URL}
          maxZoom={MAX_ZOOM}
        />
        {markerList}
      </Map>
    );
  }
}
