// import { Configuration } from 'webpack'
const path = require('path')
/** @type {Configuration} */
const config = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build'),
    },
    node: {
        __filename: true,
        __dirname: true
    },
    mode: "development",
    target: "node"
}
module.exports = config;