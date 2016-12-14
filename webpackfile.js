
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lodash = require('lodash');

const cdnConfig = require('./config/cdn.json');

let config = {
    entry: {
        'app': './src/main.ts',
        'vendors': './src/vendor.ts',
        'polyfills': './src/polyfills.ts'
    },

    output: {
        path: root('public'),
        filename: '[name]-[chunkhash].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        publicPath: process.env.APP_BASE_HREF
    },

    resolve: {
        alias: {
            'src': root('src')
        },
        extensions: [
            '.ts', '.js', '.json', '.css', '.scss', '.html',
            '.async.ts', '.async.js', '.async.json'
        ]
    },

    externals: lodash.reduce(cdnConfig, function(hash, value) {
        hash[value.name] = value.global;
        return hash;
    }, {}),

    node: {
        "fs": "empty"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.ts/,
                loader: ['awesome-typescript-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css!sass'
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'polyfills'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: false,
            assets: {
                scripts: lodash.map(cdnConfig, 'url'),
                sheets: [
                    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css'
                ]
            },

            title: 'IT Suite',
            baseHref:  '/client/public/'
        }),

        new ExtractTextPlugin('[name]-[contenthash].css')
    ]
};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

module.exports = config;