var app = this.app || {};

(function(module) {

  var RENDERER = L.canvas({ padding: 0.5 });

  function Map(sidebar) {
    this.sidebar = sidebar;
    this.markers = [];
    this.trees   = [];

    var map = L.map("map", {
      center: [34.02, -118.48],
      zoom: 14,
      layers: [
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        })
      ]
    });

    map.on('zoomend', (function() {
      onZoomChanged.call(this, map.getZoom());
    }).bind(this));

    this.markers = L.layerGroup().addTo(map);
  }

  Map.prototype.setTrees = function(trees, palette) {
    this.trees = trees;

    this.markers.clearLayers();

    this.trees.forEach((function(tree) {
      var marker = L.circleMarker([tree.latitude, tree.longitude], {
        renderer: RENDERER,
        radius: 1,
        stroke: false,
        fillOpacity: 1.0,
        fillColor: getFillColor(tree, palette)
      });
      marker.tree = tree;
      marker.bindPopup(tree.name_common);
      marker.on('mouseover', function (e) {
          this.openPopup();
      });
      marker.on('mouseout', function (e) {
        this.closePopup();
      });
      marker.on('click', (function(e) {
        this.sidebar.setTree(tree);
      }).bind(this));

      marker.addTo(this.markers)
    }).bind(this));
  }

  Map.prototype.setPalette = function(palette) {
    this.markers.eachLayer(function(marker) {
      marker.setStyle({
        fillColor: getFillColor(marker.tree, palette)
      });
    });
  };

  function onZoomChanged(zoom) {
    this.markers.eachLayer(function(marker) {
      marker.setRadius(Math.max(1, zoom - 13));
    });
  }

  function getFillColor(tree, palette) {
    if (palette.generated) {
      return generateColor(tree[palette.field]);
    }

    if (palette[tree[palette.field]]) {
      return palette[tree[palette.field]];
    } else {
      return palette['default'];
    }
  }

  function generateColor(s) {
    var hash = 0;
    for (var i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }

    var color = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 255;
      color += value.toString(16).padStart(2, 0);
    }

    return color;
  }

  // EXPORTS
  module.Map = Map;
})(app);
