const webpack = require('webpack');
const [webpackClienConfig, webpackServerConfig] = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClienConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClienConfig.output.publicPath,
    serverSideRender: true,
    noInfo: true,
    watchOptions: {
        ignore: /dist/,
    },
    writeToDisk: true,
    stats: 'errors-only',
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
    console.log('HMR сервер успешно запущен');
});

const compiler = webpack(webpackServerConfig);


compiler.run((err) => {
    if(err) {
        console.log('Компиляция неудачна:', err);
    }

    compiler.watch({}, (err) => {
        if(err) {
            console.log('Компиляция неудачна:', err);
        }
        console.log('Компиляция прошла успешно');
    });

    nodemon({
        script: path.resolve(__dirname, '../dist/server/server.js'),
        watch: [
            path.resolve(__dirname, '../dist/server'),
            path.resolve(__dirname, '../dist/client'),
        ]
    })
});