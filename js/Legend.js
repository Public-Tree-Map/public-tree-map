var app = this.app || {};

/**
 * TODO: This class doesn't do anything, because it doesn't update a view.
 * However, *is* updated when the palette changes, so if you hook it up to a
 * view and implement the #setLegend function, you should be good.
 */
(function(module) {

  function Legend(map, speciesFilter) {
    // TODO: Store references to views
    this.map = map;
    this.speciesFilter = speciesFilter;
  }

  Legend.prototype.setSelectLegend = function(formattedSpecies, palette) {
    return formattedSpecies.map(
      tree => ({...tree, legend: this.map.getFillColor(tree, palette)})
    );
  }

  /** Invoked with an object that contains data that can be used to render a legend */
  Legend.prototype.setLegend = function(palette) {
    // TODO: Render legend
    if(palette) {
      var newPaletteFilter = this.setSelectLegend(this.speciesFilter.species, palette);
      this.speciesFilter.setSpecies(newPaletteFilter);
    }
  }

  // Exports
  module.Legend = Legend;
})(app);
