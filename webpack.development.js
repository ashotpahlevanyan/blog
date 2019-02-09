const webpack = require('webpack');
const Fiber = require('fibers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

function buildConfig(configDirs) {
	return {
		mode: 'development',
		entry: './src/index.js',
		devtool: 'source-map',
		watchOptions: {
			poll: true,
			ignored: [/node_modules/, /docs/]
		},
		optimization: {
			minimize: true,
			splitChunks: {
				chunks: 'async',
				minSize: 30000,
				maxSize: 0,
				minChunks: 1,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
						priority: -10
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			}
		},
		output: {
			path: __dirname + '/dist',
			filename: 'bundle.js',
			publicPath: '/'
		},
		resolve: {
			extensions: ['*', '.js', '.jsx', '.json']
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader'
						}
					]
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						{
							loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 2,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									require('autoprefixer')({
										'browsers': ['> 1%', 'last 2 versions']
									}),
								]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								implementation: require('sass'),
								fiber: Fiber
							}
						}
					]
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
					}
				},
			]
		},
		devServer: {
			contentBase: './dist',
			port: 8080,
			hot: true,
			open: true,
			progress: true,
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, '/src/index.html'),
				filename: './index.html',
				inject:true
			}),
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].css' : '[name].[hash].css',
				chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
			}),
			new CopyWebpackPlugin([
				{ from: './src/assets/', to: './assets/' },
			])
		]
	};
}

module.exports = buildConfig;