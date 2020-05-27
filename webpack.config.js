const path = require("path");
const HttpWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ["./src/js/index.js"],
  // entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HttpWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
