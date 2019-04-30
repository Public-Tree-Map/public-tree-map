var app = this.app || {};

(function(module) {

  filter = document.getElementById('species');

  function SpeciesFilter(map) {
    this.map = map;

    filter.addEventListener('change', (function(e) {
      map.setFilter(x => x['name_common'] === e.target.value);
    }).bind(this));
  }

  SpeciesFilter.prototype.setSpecies = function(species) {
    this.species = Array.from(species).filter(s => s !== 'Vacant Site').sort();

    this.species.forEach(s => {
      var option = document.createElement('option');
      option.text = s;
      option.value = s;
      filter.appendChild(option);
    });
  }

  // Exports
  module.SpeciesFilter = SpeciesFilter;

})(app);
