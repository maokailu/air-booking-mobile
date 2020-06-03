const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        home: 'main.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(scss|.css)$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|woff|woff2|svg|ttf)$/,
                loader: 'file-loader',
                include: path.resolve('src/assets')
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
            },
            {
                test: /\.(jsx|\.js|\.tsx)$/,
                use: [
                    'thread-loader',
                    'babel-loader?cacheDirectory'
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/index.tmpl.html')
        })

        // new BundleAnalyzerPlugin({
        //     analyzerPort: 8083
        // })
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
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        modules: [path.resolve('src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', 'ts', 'tsx'],
        alias: {
            lib: path.resolve('src/lib')
        }
    }
};
