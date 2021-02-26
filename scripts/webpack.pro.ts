import webpack from 'webpack';
import config from './webpack.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

delete config.devtool;
config.mode = 'production';
(config.output as any).filename = 'js/[name].[contenthash].bundle.js';
(config.output as any).publicPath = '/main/';
(config.module as any).rules.push({
  test: /\.(ts|tsx)$/,
  exclude: /node-modules/,
  use: ['babel-loader'],
});
(config.plugins as any).push(
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new CopyPlugin({
    patterns: [
      {
        from: './public',
        to: './',
      },
    ],
  }),
  new webpack.DefinePlugin({
    remoteBlog: '"https://marioa5945.github.io/blog/js/remoteEntry.js"',
    remotePackageLibrary: '"https://marioa5945.github.io/package-library/js/remoteEntry.js"',
  })
);

export default { ...config };
