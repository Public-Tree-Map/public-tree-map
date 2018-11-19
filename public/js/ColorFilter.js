var app = this.app || {};

(function(module) {

  var _map;

  function ColorFilter(map) {
    _map = map;

    $("input[name='color-filter']").change(function(e) {
      _map.setColorProperty(e.target.value);
    });
  }

  // Exports
  module.ColorFilter = ColorFilter;
})(app);
