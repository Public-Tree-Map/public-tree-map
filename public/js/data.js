var app = this.app || {};

(function(module) {
  const DATA_URL = "https://storage.googleapis.com/public-tree-map/trees.json";
  fetch(DATA_URL).then(response => {
    response.json().then(data => app.setData(data));
  });
}
})(app);
