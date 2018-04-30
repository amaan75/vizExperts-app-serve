const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production"; //true or false
const cssDev = ["style-loader", "css-loader", "sass-loader"];

const extractSass = new ExtractTextPlugin({
  filename: "app.css",
  disable: !isProd,
  allChunks: true
});

const cssProd = extractSass.extract({
  use: [
    {
      loader: "css-loader"
    },
    {
      loader: "sass-loader"
    }
  ],
  // use style-loader in development
  fallback: "style-loader"
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: "./src/index.js"
    // contact: "./src/contact.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: cssConfig
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: __dirname + "/dist",
    compress: true,
    port: 9000,
    hot: true,
    stats: "errors-only",
    open: true,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "VizExperts Experiment",
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      //excludeChunks: ["contact"],
      template: "./src/index.html" // Load a custom template (lodash by default see the FAQ for details)
    }),
    // new HtmlWebpackPlugin({
    //   title: "Project",
    //   hash: true,
    //   filename: "contact.html",
    //   chunks: ["contact"],
    //   template: "./src/contact.html"
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    extractSass
  ]
};
