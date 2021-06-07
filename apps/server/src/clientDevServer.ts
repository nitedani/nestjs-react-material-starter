import * as express from 'express';
import { HotModuleReplacementPlugin, webpack } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as defaultConfig from '../../webapp/webpack.config.js';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import { WebpackOpenBrowser } from 'webpack-open-browser';

export default function clientDevServer(
  app: express.Application,
  port: string | number,
) {
  const webpackCompiler = webpack({
    ...defaultConfig,
    mode: 'development',
    entry: [
      ...defaultConfig.entry,
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
    output: {
      ...defaultConfig.output,
      hotUpdateChunkFilename: '.hot/hot-update.js',
      hotUpdateMainFilename: '.hot/hot-update.json',
    },
    plugins: [
      ...defaultConfig.plugins,
      new BundleAnalyzerPlugin(),
      new HotModuleReplacementPlugin(),
      new WebpackOpenBrowser({ url: `http://localhost:${port}` }),
    ],
  });

  app.use(
    webpackDevMiddleware(webpackCompiler, {
      writeToDisk: true,
      publicPath: '/',
    }),
  );
  app.use(webpackHotMiddleware(webpackCompiler));
}
