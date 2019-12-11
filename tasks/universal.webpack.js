'use strict';

const HTMLWebpackPlugin = require ('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DotEnvPlugin = require('dotenv-webpack');
const Path = require('path');

const UniversalConfiguration = {
    entry: './src/main.js',
    output: {
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.vue', 'json'],
        alias: {
			'@': Path.resolve(__dirname, '../src/'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
	optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    },
	module: {
		rules: [ {
			test: /\.m?js$/,
			include: Path.resolve(__dirname, '../src/'),
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							useBuiltIns: 'usage',
							modules: false,
							corejs: 3
						}]
					],
					plugins: ['@babel/plugin-syntax-dynamic-import']
				}
			}
		}, {
			test: /\.scss$/,
			use: [ {
				loader: 'vue-style-loader'
		}, {
				loader: 'postcss-loader',
				options: {
					plugins: [
						require('tailwindcss'),
                        require('autoprefixer')
                        ]
                    }
                }, {
                    loader: 'sass-loader'
                } ]
			}, {
				test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outPath: 'img'
                }
            } ]
		},
		plugins: [
			new VueLoaderPlugin(),
        	new DotEnvPlugin(),
        	new HTMLWebpackPlugin({
				template: 'src/html/template.html',
	            filename: 'index.html',
	            title: 'xbanki.me',
				publicPath: './',
	            inject: true
        	})
    	]
};

module.exports = UniversalConfiguration;
