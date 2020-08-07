const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const base = require('./webpack.config.js');
const merge = require('webpack-merge');
const smp = new SpeedMeasurePlugin();
var path = require('path');

const glob = require('glob');
const PATHS = {
    src: path.join(__dirname, 'src')
};

module.exports = smp.wrap(merge(base, {
    devtool: 'none',
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: '[name].[contenthash].js' // 更新长缓存
    },
    plugins: [
        new MiniCssPlugin(),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true })
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8083
        })
    ]
}));

