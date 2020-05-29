const base = require('./webpack.config.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const merge = require('webpack-merge');
const smp = new SpeedMeasurePlugin();
var path = require('path');
var fs = require('fs');

module.exports = smp.wrap(merge(base, {
    // devtool: 'eval-source-map',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(jsx|\.js|\.tsx)$/,
                loader: 'eslint-loader',
                options: {
                    // cache: true, // todo
                    emitError: true,
                    emitWarning: true
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin()
    ],
    devServer: {
        https: true,
        contentBase: '../build',
        historyApiFallback: true,
        key: fs.readFileSync('/usr/local/etc/openssl/cert.key'),
        cert: fs.readFileSync('/usr/local/etc/openssl/cert.crt'),
        // inline: true,
        // hot: true,
        // host: '10.32.84.16',
        port: 8081
    }
}));
