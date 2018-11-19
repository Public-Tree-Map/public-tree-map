var app = this.app || {};

(function(module) {

  var _map;

  function ColorFilter(map) {
    _map = map;

    document.getElementsByName('color-filter').forEach(function(e) {
      e.onclick = onFilterClicked;
    });
  }

  function onFilterClicked(e) {
    _map.setColorProperty(e.target.value);
  }

  // Exports
  module.ColorFilter = ColorFilter;
})(app);
