var app = this.app || {};

(function(module) {

  function Sidebar() {
    this.defaultScreen          = document.getElementById('sidebar-default');
    this.treeContainer          = document.getElementById('sidebar-tree');
    this.errorScreen            = document.getElementById('sidebar-error');
    this.image                  = document.getElementById('sidebar-image');
    this.commonName             = document.getElementById('sidebar-common-name');
    this.botanicalName          = document.getElementById('sidebar-botanical-name');
    this.treeId                 = document.getElementById('sidebar-tree-id');
    this.nativity               = document.getElementById('sidebar-nativity');
    this.height                 = document.getElementById('sidebar-height');
    this.diameter               = document.getElementById('sidebar-diameter');
    this.shadeProduction        = document.getElementById('sidebar-shade-production');
    this.irrigationRequirements = document.getElementById('sidebar-irrigation-requirements');
    this.type                   = document.getElementById('sidebar-type');
    this.iucnStatus             = document.getElementById('sidebar-iucn-status');
    this.ipcRating              = document.getElementById('sidebar-ipc-rating');
    this.treeFamily             = document.getElementById('sidebar-tree-family');
    this.treeFamilyCommon       = document.getElementById('sidebar-tree-family-common');
    this.pruningYear            = document.getElementById('sidebar-pruning-year');
    this.pruningZone            = document.getElementById('sidebar-pruning-zone');
    this.replacementSpecies     = document.getElementById('sidebar-replacement-species');
    this.address                = document.getElementById('sidebar-address');
    this.streetSegment          = document.getElementById('sidebar-street-segment');
    this.closeButton            = document.getElementById('sidebar-close-button');

    // Vacant panel elements
    this.vacantContainer          = document.getElementById('sidebar-vacant');
    this.vacantCommonName         = document.getElementById('sidebar-vacant-common-name');
    this.vacantTreeId             = document.getElementById('sidebar-vacant-tree-id');
    this.vacantAddress            = document.getElementById('sidebar-vacant-address');
    this.vacantPruningYear      = document.getElementById('sidebar-vacant-pruning-year');
    this.vacantReplacementSpecies = document.getElementById('sidebar-vacant-replacement-species');
    this.vacantStreetSegment      = document.getElementById('sidebar-vacant-street-segment');
    this.vacantCloseButton            = document.getElementById('sidebar-vacant-close-button');

    this.closeButton.onclick = this.showDefault.bind(this);
    this.vacantCloseButton.onclick = this.showDefault.bind(this);
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
    }
  }

  Sidebar.prototype.populateVacanciesPanel = function(tree) {
    this.vacantCommonName.innerText         = tree.name_common;
    this.vacantTreeId.innerText             = tree.tree_id;
    this.vacantAddress.innerText            = tree.address;
    this.vacantPruningYear.innerText        = tree.pruning_year;
    this.vacantReplacementSpecies.innerText = tree.replacement_species;
    this.vacantStreetSegment.innerText      = tree.segment;
  }

  Sidebar.prototype.populateTreePanel = function(tree) {
    this.commonName.innerText             = tree.name_common;
    this.botanicalName.innerText          = tree.name_botanical;
    this.treeId.innerText                 = tree.tree_id;
    this.nativity.innerText               = buildNativityText(tree.nativity);
    this.height.innerText                 = buildHeightText(tree.height_min_ft, tree.height_max_ft);
    this.diameter.innerText               = buildDiameterText(tree.diameter_min_in, tree.diameter_max_in);
    this.shadeProduction.innerText        = tree.shade_production;
    this.irrigationRequirements.innerText = tree.irrigation_requirements;
    this.type.innerText                   = tree.type;
    this.iucnStatus.innerText             = tree.iucn_status;
    this.ipcRating.innerText              = tree.ipc_rating;
    this.treeFamily.innerHTML             = `${tree.family_name_common} (<em>${tree.family_name_botanical}</em>)`;
    this.pruningYear.innerText            = tree.pruning_year;
    this.pruningZone.innerText            = tree.pruning_zone;
    this.replacementSpecies.innerHTML     = `<em>${tree.replacement_species}</em>`;
    this.address.innerText                = tree.address;
    this.streetSegment.innerText          = tree.segment;

    if (tree.images && tree.images.length > 0) {
      this.image.style.backgroundImage = 'url(' + tree.images[0].url + ')';
      this.image.classList.remove('hidden');
    } else {
      this.image.style.backgroundImage = '';
      this.image.classList.add('hidden');
    }
  }

  Sidebar.prototype.showDefault = function() {
    this.errorScreen.classList.add('hidden');
    this.treeContainer.classList.add('hidden');
    this.vacantContainer.classList.add('hidden');
    this.defaultScreen.classList.remove('hidden');
  }

  Sidebar.prototype.showError = function() {
    this.defaultScreen.classList.add('hidden');
    this.treeContainer.classList.add('hidden');
	this.vacantContainer.classList.add('hidden');
    this.errorScreen.classList.remove('hidden');
  }
  function buildNativityText(nativity) {
    if ("native" === nativity.toLowerCase()) {
      return "This tree is native to California";
    } else if ("exotic" === nativity.toLowerCase()) {
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

  // Exports
  module.Sidebar = Sidebar;

})(app);
