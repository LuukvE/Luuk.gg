const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const env = process.env.NODE_ENV || 'production';

const baseConfig = {
  devServer: {
    contentBase: path.resolve('./dist'),
    historyApiFallback: true,
    port: 8567,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: './public' }]),
    new HtmlWebpackPlugin({ template: 'public/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          // the following modules contain un-transpiled es6 code
          path.resolve(__dirname, 'node_modules/regexpu-core'),
          path.resolve(__dirname, 'node_modules/unicode-match-property'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

if (env === 'production') {
  baseConfig.plugins.push(new OfflinePlugin());
  baseConfig.optimization = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        grommet: {
          test: /[\\/]node_modules[\\/]grommet/,
          name: 'grommet',
          priority: -10,
        },
      },
    },
  };
} else {
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = baseConfig;
