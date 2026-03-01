var app = this.app || {};

ZOOM_LEVEL_PINS = 15; // zoom at which markers replace clusters, higher is more zoomed in

(function(module) {

  var RENDERER = L.canvas({ padding: 0.5 });

  function Map(sidebar, api_url, tree_id) {
    this.api_url = api_url;
    this.sidebar = sidebar;
    this.tree_id = tree_id
    this.markers = [];
    this.selectedTree = null;
    this.markerMap = Object.create(null);
    this.highlightedMarker = null;
    this.trees   = [];
    this.loadedTreeIds = new Set();
    this.zoom    = 11;
    this.prevZoom = 11;
    this.fillOpacity = 0.75;
    this.selected = new Set();
    this.urlParams = new URLSearchParams(window.location.search);
    this.locationPin = null
    this.zoomOnClick = 18

    this._osmLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
      opacity: 0.4,
      pane: 'shadowPane'
    });

    this.leafletMap = L.map('map', {
      center: [34.072451, -118.247173],
      zoom: this.zoom,
      zoomControl: false,
      layers: [
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }),
        this._osmLabels
      ]
    });
    this.prevBounds = this.leafletMap.getBounds();
    this.cityPolygons = L.geoJSON(null).addTo(this.leafletMap);
    this.cityLabels = L.layerGroup().addTo(this.leafletMap);
    this._cityBoundariesCache = null;
    this._cityTreeCounts = null;
    this._choroplethVisible = false;

    //trigger leaflet.locate
    this.triggerLocate = () => {
      const btn = document.getElementsByClassName('leaflet-control-locate')[0].children[0]
      btn.click()
    }

    this.setPin = (lat, lng, str) =>{
      //remove previous pin
      if (this.locationPin) {
        this.leafletMap.removeLayer(this.locationPin)
      }
      //drop new pin
      this.locationPin = L.marker([lat,lng]).addTo(this.leafletMap) 
      //setup popUp for location pin
      this.locationPin.bindPopup(str, {closeButton: false, minWidth:0, offset:[0,-2], closeOnClick:true })
      .openPopup()
      this.locationPin.on('click', (e) => {
        this.locationPin.openPopup()
      })
    }
    //use for current location only
    //triggerd by this.setPin()
    //default UI hidden in map.css
    this.locateButton = L.control.locate({
      drawCircle: false,
      initialZoomLevel: 18,
      keepCurrentZoomLevel: false,
      clickBehavior: {
        outOfView: 'setView',
        inView: 'stop',
        inViewNotFollowing: 'stop'
      },
      position:'bottomright',
      flyTo: true,
      onLocationError: (err, control) => {
        if(err.code === 1 && err.type === "locationerror") {
          control.stop();
          alert(control.options.strings.needsPermissionMsg);
        }
      },
      strings: {
        popup:'Current Location',
        needsPermissionMsg: `In order to use this feature, please grant your browser location access. Public Tree Map does not access or record to your location information.`
      }
    }).addTo(this.leafletMap);

    // Auto-hide toolbar on mobile during pan
    this._toolbarHideTimer = null;
    this.leafletMap.on('movestart', (() => {
      if (window.innerWidth <= 890) {
        var toolbar = document.getElementById('toolbar');
        if (toolbar) toolbar.classList.add('toolbar--hidden');
        clearTimeout(this._toolbarHideTimer);
      }
    }).bind(this));

    this.leafletMap.on('moveend', (() => {
      if (window.innerWidth <= 890) {
        var toolbar = document.getElementById('toolbar');
        if (toolbar) {
          clearTimeout(this._toolbarHideTimer);
          this._toolbarHideTimer = setTimeout(function() {
            toolbar.classList.remove('toolbar--hidden');
          }, 600);
        }
      }
    }).bind(this));

    this.leafletMap.on('moveend', (() => {
      this.zoom = this.leafletMap.getZoom();
      var newBounds = this.leafletMap.getBounds();
      var distance = this.prevBounds.getNorthEast().distanceTo(newBounds.getNorthEast());
      if (distance > 0.1 && this.zoom >= ZOOM_LEVEL_PINS) {
        this.cityLabels.clearLayers();
        this.cityPolygons.clearLayers();
        this._choroplethVisible = false;
        this._osmLabels.setOpacity(0.4);
        this.fetchTrees(newBounds, (trees) => {
          this.setTrees(trees, module.palettes['name_common'], false);
          setMarkerSize.call(this, this.zoom);
          this.prefetchNearby(newBounds);
        });
      } else if (this.zoom < ZOOM_LEVEL_PINS) {
        if (this.markers && this.leafletMap) {
          this.markers.clearLayers();
        }
        this.trees = [];
        this.loadedTreeIds.clear();
        if (this.cityLabels.getLayers().length === 0) {
          this.fetchCityLabels();
        } else if (!this._choroplethVisible && this._cityBoundariesCache) {
          this.renderChoropleth();
        }
        if (this.legend) {
          this.legend.update();
        }
      }
      this.prevBounds = newBounds;
    }).bind(this));

    L.control.zoom({position: 'bottomright'}).addTo(this.leafletMap);

    this.markers = L.layerGroup().addTo(this.leafletMap);

    // Loading pill control
    var loadingControl = L.control({ position: 'topleft' });
    var self = this;
    loadingControl.onAdd = function() {
      var el = L.DomUtil.create('div', 'map-loading map-loading-hidden');
      el.innerHTML = '<div class="map-loading-spinner"></div>Loading trees\u2026';
      self._loadingEl = el;
      return el;
    };
    loadingControl.addTo(this.leafletMap);
  }
  Map.prototype.showLoading = function() {
    if (this._loadingEl) this._loadingEl.classList.remove('map-loading-hidden');
  };

  Map.prototype.hideLoading = function() {
    if (this._loadingEl) this._loadingEl.classList.add('map-loading-hidden');
  };

  Map.prototype.fetchCityLabels = function() {
    fetch(this.api_url.concat('cities/'))
      .then(res => res.json())
      .then(cities => {
        // Merge santa-clarita-parks into santa-clarita
        var scParks = cities.find(c => c.city === 'santa-clarita-parks');
        if (scParks) {
          var sc = cities.find(c => c.city === 'santa-clarita');
          if (sc) sc.tree_count += scParks.tree_count;
        }

        this._cityTreeCounts = cities.filter(c => c.city !== 'santa-clarita-parks');

        this.renderCityLabels();

        if (!this._cityBoundariesCache) {
          this.fetchCityBoundaries();
        } else {
          this.renderChoropleth();
        }
      });
  };

  Map.prototype.renderCityLabels = function() {
    if (!this._cityTreeCounts) return;

    this.cityLabels.clearLayers();
    this._cityTreeCounts.filter(city => city.city !== 'los-angeles-city').forEach(city => {
      var name = slugToName(city.city);
      var count = city.tree_count.toLocaleString();

      // Use polygon center if available, otherwise fall back to API centroid
      var lat = city.lat;
      var lng = city.lng;
      if (this._polygonCenters) {
        var key = name.toLowerCase();
        if (this._polygonCenters[key]) {
          lat = this._polygonCenters[key].lat;
          lng = this._polygonCenters[key].lng;
        }
      }

      var label = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'city-label',
          html: '<div class="city-name">' + name + '</div>' +
                '<div class="city-count">' + count + ' trees</div>',
          iconSize: null
        })
      });
      label.on('click', function() {
        this.leafletMap.flyTo([lat, lng], ZOOM_LEVEL_PINS);
      }.bind(this));
      label.addTo(this.cityLabels);
    });
  };

  function slugToName(slug) {
    if (slug === 'los-angeles-city') return 'Los Angeles';
    return slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
  }

  var DENSITY_COLORS = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

  function densityColor(density, minDensity, maxDensity) {
    if (density <= 0 || minDensity <= 0) return DENSITY_COLORS[0];
    var t = (Math.log(density) - Math.log(minDensity)) / (Math.log(maxDensity) - Math.log(minDensity));
    t = Math.max(0, Math.min(1, t));
    var idx = Math.min(Math.floor(t * DENSITY_COLORS.length), DENSITY_COLORS.length - 1);
    return DENSITY_COLORS[idx];
  }

  Map.prototype.fetchCityBoundaries = function() {
    var url = 'https://services3.arcgis.com/uknczv4rpevve42E/arcgis/rest/services/California_Cities_and_Identifiers_Blue_Version_view/FeatureServer/2/query' +
      '?where=' + encodeURIComponent("CDTFA_COUNTY='Los Angeles County'") +
      '&outFields=CDTFA_CITY,AREA_SQMI&f=geojson';
    fetch(url)
      .then(function(res) { return res.json(); })
      .then(function(geojson) {
        this._cityBoundariesCache = geojson;
        this.renderChoropleth();
      }.bind(this))
      .catch(function(err) { console.error('City boundaries fetch error:', err); });
  };

  Map.prototype.renderChoropleth = function() {
    if (!this._cityBoundariesCache || !this._cityTreeCounts) return;

    // Build lookup from normalized name → { count, area }
    var cityLookup = {};
    this._cityTreeCounts.forEach(function(c) {
      var name = slugToName(c.city).toLowerCase();
      cityLookup[name] = { count: c.tree_count };
    });

    // Sum areas across duplicate polygons (e.g. Los Angeles has 473.25 + 0.01)
    this._cityBoundariesCache.features.forEach(function(f) {
      var cdtfaName = (f.properties.CDTFA_CITY || '').toLowerCase();
      var match = cityLookup[cdtfaName];
      if (match && f.properties.AREA_SQMI > 0) {
        match.area = (match.area || 0) + f.properties.AREA_SQMI;
      }
    });

    // Compute densities
    var densities = [];
    Object.keys(cityLookup).forEach(function(name) {
      var match = cityLookup[name];
      if (match.area > 0) {
        match.density = match.count / match.area;
        densities.push(match.density);
      }
    });

    if (densities.length === 0) return;

    var minDensity = Math.min.apply(null, densities);
    var maxDensity = Math.max.apply(null, densities);

    this.cityPolygons.clearLayers();

    var self = this;
    L.geoJSON(this._cityBoundariesCache, {
      style: function(feature) {
        var cdtfaName = (feature.properties.CDTFA_CITY || '').toLowerCase();
        var match = cityLookup[cdtfaName];
        if (match && match.density) {
          return {
            fillColor: densityColor(match.density, minDensity, maxDensity),
            fillOpacity: 0.45,
            weight: 1.5,
            color: '#fff',
            opacity: 0.8
          };
        }
        return {
          fillColor: '#e0e0e0',
          fillOpacity: 0.3,
          weight: 1,
          color: '#fff',
          opacity: 0.6
        };
      },
      onEachFeature: function(feature, layer) {
        var cdtfaName = (feature.properties.CDTFA_CITY || '').toLowerCase();
        var match = cityLookup[cdtfaName];
        if (match && match.density) {
          var displayName = feature.properties.CDTFA_CITY;
          var tooltip = displayName + ': ' + match.count.toLocaleString() + ' trees (' +
            Math.round(match.density).toLocaleString() + '/sq mi)';
          layer.bindTooltip(tooltip, { sticky: true });
        }
      }
    }).eachLayer(function(layer) {
      self.cityPolygons.addLayer(layer);
    });

    this._choroplethVisible = true;
    this._densityRange = { min: minDensity, max: maxDensity };
    this._osmLabels.setOpacity(0.15);

    // Compute polygon centers for label positioning
    this._polygonCenters = {};
    this.cityPolygons.eachLayer(function(layer) {
      var name = (layer.feature.properties.CDTFA_CITY || '').toLowerCase();
      if (name) {
        var center = layer.getBounds().getCenter();
        this._polygonCenters[name] = { lat: center.lat, lng: center.lng };
      }
    }.bind(this));

    // Re-render labels at polygon centers
    this.renderCityLabels();

    if (this.legend) this.legend.update();
  };

  Map.prototype.setFilter = function(selections) {
    this.selected = new Set(selections.map(function(s) { return s.toLowerCase(); }));
    this.redraw();
    setMarkerSize.call(this, this.zoom);
  }

  Map.prototype.fetchTrees = function(bounds, callback, silent){
    if (!silent) this.showLoading();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();

    fetch(this.api_url.concat(`trees/?lat1=${sw.lat}&lng1=${sw.lng}&lat2=${ne.lat}&lng2=${sw.lng}&lat3=${ne.lat}&lng3=${ne.lng}&lat4=${sw.lat}&lng4=${ne.lng}`))
        .then((res) => {return res.json()})
        .then((trees) => {
          if (!silent) this.hideLoading();
          if (callback) {
            callback(trees);
          }
        })
        .catch((error) => {
            if (!silent) this.hideLoading();
            console.error('Error:', error);
        });
  }

  Map.prototype.prefetchNearby = function(bounds) {
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var latSpan = ne.lat - sw.lat;
    var lngSpan = ne.lng - sw.lng;

    var neighbors = [
      L.latLngBounds([ne.lat, sw.lng], [ne.lat + latSpan, ne.lng]),
      L.latLngBounds([sw.lat - latSpan, sw.lng], [sw.lat, ne.lng]),
      L.latLngBounds([sw.lat, ne.lng], [ne.lat, ne.lng + lngSpan]),
      L.latLngBounds([sw.lat, sw.lng - lngSpan], [ne.lat, sw.lng])
    ];

    neighbors.forEach(function(nb) {
      this.fetchTrees(nb, function(trees) {
        var newTrees = trees.filter(function(t) { return !this.loadedTreeIds.has(t.tree_id); }.bind(this));
        newTrees.forEach(function(t) { this.loadedTreeIds.add(t.tree_id); }.bind(this));
        this.trees.push.apply(this.trees, newTrees);
      }.bind(this), true);
    }.bind(this));
  };

  Map.prototype.setTreeViewFromUrl = function(treeId){
    this.showLoading();
    fetch(
      this.api_url.concat(`tree/${treeId}`)
    )
      .then((res) => res.json())
      .then((tree) => {
        this.sidebar.setTree(tree);
        var treeLocation = [tree.latitude, tree.longitude];
        this.leafletMap.setView(treeLocation, ZOOM_LEVEL_PINS + 2);
        var newBounds = this.leafletMap.getBounds();
        this.fetchTrees(newBounds, (trees) => {
          this.setTrees(trees, module.palettes['name_common'], true);
        });
      })
      .catch((error) => {
        this.hideLoading();
        console.error('Error:', error);
      });
  }

  Map.prototype.setTrees = function(trees, palette, zoomToTree) {
    var newTrees = trees.filter(t => !this.loadedTreeIds.has(t.tree_id));
    newTrees.forEach(t => this.loadedTreeIds.add(t.tree_id));
    this.trees.push(...newTrees);
    this.palette = palette;
    this.redraw();
    if(this.tree_id && zoomToTree) {
      if(this.tree_id in this.markerMap) {
        this.markerMap[this.tree_id].fire('click');
      } else {
        this.sidebar.showError();
      }
    }
  }

  Map.prototype.redraw = function() {
    var palette = this.palette;
    var selectedCommonNames = this.selected;
    var radius  = Math.max(1, this.zoom - 13);
    var filter;

    this.markers.clearLayers();
    if (selectedCommonNames.size > 0){
      filter = tree => selectedCommonNames.has(tree['name_common'].toLowerCase());
    }
    else {
      filter = tree => tree;
    }
    this.trees.filter(filter).forEach((function(tree) {
      var marker = L.circleMarker([tree.latitude, tree.longitude], {
        renderer: RENDERER,
        radius,
        stroke: false,
        fillOpacity: this.fillOpacity,
        fillColor: this.getFillColor(tree, palette)
      });

      if (this.highlightedMarker && tree["tree_id"] === this.highlightedMarker.tree["tree_id"]) {
        this.highlightedMarker = marker;
      }

      marker.tree = tree;
      marker.bindPopup(tree.name_common, {closeButton: false, minWidth:0, offset:[0,-2]}); 
      marker.on('mouseover', function (e) {
          this.openPopup();
      });
      marker.on('mouseout', function (e) {
        this.closePopup();
      });
      function isTouchDevice(){
        return typeof window.ontouchstart !== 'undefined';
      }
      let tapEvent = isTouchDevice()?"mouseover click":"click";
      marker.on(tapEvent, (function(leafletEvent) {

        this.sidebar.body.classList.remove('sidebar-mobile--closed');
        fetch(
          this.api_url.concat(`tree/${tree.tree_id}`)
        )
          .then((res) => res.json())
          .then((tree) => {
            this.sidebar.setTree(tree);
            // updateUrl(this.urlParams, tree.tree_id);
          });


        var markerLocation = marker.getLatLng();
        var newViewLocation = {lat: markerLocation['lat'], lng: markerLocation['lng']};
        var currentZoom = this.leafletMap.getZoom();
        // var targetZoom = currentZoom > 16 ? currentZoom : 18;
        this.leafletMap.setView(newViewLocation, currentZoom, {animate: true});

        if (this.highlightedMarker) { // if one exists, undo its enlargement before enlarging another
          changeCircleMarker(this.highlightedMarker, 'shrink');
        }

        this.highlightedMarker = leafletEvent.target;
        changeCircleMarker(this.highlightedMarker, 'enlarge');
        this.highlightedMarker.bringToFront();
      }).bind(this));

      marker.addTo(this.markers)
      this.markerMap[tree.tree_id] = marker;
    }).bind(this));

    if (this.legend) {
      this.legend.update();
    }
  }

  Map.prototype.setPalette = function(palette) {
    this.palette = palette;
    var realThis = this;

    if (this.markers.getLayers().length > 0) {
      setMarkerSize.call(this, this.zoom);
      this.markers.eachLayer(function (marker) {
        marker.setStyle({
          fillColor: realThis.getFillColor(marker.tree, palette)
        });
      });
      if (this.highlightedMarker) {
        changeCircleMarker(this.highlightedMarker, 'recolor');
      }
    }

    if (this.legend) {
      this.legend.update();
    }
  }

  function setMarkerSize(zoom) {
    var radius = Math.max(1, zoom - 13);
    var palette = this.palette;
    
    if (palette && palette.field === 'heritage') {
      this.markers.eachLayer(function(marker) {
        if (marker.tree.heritage) {
          marker.bringToFront();
          marker.setRadius(radius + palette.markerSize);
        } else {
          marker.setRadius(radius);
        }
      });
    } else {
      this.markers.eachLayer(function(marker) {
        marker.setRadius(radius);
      });
    }
    
    if (this.highlightedMarker) {
      changeCircleMarker(this.highlightedMarker, 'enlarge');
    }
  }

  function updateUrl(params, id) {
    params.set('id', id);
    var url = location.origin + location.pathname + "?";
    //updates the url in the address bar
    history.pushState("id param", "Public Tree Map", url + params);
  }

  function getDarkerColor (hexColor) {
    var HSVColor = $c.hex2hsv(hexColor);
    var RGBColor = $c.hsv2rgb(HSVColor.H, HSVColor.S, HSVColor.V * 0.75);
    var ringColor = $c.rgb2hex(RGBColor.R, RGBColor.G, RGBColor. B);
    return ringColor;
  }

  function changeCircleMarker (marker, action) {
    switch (action) {
      case 'shrink':
        var currentRadius = marker.options.radius;
        marker.setStyle({
          radius: currentRadius / 1.75,
          stroke: false
        });
        break;
      case 'enlarge':
        var currentRadius = marker.options.radius;
        var ringColor = getDarkerColor(marker.options.fillColor)
        marker.setStyle({
          radius: currentRadius * 1.75,
          stroke: true,
          color: ringColor
        });
        break;
      case 'recolor':
      default:
        var ringColor = getDarkerColor(marker.options.fillColor)
        marker.setStyle({
          color: ringColor
        });
    }
  }

  Map.prototype.getFillColor = function(tree, palette) {
    if (palette.generated) {
      return generateColor(tree[palette.field]);
    }

    if (palette[tree[palette.field]]) {
      return palette[tree[palette.field]].color;
    } else {
      return palette['default'];
    }
  }

  var GENERATED_PALETTE = [
    '#5b9bd5', // steel blue
    '#e07b54', // warm coral
    '#8cc063', // soft green
    '#c27db5', // muted orchid
    '#f2c45a', // golden yellow
    '#6dc8bf', // teal
    '#d4687a', // dusty rose
    '#7b8fc9', // periwinkle
    '#a8b94a', // olive lime
    '#e8956a', // peach
    '#55b88a', // jade
    '#b5855e', // tan
    '#9a8dc8', // lavender
    '#d69b4e', // amber
    '#6aa6d4', // sky blue
    '#c9625a', // brick red
    '#85c6a0', // mint
    '#cf8ebc', // mauve
    '#a4a4a4', // neutral gray
    '#79b5d2', // powder blue
  ];

  function generateColor(s) {
    var hash = 0;
    for (var i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    return GENERATED_PALETTE[Math.abs(hash) % GENERATED_PALETTE.length];
  }

  // EXPORTS
  module.Map = Map;

})(app);
