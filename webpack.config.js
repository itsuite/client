const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./aurelia_project/aurelia.json');
const cdnConfig = require('./aurelia_project/cdn.json');
const {AureliaPlugin, ModuleDependenciesPlugin} = require('aurelia-webpack-plugin');
const {optimize: {CommonsChunkPlugin}, ProvidePlugin} = require('webpack');
const {TsConfigPathsPlugin, CheckerPlugin} = require('awesome-typescript-loader');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
    condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const title = 'Rainflow';
const outDir = path.resolve(__dirname, project.platform.output);
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
    {loader: 'css-loader'},
];

module.exports = ({environment, server, extractCss, coverage} = {}) => ({
    resolve: {
        alias: {
            'src': srcDir
        },
        extensions: ['.ts', '.js'],
        modules: [srcDir, 'node_modules'],
    },
    entry: {
        app: ['aurelia-bootstrapper'],
        vendor: ['bluebird'],
    },
    output: {
        path: outDir,
        publicPath: baseUrl,
        filename: environment === 'prod' ? '[name].[chunkhash].extractcss.js' : '[name].[hash].bundle.js',
        sourceMapFilename: environment === 'prod' ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
        chunkFilename: environment === 'prod' ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js'
    },
    devServer: {
        contentBase: outDir,
        // serve index.html for all 404 (required for push-state)
        historyApiFallback: true
    },
    module: {
        rules: [
            // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
            // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
            {
                test: /\.css$/i,
                issuer: [{not: [{test: /\.html$/i}]}],
                use: extractCss ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssRules
                }) : ['style-loader', ...cssRules],
            },
            {
                test: /\.css$/i,
                issuer: [{test: /\.html$/i}],
                // CSS required in templates cannot be extracted safely
                // because Aurelia would try to require it again in runtime
                use: cssRules
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                issuer: /\.[tj]s$/i
            },
            {
                test: /\.scss$/,
                use: [
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                nodeModulesDir
                            ]
                        }
                    }
                ],
                issuer: /\.html?$/i
            },
            {test: /\.html$/i, loader: 'html-loader'},
            {test: /\.ts$/i, loader: 'awesome-typescript-loader', exclude: nodeModulesDir},
            {test: /\.json$/i, loader: 'json-loader'},
            // use Bluebird as the global Promise implementation:
            {test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise'},
            // embed small images and fonts as Data Urls and larger ones as files:
            {test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: {limit: 8192}},
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: {limit: 10000, mimetype: 'application/font-woff2'}
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: {limit: 10000, mimetype: 'application/font-woff'}
            },
            // load these fonts normally, as files:
            {test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader'},
            ...when(coverage, {
                test: /\.[jt]s$/i, loader: 'istanbul-instrumenter-loader',
                include: srcDir, exclude: [/\.{spec,test}\.[jt]s$/i],
                enforce: 'post', options: {esModules: true},
            })
        ]
    },
    plugins: [
        new AureliaPlugin(),
        new ProvidePlugin({
            'Promise': 'bluebird'
        }),
        new ModuleDependenciesPlugin({
            'aurelia-testing': ['./compile-spy', './view-spy']
        }),
        new TsConfigPathsPlugin(),
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            metadata: {
                title: title,
                server: server,
                baseUrl: baseUrl,
                scripts: cdnConfig.scripts,
                sheets: cdnConfig.sheets
            }
        }),
        ...when(extractCss, new ExtractTextPlugin({
            filename: environment === 'prod' ? '[contenthash].css' : '[id].css',
            allChunks: true
        })),
        ...when(environment === 'prod', new CommonsChunkPlugin({
            name: ['common']
        })),
        ...when(environment === 'prod', new CopyWebpackPlugin([
            {from: 'static/favicon.ico', to: 'favicon.ico'}
        ]))
    ],
    devtool: 'eval-source-map'
});
