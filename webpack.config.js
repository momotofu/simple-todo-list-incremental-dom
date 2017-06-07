var webpack = require('webpack')
var path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: process.env.PROD ? 'bundle.min.js' : 'bundle.js',
        publicPath: '/dist/',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        port: 9000,
        inline: true
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                loader: 'style!css',
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src', 'css')]
            },
            {
                test: /\.styl$/,
                include: [path.resolve(__dirname, 'src', 'css')],
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: process.env.PROD ? [ new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})] : [],
    node: {
        fs: []
    }
};
