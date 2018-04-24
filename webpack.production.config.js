//  webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'none',
    entry: __dirname + '/src/main.jsx', // 已多次提及的唯一入口文件
    output: {
        path: __dirname + '/build',
        filename: 'bundle-[hash].js'
    },
    devServer: {
        contentBase: './build', // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
            })
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
        new webpack.optimize.UglifyJsPlugin(), //  压缩JS代码
        new ExtractTextPlugin('style.css') //  分离CSS和JS文件
    ]
};
