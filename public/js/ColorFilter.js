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
      if(e.target.value=="name_common"){
        mobileSpeciesButton.style.backgroundColor = "#43ae76";
        mobileSpeciesButton.style.color = 'white';
      }else{
        mobileSpeciesButton.style.backgroundColor = "white";
        mobileSpeciesButton.style.color = 'black';
      }

      if(e.target.value=="family_name_botanical"){
        mobileFamilyButton.style.backgroundColor = "#43ae76";
        mobileFamilyButton.style.color = 'white';
      }else{
        mobileFamilyButton.style.backgroundColor = "white";
        mobileFamilyButton.style.color = 'black';
      }
    }).bind(this));

    this.onChange(this.filter.value);
  }

  ColorFilter.prototype.onChange = function(key) {
    this.map.setPalette(module.palettes[key]);
    this.legend.setLegend(module.palettes[key]);
  }

  // Exports
  module.ColorFilter = ColorFilter;

  //Mobile



})(app);
