var app = this.app || {};

(function(module) {

    function Geolocation(map) {
        this.placesAutocomplete = places({
          appId: 'plVZ8ETLEQ8S',
          apiKey: '593b988f69febc8841d79bcdc768d5c8',
          container: document.querySelector('#address-input'),
          insidePolygon: "34.026488, -118.516895, 34.048822, -118.491788, 34.041779, -118.483893, 34.046615, -118.477840, 34.024744, -118.446215, 34.017025, -118.441751, 33.993856, -118.481530"
        });

        var zoomFromPosition = function(position){
            zoomToLatLng({lat: position.coords.latitude, lng: position.coords.longitude})
        };
        var zoomToLatLng = function(latlng){
            var currentZoom = map.leafletMap.getZoom();
            var targetZoom = currentZoom > 16 ? currentZoom : 18;
            map.leafletMap.setView(
                latlng,
                targetZoom,
                {animate: true}
            );
        };
        var placesPinElement = document.getElementsByClassName('ap-icon-pin')[0];
        var clonedPlacesPinWithoutEventListenters = placesPinElement.cloneNode(true);
        placesPinElement.parentNode.replaceChild(clonedPlacesPinWithoutEventListenters, placesPinElement);
        $('.ap-icon-pin').on('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(zoomFromPosition);
            }
            else {
                alert('To use this feature, please enable location services.')
            }
        });
        this.placesAutocomplete.on('change', function(event){
            zoomToLatLng(event.suggestion.latlng);
        })
    }

    // Exports
    module.Geolocation = Geolocation;

})(app);
