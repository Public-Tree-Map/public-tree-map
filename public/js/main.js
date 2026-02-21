var app = this.app || {};

(function(module) {
  API_URL = "http://127.0.0.1:8080/"

  var _sidebar;
  var _map;
  var _colorFilter;
  var _legend;
  var _speciesFilter;

  function init() {
    var urlParams = new URLSearchParams(window.location.search);
    var tree_id = urlParams.get('treeId');

    _sidebar = new module.Sidebar();
    _map = new module.Map(_sidebar, API_URL, tree_id);
    _speciesFilter = new module.SpeciesFilter(_map);
    _legend = new module.Legend(_map, _speciesFilter);
    _colorFilter = new module.ColorFilter(_map, _legend);
    _geolocation = new module.Geolocation(_map);

    if (!tree_id) {
      _sidebar.showDefault();
    }
    else {
      _map.setTreeViewFromUrl(tree_id);
    }
    _map.setHeatMapData();


    fetch(API_URL.concat("species/all"))
        .then((res) => {return res.json()})
        .then((species) => {
          setSpecies(species, _map);
        });
  }

  function setSpecies(species, map) {
    console.log(species);
    var defaultPalette = module.palettes[_colorFilter.filter.item(0).value];
    _map.setPalette(defaultPalette);
    var formattedSelect = _legend.setSelectLegend(_speciesFilter.selectFormatter(species), defaultPalette);

    _speciesFilter.setSpecies(formattedSelect);
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

})(app);

function closeFirstTimeDialog(){
  let firstTimeDialog = document.getElementById("first-time-dialog");
  firstTimeDialog.classList.add("hidden");
  localStorage.setItem("firstTimeV2", false);
}
