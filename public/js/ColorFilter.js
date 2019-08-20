var app = this.app || {};

(function(module) {

  function ColorFilter(map, legend) {
    this.map    = map;
    this.legend = legend;

   var filter = document.getElementById('color-filter');
   var nativityButton = document.getElementById("nativity");
   var nameButton = document.getElementById("name_common");
   var family = document.getElementById("family_name_botanical");
   var irrigation = document.getElementById("irrigation_requirements");
   var shade = document.getElementById("shade_production");
    
   nativityButton.onclick = function() {
      map.setPalette(module.palettes["nativity"])
      nativityButton.style.backgroundColor = '#4CAF50'
      nativityButton.style.color = 'white'
      nativityButton.style.border = '2px solid #4CAF50'

      irrigation.style = "topbutton"
      nameButton.style = "topbutton"
      family.style = "topbutton"
      shade.style = "topbutton"

  };
    nameButton.onclick = function() {
      map.setPalette(module.palettes["name_common"])
      nameButton.style.backgroundColor = '#4CAF50'
      nameButton.style.color = 'white'
      nameButton.style.border = '2px solid #4CAF50'


      nativityButton.style = "topbutton"
      irrigation.style = "topbutton"
      nativityButton.style = "topbutton"
      family.style = "topbutton"
      shade.style = "topbutton"

    };
    family.onclick = function() {
      map.setPalette(module.palettes["family_name_botanical"])
      family.style.backgroundColor = '#4CAF50'
      family.style.color = 'white'
      family.style.border = '2px solid #4CAF50'

      nativityButton.style = "topbutton"
      nameButton.style = "topbutton"
      irrigation.style = "topbutton"
      shade.style = "topbutton"

    };
    irrigation.onclick = function() {
      map.setPalette(module.palettes["irrigation_requirements"])
      irrigation.style.backgroundColor = '#4CAF50'
      irrigation.style.color = 'white'
      irrigation.style.border = '2px solid #4CAF50'

      nativityButton.style = "topbutton"
      nameButton.style = "topbutton"
      family.style = "topbutton"
      shade.style = "topbutton"

    };
    shade.onclick = function() {
      map.setPalette(module.palettes["shade_production"])
      shade.style.backgroundColor = '#4CAF50'
      shade.style.color = 'white'
      shade.style.border = '2px solid #4CAF50'
    
      irrigation.style = "topbutton"
      nativityButton.style = "topbutton"
      nameButton.style = "topbutton"
      family.style = "topbutton"
    };

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
