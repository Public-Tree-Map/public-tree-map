var app = this.app || {};

(function(module) {

  function Legend(map, speciesFilter) {
    this.map = map;
    this.speciesFilter = speciesFilter;
    this.palette = null;

    this.control = L.control({ position: 'bottomleft' });
    this.control.onAdd = function() {
      var div = L.DomUtil.create('div', 'map-legend map-legend-hidden');
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);
      return div;
    };
    this.control.addTo(map.leafletMap);
  }

  Legend.prototype.setSelectLegend = function(formattedSpecies, palette) {
    return formattedSpecies.map(
      tree => ({...tree, legend: this.map.getFillColor(tree, palette)})
    );
  }

  Legend.prototype.setLegend = function(palette) {
    if(palette) {
      this.palette = palette;
      var newPaletteFilter = this.setSelectLegend(this.speciesFilter.species, palette);
      this.speciesFilter.setSpecies(newPaletteFilter);
      this.update();
    }
  }

  Legend.prototype.update = function() {
    var container = this.control.getContainer();
    if (!container) return;

    // Hide when zoomed out (no tree markers visible)
    if (this.map.leafletMap.getZoom() < ZOOM_LEVEL_PINS) {
      L.DomUtil.addClass(container, 'map-legend-hidden');
      return;
    }

    var palette = this.palette;
    if (!palette || this.map.trees.length === 0) {
      L.DomUtil.addClass(container, 'map-legend-hidden');
      return;
    }

    // Filter trees to visible bounds
    var bounds = this.map.leafletMap.getBounds();
    var visibleTrees = this.map.trees.filter(function(t) {
      return bounds.contains([t.latitude, t.longitude]);
    });

    if (visibleTrees.length === 0) {
      L.DomUtil.addClass(container, 'map-legend-hidden');
      return;
    }

    var items;

    if (palette.generated) {
      // Count trees by field value
      var counts = {};
      visibleTrees.forEach(function(t) {
        var val = t[palette.field];
        if (val) {
          counts[val] = (counts[val] || 0) + 1;
        }
      });

      // Sort by count descending, take top 10
      var self = this;
      items = Object.keys(counts)
        .map(function(key) {
          var fakeTree = {};
          fakeTree[palette.field] = key;
          return { label: key, count: counts[key], color: self.map.getFillColor(fakeTree, palette) };
        })
        .sort(function(a, b) { return b.count - a.count; })
        .slice(0, 10);
    } else {
      // Fixed palette: show all defined categories with counts
      var counts = {};
      visibleTrees.forEach(function(t) {
        var val = t[palette.field];
        if (val !== undefined && val !== null) {
          var key = String(val);
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      items = [];
      Object.keys(palette).forEach(function(key) {
        if (key === 'generated' || key === 'field' || key === 'default' || key === 'markerSize') return;
        var entry = palette[key];
        if (entry && entry.title !== undefined) {
          items.push({
            label: entry.title || key,
            count: counts[key] || 0,
            color: entry.color
          });
        }
      });

      items.sort(function(a, b) { return b.count - a.count; });
    }

    // Render
    var html = '';
    items.forEach(function(item) {
      var label = item.label.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      html += '<div class="map-legend-item">' +
        '<span class="map-legend-swatch" style="background:' + item.color + '"></span>' +
        '<span class="map-legend-label">' + label + '</span>' +
        '<span class="map-legend-count">' + item.count.toLocaleString() + '</span>' +
        '</div>';
    });

    container.innerHTML = html;
    L.DomUtil.removeClass(container, 'map-legend-hidden');
  }

  // Exports
  module.Legend = Legend;
})(app);
