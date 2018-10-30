const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./client/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
          presets: ["@babel/preset-react", "@babel/preset-env"] 
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "server/static/js/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  }
};
