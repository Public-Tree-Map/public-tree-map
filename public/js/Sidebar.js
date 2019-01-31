var app = this.app || {};

(function(module) {

  function Sidebar() {
    this.image         = document.getElementById('sidebar-image');
    this.commonName    = document.getElementById('sidebar-common-name');
    this.botanicalName = document.getElementById('sidebar-botanical-name');
    this.nativity      = document.getElementById('sidebar-nativity');
    this.heightGroup   = document.getElementById('sidebar-height-group');
  }

  Sidebar.prototype.setTree = function(tree) {
    console.log(tree);

    this.commonName.innerText    = tree.name_common;
    this.botanicalName.innerText = tree.name_botanical;
    this.nativity.innerText      = tree.nativity;
    this.heightGroup.innerText   = tree.height_group;

    if (tree.images && tree.images.length > 0) {
      this.image.style.backgroundImage = 'url(' + tree.images[0] + ')';
      this.image.classList.remove('hidden');
    } else {
      this.image.style.backgroundImage = '';
      this.image.classList.add('hidden');
    }
  }

  // Exports
  module.Sidebar = Sidebar;

})(app);
