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
    _speciesFilter = new module.SpeciesFilter(_map);
    _legend        = new module.Legend(_map, _speciesFilter);
    _colorFilter   = new module.ColorFilter(_map, _legend);
    _geolocation = new module.Geolocation(_map);

    _sidebar.showDefault();


    fetch("https://storage.googleapis.com/public-tree-map/data/map.json")
      .then((res) => {
        _sidebar.fillLastUpdate(res.headers.get('Last-Modified'))
        return res.json()})
      .then((trees) => setData(trees));
  }


  function setData(trees) {
    var defaultPalette = module.palettes[_colorFilter.filter.item(0).value];
    var formattedSelect = _legend.setSelectLegend(_speciesFilter.selectFormatter(trees), defaultPalette);

    _map.setTrees(trees, module.palettes['name_common']);
    _speciesFilter.setSpecies(formattedSelect);
    document.getElementById('loading').classList.add('hidden');
  }



  function isTouchDevice(){
    return typeof window.ontouchstart !== 'undefined';
  }

  function firstTimeDialog(){
    let firstTime = localStorage.getItem("firstTimeV2");
    if(firstTime==null&&isTouchDevice()){
      showFirstTimeDialog();
    }
  }
  function showFirstTimeDialog(){
    let firstTimeDialog = document.getElementById("first-time-dialog");
    firstTimeDialog.classList.remove("hidden");
  }


  // EXPORTS
  module.init = init;
  module.setData = setData;

})(app);

function closeFirstTimeDialog(){
  let firstTimeDialog = document.getElementById("first-time-dialog");
  firstTimeDialog.classList.add("hidden");
  localStorage.setItem("firstTimeV2", false);
}
