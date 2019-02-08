const webpack = require('webpack');
const Fiber = require('fibers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

function buildConfig(configDirs) {
	return {
		mode: 'development',
		entry: './src/index.js',
		devtool: 'cheap-module-eval-source-map',
		watchOptions: {
			poll: true,
			ignored: /node_modules/
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
			extensions: ['*', '.js', '.jsx']
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
								sourceMap: true,
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
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								publicPath: 'assets',
							},
						},
					],
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
			})
		]
	};
}

module.exports = buildConfig;