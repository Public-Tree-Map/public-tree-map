var app = this.app || {};

(function(module) {

  function ColorFilter(map, legend) {
    this.map    = map;
    this.legend = legend;

    var filter = document.getElementById('color-filter');
    document.getElementById("nativity").onclick = function() {map.setPalette(module.palettes["nativity"])};
    document.getElementById("name_common").onclick = function() {map.setPalette(module.palettes["name_common"])};
    document.getElementById("family_name_botanical").onclick = function() {map.setPalette(module.palettes["family_name_botanical"])};
    document.getElementById("irrigation_requirements").onclick = function() {map.setPalette(module.palettes["irrigation_requirements"])};
    document.getElementById("shade_production").onclick = function() {map.setPalette(module.palettes["shade_production"])};

    filter.addEventListener('change', (function(e) {
      this.onChange(e.target.value);
    }).bind(this));

    this.onChange(filter.value);
  }

  ColorFilter.prototype.onChange = function(key) {
    this.map.setPalette(module.palettes[key]);
    this.legend.setLegend(module.palettes[key]);
  }

  // Exports
  module.ColorFilter = ColorFilter;

})(app);
