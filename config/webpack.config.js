const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require('path');
const { IS_PRODUCTION } = require('./config');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        home: 'main.jsx',
        list: 'controller/list/first.jsx',
        detail: 'controller/detail/index.jsx',
        book: 'controller/book/index.jsx'
    },
    // stats: {
    //     performance: true,
    //     chunks: true,
    // },
    module: {
        rules: [
            {
                test: /\.(jsx|\.js|\.tsx)$/,
                loader: IS_PRODUCTION ? 'babel-loader' : 'babel-loader?cacheDirectory',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|.css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|woff|woff2|svg|ttf)$/,
                loader: 'file-loader'
            }, {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.tmpl.html')
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8083
        })

    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                common: {
                    name: 'common/pages-common',
                    chunks: 'all',
                    minChunks: 2,
                    priority: 0
                },
                styles: {
                    name: 'style',
                    test: /\.s?css/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    externals: [ // todo
        // {
        //     'react': true,
        //     'react-dom': true
        // },
        // 'react',
        // 'react-dom',
        // 'swiper'
    ],
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', 'ts', 'tsx'],
        alias: {
            header: path.resolve(__dirname, '../src/controller/header'),
            footer: path.resolve(__dirname, '../src/controller/footer'),
            citySelector: path.resolve(__dirname, '../src/common/citySelector'),
            datePicker: path.resolve(__dirname, '../src/common/datePicker')
        }
    }
};
