//  webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'none',
    entry: __dirname + '/src/main.jsx', // 已多次提及的唯一入口文件
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            header: path.resolve(__dirname, './src/controller/header'),
            footer: path.resolve(__dirname, './src/controller/footer'),
            citySelector: path.resolve(__dirname, './src/common/citySelector'),
            datePicker: path.resolve(__dirname, './src/common/datePicker')
        }
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'sass-loader' // compiles Sass to CSS
            }]
        },
        {
            test: /\.(png|jpg|gif|eot|woff|woff2|svg|ttf)$/,
            use: [
                'file-loader'
            ]
        }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.tmpl.html' // new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(), //  为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        // new webpack.optimize.UglifyJsPlugin(), //  压缩JS代码
        new ExtractTextPlugin('style.css'),
        new UglifyJSPlugin()
    ]
};
