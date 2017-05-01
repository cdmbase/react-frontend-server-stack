var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeExternals = require('cdm-webpack-node-externals');
var Visualizer = require("webpack-visualizer-plugin");
var libPath = require('../../src/webpack-util');

var webpack_opts = {
    entry: './src/index.tsx',
    target: 'node',
    output: {
        filename: libPath('index.js'),
        library: '@redux-bootstrap/react-common',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
            'node_modules',
            'src',
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                test: /\.tsx?$/,
                ts: {
                    compiler: 'typescript',
                    configFileName: 'tsconfig.json'
                },
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }),
        new Visualizer({
            filename: './lib/statistics.html'
        })
    ],
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loaders: 'ts-loader',
            include: [path.resolve(__dirname, 'src')]
        },]
    },
    // when importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // this is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: [nodeExternals({ modulesDir: "../../node_modules" }), {
        "@redux-bootstrap/core": "@redux-bootstrap/core"
    }]
};
module.exports = webpack_opts;