const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './index.jsx'],
    output: {
        filename: 'bundle.js',
        publicPath: '',
    },
    devServer: {
        port: 3030,
        host: 'localhost',
        historyApiFallback: true,
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: __dirname,
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader',
            },
        ],
    },
    resolve: {
        alias: {
            app: 'app',
        },
        extensions: ['.js', '.jsx'],
        modules: [path.join(__dirname, './'), 'node_modules'],
    },
    devtool: 'source-map',
};
