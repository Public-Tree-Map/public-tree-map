var app = this.app || {};

(function(module) {

  filter = document.getElementById('species');

  function SpeciesFilter(map) {
    this.map = map;

    // Set the "All Species" and spacer options in the dropdown
    var all = document.createElement('option')
    all.value = 'all';
    all.text  = 'All Species';

    var spacer = document.createElement('option')
    spacer.text     = '------------------------------';
    spacer.disabled = true;

    filter.appendChild(all);
    filter.appendChild(spacer);

    // Set up the change listener for the dropdown
    filter.addEventListener('change', (function(e) {
      var value = e.target.value;
      if (value === 'all') {
        map.setFilter(undefined);
      } else {
        map.setFilter(x => x['name_common'] === e.target.value);
      }
    }).bind(this));
  }

  SpeciesFilter.prototype.setSpecies = function(species) {
    // Setup the species dropdown.
    this.species = Array.from(species).filter(s => s !== 'Vacant Site').sort();

    this.species.forEach(s => {
      var option = document.createElement('option');
      option.text  = s;
      option.value = s;
      filter.appendChild(option);
    });
  }

  // Exports
  module.SpeciesFilter = SpeciesFilter;

})(app);
