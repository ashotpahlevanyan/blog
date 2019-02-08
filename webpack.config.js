const path = require('path');

var APP_DIR = path.resolve(__dirname, './src');
var BUILD_DIR = path.resolve(__dirname, './dist');

const configDirs = {
	BUILD_DIR: BUILD_DIR,
	APP_DIR: APP_DIR
};

function buildConfig(env) {
	if (env === 'development' || env === 'production') {
		return require('./webpack.' + env + '.js')(configDirs);
	} else {
		console.log("Wrong webpack build parameter. Possible choices: `development` or `production`.")
	}
}

module.exports = buildConfig;
//
// var config = {
// 	entry: path.join(__dirname, '/src/index.js'),
// 	output: {
// 		filename: 'main.js',
// 		path: path.join(__dirname, '/dist')
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: "babel-loader"
// 				}
// 			},
// 			{
// 				test: /\.html$/,
// 				use: [
// 					{
// 						loader: "html-loader"
// 					}
// 				]
// 			},
// 			{
// 				test: /\.scss$/,
// 				use: [{
// 					loader: "style-loader"
// 				}, {
// 					loader: "css-loader"
// 				}, {
// 					loader: "sass-loader",
// 					options: {
// 						implementation: require("sass"),
// 						fiber: Fiber
// 					}
// 				}]
// 			}
// 		]
// 	}
// };

//
//
// module.exports = (env, argv) => {
//
// 	if (argv.mode === 'development') {
// 		config.devtool = 'source-map';
// 		config.mode = "development";
// 	}
//
// 	if (argv.mode === 'production') {
// 		config.mode = "production";
// 		config.plugins = [
// 			new HtmlWebPackPlugin({
// 				template: path.join(__dirname,'./src/index.html'),
// 				filename: "index.html"
// 			})
// 		]
// 	}
//
// 	return config;
// };
//



//
// module.exports = {
// 	entry: path.join(__dirname, '/src/index.js'),
// 	output: {
// 		filename: 'main.js',
// 		path: path.join(__dirname, '/dist')
// 	},
// 	devtool: "source-map",
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: "babel-loader"
// 				}
// 			},
// 			{
// 				test: /\.html$/,
// 				use: [
// 					{
// 						loader: "html-loader"
// 					}
// 				]
// 			},
// 			{
// 				test: /\.scss$/,
// 				use: [{
// 					loader: "style-loader"
// 				}, {
// 					loader: "css-loader"
// 				}, {
// 					loader: "sass-loader",
// 					options: {
// 						implementation: require("sass"),
// 						fiber: Fiber
// 					}
// 				}]
// 			}
// 		]
// 	},
// 	plugins: [
// 		new HtmlWebPackPlugin({
// 			template: path.join(__dirname,'./src/index.html'),
// 			filename: "index.html"
// 		})
// 	]
// };