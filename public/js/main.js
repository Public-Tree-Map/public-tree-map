var app = this.app || {};

(function(module) {
  var _sidebar;
  var _map;
  var _colorFilter;
  var _legend;
  var _speciesFilter;

  function init() {
    _sidebar       = new module.Sidebar();
    _map           = new module.Map(_sidebar);
    _legend        = new module.Legend();
    _colorFilter   = new module.ColorFilter(_map, _legend);
    _speciesFilter = new module.SpeciesFilter(_map);
    _geolocation = new module.Geolocation(_map);

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
    _speciesFilter.setSpecies(_speciesFilter.selectFormatter(trees));
    document.getElementById('loading').classList.add('hidden');
    var nativity = document.getElementById('nativity');
    nativity.style.backgroundColor = '#4CAF50'
    nativity.style.color = 'white'
    nativity.style.border = '2px solid #4CAF50'
  }

  // EXPORTS
  module.init = init;
  module.setData = setData;

})(app);
