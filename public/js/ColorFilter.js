var app = this.app || {};

(function(module) {

  function ColorFilter(map, legend) {
    this.map    = map;
    this.legend = legend;
    this.filter = document.getElementsByClassName('species-button');

    $('.species-button').on('click', (function(e) {
      $('.species-button').removeClass('active');
      $(e.target).addClass('active');
      this.onChange(e.target.value);
    }).bind(this));

    this.onChange(this.filter.value);
  }

  ColorFilter.prototype.onChange = function(key) {
    this.map.setPalette(module.palettes[key]);
    this.legend.setLegend(module.palettes[key]);
  }

  // Exports
  module.ColorFilter = ColorFilter;
  
})(app);
