import webpack from 'webpack';
import config from './webpack.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

delete config.devtool;
config.mode = 'production';
(config.output as any).filename = 'js/[name].[contenthash].bundle.js';
(config.output as any).publicPath = '/home/';
(config.module as any).rules.push({
  test: /\.(ts|tsx)$/,
  exclude: /node-modules/,
  use: ['babel-loader'],
});
(config.plugins as any).push(new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }));
(config.plugins as any).push(
  new CopyPlugin({
    patterns: [
      {
        from: './public',
        to: './',
      },
    ],
  }),
  new webpack.DefinePlugin({
    remoteServer: '"https://marioa5945.github.io/"',
  })
);

export default { ...config };
