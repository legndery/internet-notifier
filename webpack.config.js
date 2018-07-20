// import { Configuration } from 'webpack'
const path = require('path')
/** @type {Configuration} */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build/js'),
    },
    node: {
        __filename: false,
        __dirname: false
    },
    plugins: [
        new CopyWebpackPlugin([
             {from: 'assets', to: '../assets'},
             {from: 'vendor', to: '../vendor'}
        ])
    ],
    mode: "development",
    target: "node",
    devtool:"source-map"
}
module.exports = config;