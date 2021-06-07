const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackMessages = require('webpack-messages');
const { join } = require('path');
const { cwd } = require('process');

module.exports = {
  mode: 'production',
  entry: [join(cwd(), 'src', 'webapp', 'src', 'index.tsx')],
  output: {
    path: join(cwd(), 'dist', 'webapp'),
    filename: '[name].[fullhash].js',
    publicPath: '/',
  },
  stats: 'errors-only',
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  watchOptions: {
    ignored: '/node_modules/',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new WebpackMessages({
      name: 'client',
      logger: (str) => console.log(`>> ${str}`),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(cwd(), 'src', 'webapp', 'public'),
          to: './',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: join(cwd(), 'src', 'webapp', 'public', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
