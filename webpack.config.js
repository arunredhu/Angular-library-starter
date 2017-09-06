var webpack = require('webpack');
var path = require('path');

var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var getPath = function (pathToFile) { return path.resolve(__dirname, pathToFile); }

module.exports = {

    entry: getPath('./src/core-ui.module.ts'),

    output: {
        path: getPath('./dist/bundles/'),
        filename: 'bundle.umd.js',
        publicPath: '/',
        library: 'MyLibrary',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    "to-string-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|png)/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },

    resolve: {
        extensions: ['*', '.ts', '.js', '.html']
    },

    plugins: [
        new ProgressPlugin()
    ],

    externals: [/^@angular\//, /^rxjs/]
}

