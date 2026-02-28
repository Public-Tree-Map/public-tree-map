var app = this.app || {};
var a2a_config = a2a_config || {};
a2a_config.templates = a2a_config.templates || {};
var images = [];
//default image index in array
const defaultImg = 0
//initilize for scrolling
var indexOfImages = defaultImg
var totalImages = 0

var initialY = null;


(function(module) {

  function Sidebar() {
    this.body                          = document.getElementsByTagName('body')[0];
    this.sidebar                       = document.getElementById('sidebar');
    this.defaultScreen                 = document.getElementById('sidebar-default');
    this.exploreMapButton              = document.getElementById('sidebar-default-explore')
    this.treeContainer                 = document.getElementById('sidebar-tree');
    this.errorScreen                   = document.getElementById('sidebar-error');
    this.image                         = document.getElementById('sidebar-image');
    this.imageCreditLink               = document.getElementById('sidebar-image-credit-link');
    this.commonName                    = document.getElementById('sidebar-common-name');
    this.botanicalName                 = document.getElementById('sidebar-botanical-name');
    this.nativity                      = document.getElementById('sidebar-nativity');
    this.height                        = document.getElementById('sidebar-height');
    this.diameter                      = document.getElementById('sidebar-diameter');
    this.shadeProduction               = document.getElementById('sidebar-shade-production');
    this.irrigationRequirements        = document.getElementById('sidebar-irrigation-requirements');
    this.type                          = document.getElementById('sidebar-type');
    this.iucnStatus                    = document.getElementById('sidebar-iucn-status');
    this.ipcRating                     = document.getElementById('sidebar-ipc-rating');
    this.treeFamily                    = document.getElementById('sidebar-tree-family');
    this.treeFamilyCommon              = document.getElementById('sidebar-tree-family-common');
    //this.pruningYear                   = document.getElementById('sidebar-pruning-year');
    //this.pruningZone                   = document.getElementById('sidebar-pruning-zone');
    this.address                       = document.getElementById('sidebar-address');
    this.treeDetails                   = document.getElementById('sidebar-tree-details');
    this.closeButton                   = document.getElementById('sidebar-close-button');
    this.detailsButton                 = document.getElementById('sidebar-details-button');
    //Heritage Trees
    this.heritageContainer             = document.getElementById('sidebar-heritage-container');
    this.heritageTreeNumber            = document.getElementById('sidebar-heritage-number'); 
    this.heritageTreeNumber            = document.getElementById('sidebar-heritage-number'); 
    this.heritageYearInscribed         = document.getElementById('sidebar-heritage-year-inscribed');
    this.heritageDescriptionContainer  = document.getElementById('sidebar-heritage-description-container');
    this.heritageDescription           = document.getElementById('sidebar-heritage-description');
    // Vacant panel elements
    this.vacantContainer               = document.getElementById('sidebar-vacant');
    this.vacantCommonName              = document.getElementById('sidebar-vacant-common-name');
    this.vacantTreeId                  = document.getElementById('sidebar-vacant-tree-id');
    this.vacantAddress                 = document.getElementById('sidebar-vacant-address');
    //this.vacantPruningYear             = document.getElementById('sidebar-vacant-pruning-year');
    this.vacantReplacementSpecies      = document.getElementById('sidebar-vacant-replacement-species');
    this.vacantStreetSegment           = document.getElementById('sidebar-vacant-street-segment');
    this.vacantCloseButton             = document.getElementById('sidebar-vacant-close-button');
    this.vacantDetailsButton           = document.getElementById('sidebar-vacant-details-button');

    this.gsv_link   = document.getElementById('gsv-link')
    this.vacant_gsv_link   = document.getElementById('vacant-gsv-link')

    this.dragHandle = document.getElementById('sidebar-drag-handle');
    this._sheetState = 'closed';

    this.closeButton.onclick = closePanel.bind(this);
    this.vacantCloseButton.onclick = closePanel.bind(this);

    // Buttons for mobile view
    this.detailsButton.onclick = toggleFullMobileView.bind(this);
    this.vacantDetailsButton.onclick = toggleFullMobileView.bind(this);
    this.exploreMapButton.onclick = toggleFullMobileView.bind(this);

    this._initBottomSheet();
  }

  Sidebar.prototype._initBottomSheet = function() {
    if (!this.dragHandle || typeof Hammer === 'undefined') return;
    var self = this;
    var sidebar = this.sidebar;
    var startY = 0;
    var startTranslateY = 0;

    // Snap positions as fraction of 85vh from top of sheet
    var SNAP_POSITIONS = {
      closed: 1.0,       // translateY(100%) — fully hidden
      peek:   (85 - (80 / window.innerHeight * 100)) / 85, // ~80px visible
      half:   (85 - 40) / 85,  // 40vh visible
      full:   0           // nearly full
    };

    function getSheetHeight() {
      return sidebar.offsetHeight || (window.innerHeight * 0.85);
    }

    function getCurrentTranslateY() {
      var st = window.getComputedStyle(sidebar);
      var matrix = st.transform || st.webkitTransform;
      if (!matrix || matrix === 'none') return getSheetHeight();
      var values = matrix.match(/matrix.*\((.+)\)/);
      if (values && values[1]) {
        var parts = values[1].split(', ');
        return parseFloat(parts[5]) || 0;
      }
      return 0;
    }

    var mc = new Hammer.Manager(this.dragHandle, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]
      ]
    });

    mc.on('panstart', function() {
      startTranslateY = getCurrentTranslateY();
      sidebar.style.transition = 'none';
    });

    mc.on('panmove', function(e) {
      var newY = startTranslateY + e.deltaY;
      // Clamp: don't go above env(safe-area-inset-top) equivalent (~20px) or below full height
      var minY = 0;
      var maxY = getSheetHeight();
      newY = Math.max(minY, Math.min(maxY, newY));
      sidebar.style.transform = 'translateY(' + newY + 'px)';
    });

    mc.on('panend', function(e) {
      sidebar.style.transition = '';
      sidebar.style.transform = '';

      var sheetH = getSheetHeight();
      var currentY = startTranslateY + e.deltaY;
      var fraction = currentY / sheetH;
      var velocity = e.velocityY;

      var target;
      // Fast swipe detection
      if (velocity > 0.5) {
        // Swiping down
        if (self._sheetState === 'full') target = 'half';
        else if (self._sheetState === 'half') target = 'peek';
        else target = 'closed';
      } else if (velocity < -0.5) {
        // Swiping up
        if (self._sheetState === 'peek') target = 'half';
        else if (self._sheetState === 'half') target = 'full';
        else target = 'full';
      } else {
        // Snap to nearest position based on where user released
        if (fraction > 0.85) target = 'closed';
        else if (fraction > 0.6) target = 'peek';
        else if (fraction > 0.3) target = 'half';
        else target = 'full';
      }

      self._snapTo(target);
    });

    // Also allow tapping the drag handle to cycle states
    this.dragHandle.addEventListener('click', function() {
      if (window.innerWidth > 890) return;
      if (self._sheetState === 'peek') self._snapTo('half');
      else if (self._sheetState === 'half') self._snapTo('full');
      else if (self._sheetState === 'full') self._snapTo('half');
    });
  };

  Sidebar.prototype._snapTo = function(state) {
    if (window.innerWidth > 890) return;
    var states = ['closed', 'peek', 'half', 'full'];
    // Remove all mobile state classes
    for (var i = 0; i < states.length; i++) {
      this.body.classList.remove('sidebar-mobile--' + states[i]);
    }
    // Remove legacy classes
    this.body.classList.remove('sidebar-mobile--fullscreen');
    this.sidebar.classList.remove('sidebar-mobile--preview');

    this.body.classList.add('sidebar-mobile--' + state);
    this._sheetState = state;

    // Clear any inline styles from drag
    this.sidebar.style.transition = '';
    this.sidebar.style.transform = '';
  };

  Sidebar.prototype.setTree = function(tree) {
    if (!tree) {
      return this.showDefault();
    }
    const VACANCIES = [
      'vacant site',
      'stump',
      'asphalted well',
      'unsuitable site',
      'stump - not accessible',
    ];
    if (VACANCIES.indexOf(tree.name_botanical.toLowerCase()) !== -1) {
      this.vacantContainer.classList.remove('hidden');
      this.defaultScreen.classList.add('hidden');
      this.treeContainer.classList.add('hidden');
      this.errorScreen.classList.add('hidden');
      this.populateVacanciesPanel(tree);
    } else {
      this.vacantContainer.classList.add('hidden');
      this.treeContainer.classList.remove('hidden');
      this.defaultScreen.classList.add('hidden');
      this.errorScreen.classList.add('hidden');
      this.populateTreePanel(tree);
      this.populateTreeSharePanel(tree);
    }
    // Slide the sidebar open
    this.body.classList.add('sidebar--open');

    // On mobile, snap to peek state
    if (window.innerWidth <= 890) {
      this._snapTo('peek');
    }
  }

  Sidebar.prototype.populateVacanciesPanel = function(tree) {
    this.vacantCommonName.innerText         = tree.name_common;
    this.vacantTreeId.innerText             = tree.tree_id;
    this.vacantAddress.innerText            = tree.address;
    //this.vacantPruningYear.innerText        = tree.pruning_year;
    this.vacantReplacementSpecies.innerHTML = `<em>${tree.replacement_species}</em>`;
    this.vacantStreetSegment.innerText      = tree.segment;
    this.vacant_gsv_link.href = `https://www.google.com/maps?layer=c&cbll=${tree.latitude},${tree.longitude}`
  }

  Sidebar.prototype.populateTreePanel = function(tree) {
    this.commonName.innerText    = tree.name_common;
    this.botanicalName.innerText = tree.name_botanical;
    this.address.innerText       = tree.address;
    this.address.classList.add("sidebar-address-small");
    this.vacantAddress.classList.add("sidebar-address-small");
    this.gsv_link.href = `https://www.google.com/maps?layer=c&cbll=${tree.latitude},${tree.longitude}`;

    setField(this.treeFamily, tree.family_name_common
      ? `${tree.family_name_common} (<em>${tree.family_name_botanical}</em>)`
      : null, true);
    setField(this.height, buildHeightText(tree.height_min_ft, tree.height_max_ft));
    setField(this.diameter, buildDiameterText(tree.diameter_min_in, tree.diameter_max_in));
    setField(this.nativity, buildNativityText(tree.nativity));
    setField(this.shadeProduction, tree.shade_production);
    setField(this.irrigationRequirements, tree.irrigation_requirements);
    setField(this.iucnStatus, tree.iucn_status);
    setField(this.ipcRating, buildIpcText(tree.ipc_rating));

    if (tree.images && tree.images.length > 0) {
      this.image.style.backgroundSize = 'cover';
      this.image.classList.remove('hidden');
      images = tree.images;
      totalImages = images.length;

      //build image
      indexOfImages = defaultImg
      currentSlide(indexOfImages)

      //bind touch handlers
      const touch_handle = new Hammer(this.image)
      touch_handle.on('swipeleft', (e)=>{
      nextSlideImage(e)
       })
      touch_handle.on('swiperight', (e)=>{
      lastSlideImage(e)
      })

    } else {
      this.image.style.backgroundImage = '';
      this.image.classList.add('hidden');
    }
    if (tree.heritage === true) {
      this.heritageContainer.classList.add('active');
      this.heritageTreeNumber.innerText = '#'+tree['heritageNumber'];
      this.heritageYearInscribed.innerText = tree['heritageYear'];
      if (tree['heritageText'] !== null) {
        this.heritageDescriptionContainer.classList.add('active');
        this.heritageDescription.innerText = tree['heritageText'];
      } else {
        this.heritageDescriptionContainer.classList.remove('active');
      }
    } else {
      this.heritageContainer.classList.remove('active');
    }
  }

  Sidebar.prototype.showDefault = function() {
    this.errorScreen.classList.add('hidden');
    this.treeContainer.classList.add('hidden');
    this.vacantContainer.classList.add('hidden');
    this.defaultScreen.classList.add('hidden');
    // Collapse the sidebar — map is the default view
    this.body.classList.remove('sidebar--open');
    removeQueryStringFromUrlBar();
  }

  Sidebar.prototype.showError = function() {
    this.defaultScreen.classList.add('hidden');
    this.treeContainer.classList.add('hidden');
    this.vacantContainer.classList.add('hidden');
    this.errorScreen.classList.remove('hidden');
    this.body.classList.add('sidebar--open');
  }

  Sidebar.prototype.populateTreeSharePanel = function(tree) {
    let treeName = tree.name_common;
    a2a_config.templates.email = {
      subject: treeName+" on Santa Monica's Public Tree Map",
      body: treeName+" on Santa Monica's Public Tree Map :\n${link}"
    };

    a2a_config.templates.twitter = {
        text: treeName+" on Santa Monica's ${title} ${link} @santamonicacity",
    };
  }

  Sidebar.prototype.fillLastUpdate =  (str) =>{
    const lastUpdate = new Date(str)
    //date format: dd MON, YYYY
    const options = {year: 'numeric', month: 'short', day: 'numeric' }
    let elements = document.getElementsByClassName('sidebar-last-updated')
    //update DOM
    for (i of elements) {
      i.innerHTML = 'Data last checked: ' + lastUpdate.toLocaleDateString('en-GB', options)
    }
  } 

  function toggleFullMobileView() {
    if (window.innerWidth <= 890 && this._snapTo) {
      // Cycle through bottom sheet states
      if (this._sheetState === 'peek') {
        this._snapTo('half');
      } else if (this._sheetState === 'half') {
        this._snapTo('full');
      } else if (this._sheetState === 'full') {
        this._snapTo('half');
      } else {
        this._snapTo('half');
      }
      return;
    }
    // Desktop fallback (legacy)
    let className = 'sidebar-mobile--fullscreen';
    if(this.body.classList.contains(className)) {
      this.body.classList.remove(className);
      this.detailsButton.classList.remove('hidden');
      this.vacantDetailsButton.classList.remove('hidden');
      this.detailsButton.innerText = "View Details";
      this.vacantDetailsButton.innerText = "View Details";
      this.exploreMapButton.innerText = "What is Public Tree Map?";
      this.address.classList.add("sidebar-address-small");
      this.vacantAddress.classList.add("sidebar-address-small");
      this.sidebar.classList.add('sidebar-mobile--preview')
    }
    else {
      this.body.classList.add(className);
      this.detailsButton.classList.add('hidden');
      this.vacantDetailsButton.classList.add('hidden');
      this.exploreMapButton.innerText = "Explore the Map";
      this.address.classList.remove("sidebar-address-small");
      this.vacantAddress.classList.remove("sidebar-address-small");
      this.sidebar.classList.remove('sidebar-mobile--preview')
    }
  }


  function closePanel() {
    if (window.innerWidth <= 890 && this._snapTo) {
      this._snapTo('closed');
      this.showDefault();
      return;
    }
    // Desktop fallback
    let fullScreen = 'sidebar-mobile--fullscreen';
    let closed = 'sidebar-mobile--closed'
    if(this.body.classList.contains(fullScreen)) {
      (toggleFullMobileView.bind(this))();
    }
    else {
      this.body.classList.add(closed);
    }
    this.showDefault();
  }

  function setField(element, value, isHtml) {
    var field = element.closest('.sidebar-field');
    if (!value || value === 'not listed') {
      if (field) field.classList.add('hidden');
      return;
    }
    if (field) field.classList.remove('hidden');
    if (isHtml) {
      element.innerHTML = value;
    } else {
      element.innerText = value;
    }
  }

  function buildNativityText(nativity) {
    if (!nativity) return null;
    if ("native" === nativity.toLowerCase()) {
      return "Native to California";
    } else if ("exotic" === nativity.toLowerCase()) {
      return "Not native to California";
    } else if (["moderate", "watch", "limited"].indexOf(nativity.toLowerCase()) !== -1) {
      return "Not native to California";
    }
    return null;
  }

  function buildHeightText(min, max) {
    if ((min == null || min === -1) && (max == null || max === -1)) {
      return null;
    }
    if (min == null || min === -1) {
      return "Up to " + max + ' ft';
    }
    if (max == null || max === -1) {
      return min + '+ ft';
    }
    return min + "-" + max + " ft";
  }

  function buildDiameterText(min, max) {
    if ((min == null || min === -1) && (max == null || max === -1)) {
      return null;
    }
    if (min == null || min === -1) {
      return "Up to " + max + ' in';
    }
    if (max == null || max === -1) {
      return min + '+ in';
    }
    return min + "-" + max + " in";
  }

  function buildIpcText(ipcRating){
    if (ipcRating === "moderate") {
      return "moderate";
    }
    if (ipcRating === "watch") {
      return "watch";
    }
    if (ipcRating === "limited") {
      return "limited";
    } else {
      return "not listed";
    }

  }

  function removeQueryStringFromUrlBar() {
    var newURL = location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);
  }

  // Exports
  module.Sidebar = Sidebar;

})(app);

function currentSlide(index){
  this.image = document.getElementById('sidebar-image');
  this.imageCounter = document.getElementById('sidebar-image-counter');
  this.imageCreditLink = document.getElementById('sidebar-image-credit-link');
  this.image.style.backgroundImage = 'url(' + images[index].url + ')';
  this.imageCreditLink.href = images[index].author.url;
}

function lastSlideImage(e){
  
  if(indexOfImages==0){
    indexOfImages= totalImages - 1;
    currentSlide(indexOfImages);
  }else{
    indexOfImages-=1;
    currentSlide(indexOfImages);
  }
  
}
function nextSlideImage(){
  if(indexOfImages== totalImages - 1){
    indexOfImages=0;
    currentSlide(indexOfImages);
  }else{
    indexOfImages+=1;
    currentSlide(indexOfImages);
  }
  
}
