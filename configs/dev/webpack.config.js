var path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js"
  },
  devServer: {
    inline: true,
    lazy: true,
    hot: true
  }
};
