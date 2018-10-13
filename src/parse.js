const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.resolve(__dirname, '../trees.csv'));
const fileContents = file.toString().split('\n');
const headers = fileContents[0].split(',');

let output = { allTrees: [] };

fileContents.slice(1).forEach((tree, index) => {
  if (index % 3 === 0) return;
  treeObj = {};
  tree = tree.split(/(?<!\"\(\d+\.\d+),/);
  for (index in headers) {
    treeObj[`${headers[index].toLowerCase()}`] = tree[index];
  }
  // if(!treeObj.latitude && !treeObj.Longitude) return;
  output.allTrees.push(treeObj);
});

fs.writeFileSync('./src/data.json', JSON.stringify(output));
