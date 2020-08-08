var app = this.app || {};

(function(module) {

    function Geolocation(map) {
        this.placesAutocomplete = places({
          appId: 'plVZ8ETLEQ8S',
          apiKey: '593b988f69febc8841d79bcdc768d5c8',
          container: document.querySelector('#address-input'),
          insidePolygon: "34.045660, -118.914285, 34.354319, -118.529420, 34.075525, -117.715745, 33.678182, -118.008943,"
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
