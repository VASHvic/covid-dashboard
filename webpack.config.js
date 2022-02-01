const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    dashboard: './src/dashboard.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // entry: './src/index.js',
  // output: {
  //   filename: 'index.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html', chunks: ['index']}),
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      template: 'src/dashboard.html',
      chunks: ['dashboard'],
    }),
  ],
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
