var app = this.app || {};

(function(module) {
  var _sidebar;
  var _map;
  var _colorFilter;
  var _speciesFilter;

  function init() {
    _sidebar     = new module.Sidebar();
    _map         = new module.Map(_sidebar);
    _colorFilter = new module.ColorFilter(_map);
    _speciesFilter = new module.SpeciesFilter(_map);

    _sidebar.showDefault();

    fetch('https://storage.googleapis.com/public-tree-map/data/trees.json')
      .then(function(response) {
        return response.json().then(function(trees) {
          setData(trees);
        });
      });
  }

  function setData(trees) {
    _map.setTrees(trees, module.palettes['name_common']);
    species = trees.reduce((acc, val) => acc.add(val['name_common']), new Set());
    _speciesFilter.setSpecies(species);
    document.getElementById('loading').classList.add('hidden');
  }

  // EXPORTS
  module.init = init;
  module.setData = setData;

})(app);
