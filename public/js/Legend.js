var app = this.app || {};

/**
 * TODO: This class doesn't do anything, because it doesn't update a view.
 * However, *is* updated when the palette changes, so if you hook it up to a
 * view and implement the #setLegend function, you should be good.
 */
(function(module) {

  function Legend() {
    // TODO: Store references to views
  }

  /** Invoked with an object that contains data that can be used to render a legend */
  Legend.prototype.setLegend = function(legend) {
    console.log(legend);

    // TODO: Render legend
  }

  // Exports
  module.Legend = Legend;
})(app);
