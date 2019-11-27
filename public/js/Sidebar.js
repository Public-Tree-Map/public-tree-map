var app = this.app || {};
var a2a_config = a2a_config || {};
a2a_config.templates = a2a_config.templates || {};
var images = [];
var indexOfImages = 1;

var initialY = null;


(function(module) {

  function Sidebar() {
    this.body                          = document.getElementsByTagName('body')[0];
    this.sidebar                       = $('#sidebar');
    this.defaultScreen                 = $('#sidebar-default');
    this.exploreMapButton              = $('#sidebar-default-explore')
    this.treeContainer                 = $('#sidebar-tree');
    this.errorScreen                   = $('#sidebar-error');
    this.image                         = $('#sidebar-image');
    this.imageCreditLink               = $('#sidebar-image-credit-link');
    this.commonName                    = $('#sidebar-common-name');
    this.botanicalName                 = $('#sidebar-botanical-name');
    this.treeId                        = $('#sidebar-tree-id');
    this.nativity                      = $('#sidebar-nativity');
    this.height                        = $('#sidebar-height');
    this.diameter                      = $('#sidebar-diameter');
    this.shadeProduction               = $('#sidebar-shade-production');
    this.irrigationRequirements        = $('#sidebar-irrigation-requirements');
    this.type                          = $('#sidebar-type');
    this.iucnStatus                    = $('#sidebar-iucn-status');
    this.ipcRating                     = $('#sidebar-ipc-rating');
    this.treeFamily                    = $('#sidebar-tree-family');
    this.treeFamilyCommon              = $('#sidebar-tree-family-common');
    this.pruningYear                   = $('#sidebar-pruning-year');
    this.pruningZone                   = $('#sidebar-pruning-zone');
    this.replacementSpecies            = $('#sidebar-replacement-species');
    this.address                       = $('#sidebar-address');
    this.streetSegment                 = $('#sidebar-street-segment');
    this.treeDetails                   = $('#sidebar-tree-details');
    this.closeButton                   = $('#sidebar-close-button');
    this.detailsButton                 = $('#sidebar-details-button');
    //Heritage Trees
    this.heritageContainer             = $('#sidebar-heritage-container');
    this.heritageTreeNumber            = $('#sidebar-heritage-number'); 
    this.heritageTreeNumber            = $('#sidebar-heritage-number'); 
    this.heritageYearInscribed         = $('#sidebar-heritage-year-inscribed');
    this.heritageDescriptionContainer  = $('#sidebar-heritage-description-container');
    this.heritageDescription           = $('#sidebar-heritage-description');
    // Vacant panel elements
    this.vacantContainer               = $('#sidebar-vacant');
    this.vacantCommonName              = $('#sidebar-vacant-common-name');
    this.vacantTreeId                  = $('#sidebar-vacant-tree-id');
    this.vacantAddress                 = $('#sidebar-vacant-address');
    this.vacantPruningYear             = $('#sidebar-vacant-pruning-year');
    this.vacantReplacementSpecies      = $('#sidebar-vacant-replacement-species');
    this.vacantStreetSegment           = $('#sidebar-vacant-street-segment');
    this.vacantCloseButton             = $('#sidebar-vacant-close-button');
    this.vacantDetailsButton           = $('#sidebar-vacant-details-button')

    this.closeButton.onclick = closePanel.bind(this);
    this.vacantCloseButton.onclick = closePanel.bind(this);

    // Buttons for mobile view
    this.detailsButton.onclick = toggleFullMobileView.bind(this);
    this.vacantDetailsButton.onclick = toggleFullMobileView.bind(this);
    this.exploreMapButton.onclick = toggleFullMobileView.bind(this);

    this.sidebar.on("touchstart", startTouch, false);
    this.sidebar.on("touchmove", onSwipe, false);


    onSwipe
  }

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
      this.vacantContainer.show();
      this.defaultScreen.hide();
      this.treeContainer.hide();
      this.errorScreen.hide();
      this.populateVacanciesPanel(tree);
    } else {
      this.vacantContainer.hide();
      this.treeContainer.show();
      this.defaultScreen.hide();
      this.errorScreen.hide();
      this.populateTreePanel(tree);
      this.populateTreeSharePanel(tree);
    }
  }

  Sidebar.prototype.populateVacanciesPanel = function(tree) {
    this.vacantCommonName.text(tree.name_common);
    this.vacantTreeId.text(tree.tree_id);
    this.vacantAddress.text(tree.address);
    this.vacantPruningYear.text(tree.pruning_year);
    this.vacantReplacementSpecies.html(`<em>${tree.replacement_species}</em>`);
    this.vacantStreetSegment.text(tree.segment);
  }

  Sidebar.prototype.populateTreePanel = function(tree) {
    this.commonName.text(tree.name_common);             
    this.botanicalName.text(tree.name_botanical);
    this.treeId.text(tree.tree_id);
    this.nativity.text(buildNativityText(tree.nativity)); 
    this.height.text(buildHeightText(tree.height_min_ft, tree.height_max_ft));
    this.diameter.text(buildDiameterText(tree.diameter_min_in, tree.diameter_max_in));
    this.shadeProduction.text(tree.shade_production);
    this.irrigationRequirements.text(tree.irrigation_requirements);
    this.iucnStatus.text(tree.iucn_status);
    this.ipcRating.text(buildIpcText(tree.ipc_rating));
    this.treeFamily.html(`${tree.family_name_common} (<em>${tree.family_name_botanical}</em>)`);
    this.pruningYear.text(tree.pruning_year);
    this.replacementSpecies.html(`<em>${tree.replacement_species}</em>`);
    this.address.text(tree.address);
    this.address.addClass("sidebar-address-small")
    this.streetSegment.text(tree.segment);

    if (tree.images && tree.images.length > 1) {
      this.image.style.backgroundImage = 'url(' + tree.images[1].url + ')';
      this.image.style.backgroundSize = 'cover';
      this.image.show();

      this.imageCreditLink.href = tree.images[1].author.url;
      images = tree.images;
    } else {
      this.image.style.backgroundImage = '';
      this.image.hide();
    }
    if (tree.heritage === true) {
      this.heritageContainer.addClass('active');
      this.heritageTreeNumber.text('#'+tree['heritageNumber']);
      this.heritageYearInscribed.text(tree['heritageYear']);
      if (tree['heritageText'] !== null) {
        this.heritageDescriptionContainer.addClass('active');
        this.heritageDescription.text(tree['heritageText']);
      } else {
        this.heritageDescriptionContainer.removeClass('active');
      }
    } else {
      this.heritageContainer.removeClass('active');
    }
  }

  Sidebar.prototype.showDefault = function() {
    this.errorScreen.hide();
    this.treeContainer.hide();
    this.vacantContainer.hide();
    this.defaultScreen.show();
    removeQueryStringFromUrlBar();
  }

  Sidebar.prototype.showError = function() {
    this.defaultScreen.hide();
    this.treeContainer.hide();
    this.vacantContainer.hide();
    this.errorScreen.show();
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

  function toggleFullMobileView() {
    let className = 'sidebar-mobile--fullscreen';
    if(this.body.classList.contains(className)) {
      this.body.removeClass(className);
      this.detailsButton.show();
      this.vacantDetailsButton.show();
      this.detailsButton.text("View Details");
      this.vacantDetailsButton.text("View Details");
      this.exploreMapButton.text("What is Public Tree Map?");
      this.address.addClass("sidebar-address-small")
    }
    else {
      this.body.addClass(className);
      this.detailsButton.hide();
      this.vacantDetailsButton.hide();
      this.exploreMapButton.text("Explore the Map");
      this.address.removeClass("sidebar-address-small")
    }
  }

  function startTouch(e){
      initialY = e.touches[0].clientX;
  }
  function onSwipe(e) {
    if (initialY === null) {
      return;
    }

    var currentY = e.touches[0].clientY;

    var diffY = initialY - currentY;


    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
      toggleFullMobileView();

    } else {
      // swiped down
      console.log("swiped down");
      closePanel();
    }


    initialY = null;
  }


  function closePanel() {
    let fullScreen = 'sidebar-mobile--fullscreen';
    let closed = 'sidebar-mobile--closed'
    if(this.body.classList.contains(fullScreen)) {
      (toggleFullMobileView.bind(this))();
    }
    else {
      this.body.addClass(closed);
      this.showDefault();

    }
  }

  function buildNativityText(nativity) {
    if ("native" === nativity.toLowerCase()) {
      return "This tree is native to California";
    } else if ("exotic" === nativity.toLowerCase()) {
      return "This tree isn't native to California";
    } else if ("moderate" === nativity.toLowerCase()) {
      return "This tree isn't native to California";
    } else if ("watch" === nativity.toLowerCase()) {
      return "This tree isn't native to California";
    } else if ("limited" === nativity.toLowerCase()) {
      return "This tree isn't native to California";
    } else {
      return "Unknown";
    }
  }

  function buildHeightText(min, max) {
    if (min === -1 && max === -1) {
      return "Unknown";
    }
    if (min === -1) {
      return "Up to " + max + ' feet'
    }
    if (max === -1) {
      return min + '+ feet';
    }
    return min + "-" + max + " feet";
  }

  function buildDiameterText(min, max) {
    if (min === -1) {
      return "Unknown";
    }
    if (min === -1) {
      return "Up to " + max + ' inches'
    }
    if (max === -1) {
      return min + '+ inches';
    }
    return min + "-" + max + " inches";
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
  this.image = $('#sidebar-image');
  this.imageCreditLink = $('#sidebar-image-credit-link');
  this.image.style.backgroundImage = 'url(' + images[index].url + ')';
  this.imageCreditLink.href = images[index].author.url;
}

function lastSlideImage(){
  if(indexOfImages==0){
    indexOfImages=2;
    currentSlide(indexOfImages);
  }else{
    indexOfImages-=1;
    currentSlide(indexOfImages);
  }
}
function nextSlideImage(){
  if(indexOfImages==2){
    indexOfImages=0;
    currentSlide(indexOfImages);
  }else{
    indexOfImages+=1;
    currentSlide(indexOfImages);
  }
}
