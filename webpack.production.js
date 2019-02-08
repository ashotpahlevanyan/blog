const Fiber = require('fibers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function buildConfig(configDirs) {
	return {
		mode: 'production',
		entry: configDirs.APP_DIR + '/index.js',
		optimization: {
			minimize: true
		},
		output: {
			path: configDirs.BUILD_DIR,
			filename: 'bundle.js',
			publicPath: '/'
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader"
						}
					]
				},
				{
					test: /\.scss$/,
					use: [{
						loader: "style-loader"
					}, {
						loader: "css-loader"
					}, {
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
							fiber: Fiber
						}
					}]
				}
			]
		},
		devServer: {
			historyApiFallback: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: configDirs.APP_DIR + '/index.html'
			})
		]
	};
}


module.exports = buildConfig;