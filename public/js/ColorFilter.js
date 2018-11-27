var app = this.app || {};

(function(module) {

  var _map;

  function ColorFilter(map) {
    _map = map;

    var filter = document.getElementById('color-filter');

    filter.addEventListener('change', function(e) {
      _map.setColorProperty(e.target.value);
    });
  }

  // Exports
  module.ColorFilter = ColorFilter;

})(app);
