var app = this.app || {};

(function(module) {

  var _image;

  function Sidebar() {
    _image = document.getElementById('sidebar-image');
  }

  Sidebar.prototype.setTree = function(tree) {
    console.log(tree);
    if (tree.images && tree.images.length > 0) {
      _image.style.backgroundImage = 'url(' + tree.images[0] + ')';
      _image.classList.remove('hidden');
    } else {
      _image.style.backgroundImage = '';
      _image.classList.add('hidden');
    }
  }

  // Exports
  module.Sidebar = Sidebar;

})(app);
