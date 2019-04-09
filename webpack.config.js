const path = require("path");

module.exports = {
  entry: path.join(__dirname, "/client/src/index.jsx"),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css/,
        loader:
          "style-loader!css-loader?modules=true&localIdentName=[name]__[local]__[hash:base64:5]",
        include: path.join(__dirname, "/client/src")
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/client/dist")
  }
};
