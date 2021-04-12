const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const CSSModuleLoader = {
   loader: 'css-loader',
   options: {
   modules: true,
   localIdentName: '[name]_[local]_[hash:base64:5]',
   importLoaders: 2,
   sourceMap: false, // turned off as causes delay
  }
}

// For our normal CSS files we would like them globally scoped
const CSSLoader = {
  loader: 'css-loader',
   options: {
   modules: "global",
   importLoaders: 2,
   sourceMap: false, // turned off as causes delay
  }
}
// Our PostCSSLoader
const autoprefixer = require('autoprefixer')
const PostCSSLoader = {
   loader: 'postcss-loader',
   options: {
     ident: 'postcss',
     sourceMap: false, // turned off as causes delay
     plugins: () => [
       autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
       })
     ]
   }
}
// Standard style loader (prod and dev covered here)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
    test: /\.(sa|sc|c)ss$/,
    exclude: /\.module\.(sa|sc|c)ss$/,
    use: [styleLoader, CSSLoader, PostCSSLoader]
   },
   {
    test: /\.module\.(sa|sc|c)ss$/,
    use: [styleLoader, CSSModuleLoader, PostCSSLoader]
   },
   {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.htm",
      filename: "index.htm"
    })
  ],
  output: {
    filename: 'oyster-card.bundle.js',
    publicPath: './',
  },
};
