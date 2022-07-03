import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const devMode = process.env.NODE_ENV !== 'production';

export default {
  mode: 'development',
  entry: ['./src/app.tsx'],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@src': resolve('./src'),
      '@components': resolve('./src/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      publicPath: '/main/',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
    new ModuleFederationPlugin({
      name: 'nebulaDrawer',
      filename: 'my/js/nebula-drawer.js',
      remotes: {
        blog: `blog@${process.env.NODE_ENV === 'blog' ? 'http://localhost:9003' : '/blog'}/js/remoteEntry.js`,
        packageLibrary: `packageLibrary@${process.env.NODE_ENV === 'package' ? 'http://localhost:9004' : '/packageLibrary'}/js/remoteEntry.js`,
      },
    }),
  ],
  output: {
    filename: devMode ? 'js/[name].bundle.js' : 'js/[name].[contenthash].bundle.js',
    path: resolve('.', 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          devMode
            ? {
                loader: 'style-loader',
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/main/',
                },
              },
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (devMode) {
                  return 'img/[path][name].[ext]';
                }
                return 'img/[contenthash].[ext]';
              },
              limit: false,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  externals: {},
} as Configuration;
