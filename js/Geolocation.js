var app = this.app || {};

(function(module) {

    function Geolocation(map) {
        this.placesAutocomplete = places({
          appId: 'plVZ8ETLEQ8S',
          apiKey: '593b988f69febc8841d79bcdc768d5c8',
          container: document.querySelector('#address-input'),
          insidePolygon: "34.026488, -118.516895, 34.048822, -118.491788, 34.041779, -118.483893, 34.046615, -118.477840, 34.024744, -118.446215, 34.017025, -118.441751, 33.993856, -118.481530"
        });

        var zoomToLatLng = function(latlng){
            var currentZoom = map.leafletMap.getZoom();
            var targetZoom = currentZoom > 16 ? currentZoom : 18;
            map.leafletMap.flyTo(
                latlng,
                targetZoom,
                {animate: true}
            );
        };

        //trigger leaflet.locate
        document.getElementsByClassName('ap-icon-pin')[0].addEventListener(
        'click', () => map.triggerLocate() )


        this.placesAutocomplete.on('change', function(event){
            zoomToLatLng(event.suggestion.latlng);
            const {lat, lng} = {...event.suggestion.latlng}
            map.setPin(lat,lng, event.suggestion.name)
        })
    }

    // Exports
    module.Geolocation = Geolocation;

})(app);
