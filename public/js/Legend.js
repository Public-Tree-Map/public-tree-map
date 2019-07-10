var app = this.app || {};

/**
 * TODO: This class doesn't do anything, because it doesn't update a view.
 * However, *is* updated when the palette changes, so if you hook it up to a
 * view and implement the #setLegend function, you should be good.
 */
(function(module) {

  function Legend() {
    // TODO: Store references to views
    $(document).ready(function() {
      let palette = app.palettes;
    });
  }

  /** Invoked with an object that contains data that can be used to render a legend */
  Legend.prototype.setLegend = function(legend) {
    // TODO: Render legend
    $(document).ready(function () {
      $("#legend-container").empty();
      for (const key in legend) {
        if (key != 'generated' && key != 'default' && key != 'field') {
          var item = $("<div class='legend-item'><div class='legend-icon'></div><div class='legend-description'></div></div>");
          $(item).find(".legend-icon").css("background-color",legend[key].color);
          $(item).find(".legend-description").html(legend[key].title);
          $("#legend-container").append(item);
          console.log("apeending!")
        };
      };
    });
  }

  // Exports
  module.Legend = Legend;
})(app);
