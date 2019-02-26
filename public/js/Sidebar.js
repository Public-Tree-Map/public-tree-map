var app = this.app || {};

(function(module) {

  function Sidebar() {
    this.defaultScreen          = document.getElementById('sidebar-default');
    this.treeContainer          = document.getElementById('sidebar-tree');
    this.image                  = document.getElementById('sidebar-image');
    this.commonName             = document.getElementById('sidebar-common-name');
    this.botanicalName          = document.getElementById('sidebar-botanical-name');
    this.nativity               = document.getElementById('sidebar-nativity');
    this.heightGroup            = document.getElementById('sidebar-height-group');
    this.shadeProduction        = document.getElementById('sidebar-shade-production');
    this.irrigationRequirements = document.getElementById('sidebar-irrigation-requirements');
    this.form                   = document.getElementById('sidebar-form');
    this.type                   = document.getElementById('sidebar-type');
    this.iucnStatus             = document.getElementById('sidebar-iucn-status');
    this.ipcRating              = document.getElementById('sidebar-ipc-rating');
    this.closeButton            = document.getElementById('sidebar-close-button');
  }

  Sidebar.prototype.setTree = function(tree) {
    if (!tree) {
      return this.showDefault();
    }

    this.treeContainer.classList.remove('hidden');
    this.defaultScreen.classList.add('hidden');

    this.commonName.innerText             = tree.name_common;
    this.botanicalName.innerText          = tree.name_botanical;
    this.nativity.innerText               = tree.nativity;
    this.heightGroup.innerText            = tree.height_group;
    this.shadeProduction.innerText        = tree.shade_production;
    this.irrigationRequirements.innerText = tree.irrigation_requirements;
    this.form.innerText                   = tree.form;
    this.type.innerText                   = tree.type;
    this.iucnStatus.innerText             = tree.iucn_status;
    this.ipcRating.innerText              = tree.ipc_rating;

    if (tree.images && tree.images.length > 0) {
      this.image.style.backgroundImage = 'url(' + tree.images[0] + ')';
      this.image.classList.remove('hidden');
    } else {
      this.image.style.backgroundImage = '';
      this.image.classList.add('hidden');
    }

    this.closeButton.onclick = this.showDefault.bind(this);
  }

  Sidebar.prototype.showDefault = function() {
    this.treeContainer.classList.add('hidden');
    this.defaultScreen.classList.remove('hidden');
  }

  // Exports
  module.Sidebar = Sidebar;

})(app);
