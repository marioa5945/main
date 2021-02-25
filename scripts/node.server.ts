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

app.get('*', function (req: any, res: unknown, next: any) {
  req.url = req.url.replace(/^\/home\//, '/');
  next();
});

app.use(express.static('public')); // static

app.use(
  createProxyMiddleware('/blog/api/', {
    target: 'http://localhost:8080/',
    pathRewrite: {
      '^/blog/api/': '/api/', // rewrite path
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
app.listen(port, function () {
  serverPrint(port);
});
