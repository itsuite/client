const lodash = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AureliaPlugin = require('aurelia-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const project = require('./package.json');
const cdnConfig = require('./config/cdn');
const envConfig = require('./build-tools/env-config');

const title = 'IT Suite';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('public');

const aureliaBootstrap = [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal-browser',
    'regenerator-runtime',
];

const aureliaModules = Object.keys(project.dependencies).filter(dep => dep.startsWith('aurelia-'));

let config = {
    entry: {
        'app': ['./src/main', './styles/app.scss', './styles/vendor.scss'], // filled by aurelia-webpack-plugin
        'aurelia-bootstrap': aureliaBootstrap,
        'aurelia-modules': aureliaModules
    },

    output: {
        path: outDir,
        filename: '[name]-[chunkhash].js',
        sourceMapFilename: '[name]-[chunkhash].map',
        publicPath: process.env.APP_BASE_HREF
    },

    resolve: {
        alias: {
            'src': srcDir
        },
        extensions: [
            '.ts', '.js', '.json', '.css', '.scss', '.html',
            '.async.ts', '.async.js', '.async.json'
        ]
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
                use: 'raw-loader'
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
                                sourceMap: true
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

            title: 'IT Suite'
        }),

        new AureliaPlugin({
            root: rootDir,
            src: srcDir,
            title: title,
            baseUrl: baseUrl
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