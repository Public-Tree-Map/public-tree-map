var app = this.app || {};

(function(module) {

  function ColorFilter(map, legend) {
    this.map    = map;
    this.legend = legend;

    var filter = document.getElementById('color-filter');

    // filter.addEventListener('change', (function(e) {
    //   console.log(e.target.value)
    //   this.onChange(e.target.value);
    // }).bind(this));

    this.onChange(filter.value);

    $("#color-filter").select2();
    $('#color-filter').on('select2:select',  e => {
      var id = e.params.data.id;
      this.onChange(id);
  });
  }

  ColorFilter.prototype.onChange = function(key) {
    this.map.setPalette(module.palettes[key]);
    this.legend.setLegend(module.palettes[key]);
  }

  // Exports
  module.ColorFilter = ColorFilter;

})(app);
