const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(`${__dirname}/../../src/index.js`)
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(`${__dirname}/../../build`)
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false
    }
  },
  resolve: {
    alias: {
      "~": path.resolve(`${__dirname}/../../src`)
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(`${__dirname}/../../public`),
        to: "public"
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(`${__dirname}/../../src/index.html`)
    })
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(woff|woff2|webp)$/,
        use: [
          "cache-loader",
          {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        ],
        include: path.resolve(`${__dirname}/../../src`)
      },
      {
        test: /\.(woff?2|webp|svg|png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  }
};
