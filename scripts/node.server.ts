import express from 'express';
import tomlJson from 'toml-json';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.server';
import serverPrint from 'server-print';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const compiler = webpack(webpackConfig);
const config = tomlJson({ fileUrl: './config.toml' });

app.get('*', (req, res, next) => {
  req.url = req.url.replace(/^\/main\//, '/');
  next();
});

app.use(express.static('public')); // static

// Blog
app.use(
  createProxyMiddleware('/blog/', {
    target: 'http://localhost:9004/',
    pathRewrite: {
      '^/blog/': '/', // rewrite path
    },
    changeOrigin: true,
  })
);

// Package Library
app.use(
  createProxyMiddleware('/package-library/', {
    target: 'http://localhost:9005/',
    pathRewrite: {
      '^/package-library/': '/', // rewrite path
    },
    changeOrigin: true,
  })
);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: (webpackConfig.output as any).publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

const port = (config.server as any).port;
app.listen(port, () => {
  serverPrint({ port, copyType: 'localhost' });
});
