var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    context: __dirname + "/js",
    entry: {
        admin: "./index.js"
    },
    output: {
        path: __dirname + '/assets/',
        filename: "[name].js"
    },
    devtool: "eval-source-map",
    resolve: {
        root: path.resolve(__dirname),
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                plugins: ['transform-decorators-legacy' ],
                presets: ["es2015", 'stage-0', "react"]
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.scss$/,
            loaders: [
                'style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'resolve-url',
                'sass?sourceMap'
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|mp3)$/,
            loader: 'file-loader?name=images/[name].[ext]'
        }, {
            test: /\.svg$/,
            loader: 'svg-inline'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        },  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?/, loader: "file-loader" }
        ]
    },
    plugins: ["syntax-object-rest-spread",
        "transform-runtime",
        "transform-decorators-legacy"
    ],
    resolveUrlLoader: {
        absolute: '/'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};

if (process.env.NODE_ENV === 'development') {
    config.debug = true;
    config.devtool = 'source-map';
    config.output.pathinfo = true;
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {warnings: false}
    }));
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = config;
