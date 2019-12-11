'use strict';

const WebpackMerge = require('webpack-merge');
const PATH = require('path');

const UniversalConfiguration = require('./universal.webpack');

const ProductionConfiguration = WebpackMerge(UniversalConfiguration, {
    mode: 'production',
    output: {
        path: PATH.resolve(__dirname, '../dist/'),
		chunkFilename: '[id].chunk.js',
        filename: '[name].bundle.js'
    }
});

module.exports = ProductionConfiguration;