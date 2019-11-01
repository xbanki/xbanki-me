'use strict';

const Webpackmerge = require('webpack-merge');
const Webpack = require('webpack');
const Path = require('path');

const UniversalConfiguration = require('./universal.webpack');

const DevelopmentConfiguration = Webpackmerge(UniversalConfiguration, {
	devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    output: {
        path: Path.resolve(__dirname, '../build/'),
		chunkFilename: '[id].chunk.js',
        filename: '[name].bundle.js'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: Path.resolve(__dirname, '../build/'),
        host: process.env.HOST || 'localhost',
		port: process.env.PORT || 5000,
		historyApiFallback: true,
		compress: true,
		overlay: true,
        inline: true,
        hot: true
    }
});

module.exports = DevelopmentConfiguration;
