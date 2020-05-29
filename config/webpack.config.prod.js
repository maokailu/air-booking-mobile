//  webpack.production.config.js
const ExtractCssPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const base = require('./webpack.config.js');
const merge = require('webpack-merge');
const smp = new SpeedMeasurePlugin();
var path = require('path');

module.exports = smp.wrap(merge(base, {
    devtool: 'none',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js' // 更新长缓存
    },
    plugins: [
        new ExtractCssPlugin(),
        new TerserPlugin({
            cache: true
        })
    ]
}));

