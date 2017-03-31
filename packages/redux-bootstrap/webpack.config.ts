var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Visualizer = require("webpack-visualizer-plugin");

/* helper function to get into build directory */
var libPath = function (name) {
    if (undefined === name) {
        return path.join('lib');
    }

    return path.join('lib', name);
};

var webpack_opts = {
    entry: './src/index.tsx',
    target: 'node',
    output: {
        filename: libPath('index.js'),
        library: '@redux-bootstrap/bootstrap',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['d.ts', '.ts', '.tsx', '.js'],
        modules: [
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
            filename: './statistics.html'
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
    externals: [nodeExternals(), {
        'react': 'umd react',
        'react-dom': 'umd react-dom',
    }]
};
module.exports = webpack_opts;