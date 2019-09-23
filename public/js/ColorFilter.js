var app = this.app || {};

(function(module) {

  function ColorFilter(map, legend) {
    this.map    = map;
    this.legend = legend;
    var mobileSpeciesButton = document.getElementById("leftMobileButton");
    var mobileFamilyButton = document.getElementById("rightMobileButton");

    var filter = document.getElementById('color-filter');

    filter.addEventListener('change', (function(e) {
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

    this.onChange(filter.value);

    


    mobileSpeciesButton.onclick = function() {
      map.setPalette(module.palettes["name_common"])

      //this.map.setPalette(module.palettes["name_common"])
      mobileSpeciesButton.style.backgroundColor = "#43ae76";
      mobileFamilyButton.style.backgroundColor = 'white';
    
      mobileSpeciesButton.style.color = 'white';
      mobileFamilyButton.style.color = 'black';
    };

    mobileFamilyButton.onclick = function() {
      map.setPalette(module.palettes["family_name_botanical"])

      mobileFamilyButton.style.backgroundColor = "#43ae76";
      mobileSpeciesButton.style.backgroundColor = 'white';
    
      mobileFamilyButton.style.color = 'white';
      mobileSpeciesButton.style.color = 'black';
    };

  }

  ColorFilter.prototype.onChange = function(key) {
    this.map.setPalette(module.palettes[key]);
    this.legend.setLegend(module.palettes[key]);
  }

  // Exports
  module.ColorFilter = ColorFilter;

  //Mobile
  


})(app);
  
