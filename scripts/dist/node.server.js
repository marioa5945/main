"use strict";
exports.__esModule = true;
var express_1 = require("express");
var toml_json_1 = require("toml-json");
var webpack_1 = require("webpack");
var webpack_dev_middleware_1 = require("webpack-dev-middleware");
var webpack_hot_middleware_1 = require("webpack-hot-middleware");
var webpack_server_1 = require("./webpack.server");
var server_print_1 = require("server-print");
var http_proxy_middleware_1 = require("http-proxy-middleware");
var app = express_1["default"]();
var compiler = webpack_1["default"](webpack_server_1["default"]);
var config = toml_json_1["default"]({ fileUrl: './config.toml' });
app.get('*', function (req, res, next) {
    req.url = req.url.replace(/^\/main\//, '/');
    next();
});
app.use(express_1["default"].static('public')); // static
// Blog
app.use(http_proxy_middleware_1.createProxyMiddleware('/blog/', {
    target: 'http://localhost:9004/',
    pathRewrite: {
        '^/blog/': '/'
    },
    changeOrigin: true
}));
// Package Library
app.use(http_proxy_middleware_1.createProxyMiddleware('/package-library/', {
    target: 'http://localhost:9005/',
    pathRewrite: {
        '^/package-library/': '/'
    },
    changeOrigin: true
}));
// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(webpack_dev_middleware_1["default"](compiler, {
    publicPath: webpack_server_1["default"].output.publicPath
}));
app.use(webpack_hot_middleware_1["default"](compiler));
var port = config.server.port;
app.listen(port, function () {
    server_print_1["default"]({ port: port, copyType: 'localhost' });
});
