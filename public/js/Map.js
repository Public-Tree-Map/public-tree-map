var app = this.app || {};

(function(module) {

  var RENDERER = L.canvas({ padding: 0.5 });

  function Map(sidebar) {
    this.sidebar = sidebar;
    this.markers = [];
    this.trees   = [];

    var map = L.map('map', {
      center: [34.02, -118.48],
      zoom: 14,
      layers: [
        L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    map.on('zoomend', (function() {
      onZoomChanged.call(this, map.getZoom());
    }).bind(this));

    this.markers = L.layerGroup().addTo(map);
  }

  Map.prototype.setTrees = function(trees, colorProperty) {
    this.trees = trees;

    this.markers.clearLayers();

    this.trees.forEach((function(tree) {
      var marker = L.circleMarker([tree.latitude, tree.longitude], {
        renderer: RENDERER,
        radius: 1,
        stroke: false,
        fillOpacity: 1.0,
        fillColor: toColor(tree[colorProperty])
      });
      marker.tree = tree;
      marker.addTo(this.markers).bindPopup(tree.name_common);
      marker.on('click', (function(e) {
        this.sidebar.setTree(tree);
      }).bind(this));
    }).bind(this));
  }

  Map.prototype.setColorProperty = function(colorProperty) {
    this.markers.eachLayer(function(marker) {
      marker.setStyle({
        fillColor: toColor(marker.tree[colorProperty])
      });
    });
  }

  function onZoomChanged(zoom) {
    this.markers.eachLayer(function(marker) {
      marker.setRadius(Math.max(1, zoom - 13));
    });
  }

  function toColor(s) {
    // TODO: This is silly. We should move this somewhere else.
    if (s.length === 0) return '#000000';
    if (s.toLowerCase() === 'native') return '#0000ff';
    if (s.toLowerCase() === 'exotic') return '#d8b365';
    if (s.toLowerCase() === 'unknown') return '#d8b365';

    var hash = 0;
    for (var i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }

    var color = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 255;
      color += value.toString(16).padStart(2, 0);
    }

    return color;
  }

  // EXPORTS
  module.Map = Map;

})(app);
