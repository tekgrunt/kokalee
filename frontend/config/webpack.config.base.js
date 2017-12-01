const helpers = require('./helpers'),
  NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: {
    'main': helpers.root('/src/main.ts')
  },
  output: {
    path: helpers.root('/dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html', '.vue', '.tsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }, {
      test: /\.tsx$/,
      exclude: /node_modules/,
      loader: 'vue-ts-loader'
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: ['./src/index.html']
    }],
  },
  plugins: [
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: './assets'
    }, ]),
  ]
};

module.exports = config;
