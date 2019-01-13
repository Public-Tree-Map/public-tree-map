var app = this.app || {};

(function(module) {

  var _image;

  function Sidebar() {
    _image = document.getElementById('sidebar-image');
  }

  Sidebar.prototype.setTree = function(tree) {
    console.log(tree);
    if (tree.images && tree.images.length > 0) {
      _image.src = tree.images[0];
    } else {
      _image.src = '';
    }
  }

  // Exports
  module.Sidebar = Sidebar;

})(app);
