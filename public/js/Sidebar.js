var app = this.app || {};

(function(module) {

  var _image;

  function Sidebar() {
    _image = document.getElementById('sidebar-image');
  }

  Sidebar.prototype.setTree = function(tree) {
    console.log(tree);
  }

  // Exports
  module.Sidebar = Sidebar;

})(app);
