const lodash = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cdnConfig = require('./config/cdn');
const envConfig = require('./build-tools/env-config');

const baseUrl = '/';
const srcDir = path.resolve('src');
const outDir = path.resolve('public');

let config = {
    entry: {
        "main": "aurelia-bootstrapper"
    },

    output: {
        path: outDir,
        filename: '[name]-[hash].js',
        sourceMapFilename: '[name]-[hash].map',
        publicPath: ''
    },

    resolve: {
        alias: {
            'src': srcDir
        },
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
        modules: ["src", "node_modules"]
    },

    devServer: {
        contentBase: outDir,
        historyApiFallback: {
            index: outDir + '/index.html'
        }
    },

    externals: lodash.reduce(cdnConfig.scripts, function(hash, value) {
        hash[value.name] = value.global;
        return hash;
    }, {}),

    node: {
        "fs": "empty"
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.ts/,
                use: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    return [
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                // without sourcemaps resolve-url-loader fails for some reason
                                // this is mandatory for now
                                sourceMap: true,
                                includePaths: [
                                    path.resolve('node_modules')
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                use: 'url-loader?limit=1024'
            },
            {
                test: /\.ejs/,
                use: 'ejs-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            regeneratorRuntime: 'regenerator-runtime',
            Promise: 'bluebird'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['aurelia-modules', 'aurelia-bootstrap'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: false,
            assets: {
                scripts: lodash.map(cdnConfig.scripts, 'url'),
                sheets: lodash.map(cdnConfig.sheets, 'url')
            },

            title: 'IT Suite',
            baseHref: baseUrl
        }),

        new AureliaPlugin({
            includeAll: 'src',
            aureliaApp: 'main'
        }),

        new ExtractTextPlugin({
            filename: '[name]-[contenthash].css'
        })
    ],
    devtool: envConfig.devtool || 'eval-source-map'
};

if (envConfig.minify) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }));

    config.plugins.push(new OptimizeCssAssetsPlugin());
}

module.exports = config;