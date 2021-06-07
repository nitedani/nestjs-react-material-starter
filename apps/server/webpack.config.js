const WebpackMessages = require('webpack-messages');
module.exports = {
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new WebpackMessages({
      name: 'server',
      logger: (str) => console.log(`>> ${str}`),
    }),
  ],
};
