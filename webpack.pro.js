const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: ["./main.js"]
	},
	output: {
		path: path.resolve(__dirname, "bin"),
		filename: "[name].js"
	},
	mode: "production",
	plugins: [
		new CleanWebpackPlugin(['bin/*.*'], {root: __dirname}),
		new HtmlWebpackPlugin({title: 'force-three'})
	],
	
	optimization: {
		splitChunks: {
			chunks: "all", name: "vendor", cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor'
				}
			}
		}
	}
};