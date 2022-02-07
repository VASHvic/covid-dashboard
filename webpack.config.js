const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/ui/index.js',
    dashboard: './src/js/ui/dashboard.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({template: 'src/html/index.html', chunks: ['index']}),
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      template: 'src/html/dashboard.html',
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
