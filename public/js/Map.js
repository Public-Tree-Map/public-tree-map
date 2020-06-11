var app = this.app || {};

(function(module) {

  var RENDERER = L.canvas({ padding: 0.5 });

  function Map(sidebar) {
    this.sidebar = sidebar;
    this.markers = [];
    this.markerMap = Object.create(null);
    this.highlightedMarker = null;
    this.trees   = [];
    this.zoom    = 14.2;
    this.fillOpacity = 0.75;
    this.selected = new Set();
    this.urlParams = new URLSearchParams(window.location.search);
    this.locationPin = null
    this.zoomOnClick = 18

    this.leafletMap = L.map('map', {
      center: [34.0215, -118.481],
      zoom: this.zoom,
      zoomControl: false,
      layers: [
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        })
      ]
    });

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

    L.control.zoom({position: 'bottomright'}).addTo(this.leafletMap);
    
    this.leafletMap.on('zoomend', (function() {
      this.zoom = this.leafletMap.getZoom();
      setMarkerSize.call(this, this.zoom);
    }).bind(this));

    this.markers = L.layerGroup().addTo(this.leafletMap);
  }

  Map.prototype.setFilter = function(selections) {
    var bounds = this.leafletMap.getBounds();
    var center = bounds.getCenter();
    var palette = this.palette;
    var closestDistance;
    var closestLatLng;
    var yThreshold = 107;
    var pad = 0;

    this.selected = selections;
    this.redraw();
    if(selections.size > 0) {
      this.markers.eachLayer(function(marker) {
        var position = marker.getLatLng();
        var distance = center.distanceTo(position);
        if (distance < closestDistance || !closestDistance) {
          if ( !(palette.field === 'heritage' && !marker.tree.heritage)) {
            closestDistance = distance;
            closestLatLng = position;
          }
        }
      });
      if (this.leafletMap.latLngToContainerPoint(closestLatLng).y < yThreshold) {
        pad = yThreshold;
      }
    }
    this.leafletMap.fitBounds(bounds.extend(closestLatLng), {paddingTopLeft: [0, pad]});
    setMarkerSize.call(this, this.zoom);
  }

  Map.prototype.setTrees = function(trees, palette) {
    this.trees   = trees;
    this.palette = palette;
    this.redraw();
    if(this.urlParams.has("id")) {
      var id = this.urlParams.get("id");
      if(id in this.markerMap) {
        this.markerMap[id].fire('click');
      } else {
        this.sidebar.showError();
      }
    }
  }

  Map.prototype.redraw = function() {
    var trees   = this.trees;
    var palette = this.palette;
    var selectedCommonNames = this.selected;
    var radius  = Math.max(1, this.zoom - 13);
    var filter;

    this.markers.clearLayers();
    if (selectedCommonNames.size > 0){
      filter = tree => selectedCommonNames.has(tree['name_common']);
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
          `https://storage.googleapis.com/public-tree-map/data/trees/${tree.tree_id}.json`
        )
          .then((res) => res.json())
          .then((tree) => {
            this.sidebar.setTree(tree);
            updateUrl(this.urlParams, tree.tree_id);
          });


        var markerLocation = marker.getLatLng();
        var newViewLocation = {lat: markerLocation['lat'], lng: markerLocation['lng']};
        var currentZoom = this.leafletMap.getZoom();
        var targetZoom = currentZoom > 16 ? currentZoom : 18;
        this.leafletMap.setView(newViewLocation, targetZoom, {animate: true});

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
  }

  Map.prototype.setPalette = function(palette) {
    this.palette = palette;
    var realThis = this;

    setMarkerSize.call(this, this.zoom); 
    this.markers.eachLayer(function(marker) {
      marker.setStyle({
        fillColor: realThis.getFillColor(marker.tree, palette)
      });
    });
    if (this.highlightedMarker) {
      changeCircleMarker(this.highlightedMarker, 'recolor');
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

  function generateColor(s) {
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
