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

    checkFirstTime();
    
    fetch('https://storage.googleapis.com/public-tree-map/data/map.json')
      .then(function(response) {
        return response.json().then(function(trees) {
          setData(trees);
        });
      });
  }

  function setData(trees) {
    var defaultPalette = module.palettes[_colorFilter.filter.item(0).value];
    var formattedSelect = _legend.setSelectLegend(_speciesFilter.selectFormatter(trees), defaultPalette);

    _map.setTrees(trees, module.palettes['name_common']);
    _speciesFilter.setSpecies(formattedSelect);
    document.getElementById('loading').classList.add('hidden');
  }

  // EXPORTS
  module.init = init;
  module.setData = setData;

  function checkTouchDevice(){
    return Modernizr.touch || 
      (deviceAgent.match(/(iphone|ipod|ipad)/) ||
      deviceAgent.match(/(android)/)  || 
      deviceAgent.match(/(iemobile)/) || 
      deviceAgent.match(/iphone/i) || 
      deviceAgent.match(/ipad/i) || 
      deviceAgent.match(/ipod/i) || 
      deviceAgent.match(/blackberry/i) || 
      deviceAgent.match(/bada/i));
  }
  function checkFirstTime(){
    let isFirstTime = localStorage.getItem("isFirstTime");
    var isTouchDevice = checkTouchDevice();
    if(isFirstTime==null){
      if (isTouchDevice) { 
        showFirstTimeDialog();
      } 
     
    }
  }
  
})(app);


function closeFirstTime(){
  let firstTime = document.getElementById("firstTime")

  firstTime.classList.add('hidden');
  localStorage.setItem("isFirstTime", false)
}
function showFirstTimeDialog(){
  let firstTime = document.getElementById("firstTime")

  firstTime.classList.remove("hidden");
}