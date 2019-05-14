var app = this.app || {};

(function(module) {
  var _sidebar;
  var _map;
  var _colorFilter;
  var _speciesFilter;
  var _legend;

  function init() {
    _sidebar       = new module.Sidebar();
    _map           = new module.Map(_sidebar);
    _legend        = new module.Legend();
    _colorFilter   = new module.ColorFilter(_map, _legend);
    _speciesFilter = new module.SpeciesFilter(_map);

    _sidebar.showDefault();

    fetch('https://storage.googleapis.com/public-tree-map/data/map.json')
      .then(function(response) {
        return response.json().then(function(trees) {
          setData(trees);
        });
      });
  }

  function setData(trees) {
    _map.setTrees(trees, module.palettes['nativity']);
    species = trees.reduce((acc, val) => acc.add(val['name_common']), new Set());
    _speciesFilter.setSpecies(species);
    document.getElementById('loading').classList.add('hidden');
  }

  // EXPORTS
  module.init = init;
  module.setData = setData;

})(app);
