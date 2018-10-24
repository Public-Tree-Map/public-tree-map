import React, { Component } from 'react';
import L from 'leaflet';
import './Map.css';

const RENDERER = L.canvas({ padding: 0.5 });

export default class Map extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    let map = L.map('map', {
      center: [34.02, -118.48],
      zoom: 14,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    map.on('zoomend', () => this.onZoomChanged(map.getZoom()));

    this.markers = L.layerGroup().addTo(map);
  }

  componentDidUpdate() {
    this.markers.clearLayers();

    this.props.trees.forEach(tree => {
      L.circleMarker([tree.latitude, tree.longitude], {
        renderer: RENDERER,
        radius: 1,
        stroke: false,
        fillOpacity: 1.0,
        fillColor: this.toColor(tree.name_common)
      }).addTo(this.markers).bindPopup(tree.name_common);
    });
  }

  onZoomChanged(zoom) {
    this.markers.eachLayer(marker => {
      marker.setRadius(Math.max(1, zoom - 13));
    })
  }

  toColor(s) {
    if (s.length === 0) return '#000000';

    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 255;
      color += value.toString(16).padStart(2, 0);
    }

    return color;
  }

  render() {
    return <div id="map"></div>
  }
}
