const base = require('./webpack.config.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const merge = require('webpack-merge');
const smp = new SpeedMeasurePlugin();
var path = require('path');

module.exports = smp.wrap(merge(base, {
    devtool: 'eval-source-map',
    mode: 'development',
    module: {
        // rules: [
        //     {
        //         enforce: 'pre',
        //         test: /\.(jsx|\.js|\.tsx)$/,
        //         use: [
        //             // { loader: 'thread-loader' },
        //             { loader: 'eslint-loader',
        //                 options: {
        //                     // cache: true,
        //                     emitError: true,
        //                     emitWarning: true
        //                 }
        //             }
        //         ],
        //         exclude: /node_modules/
        //     }
        // ]
    },
    devServer: {
        contentBase: path.resolve('src/assets'),
        inline: true,
        hot: true,
        port: 8081,
        stats: 'errors-only'
    }
}));
