const path = require('path');
const whitelabelConfig = require('./whitelabel.config');
// const brandVariablesPath = whitelabelConfig[process.env.VUE_APP_BRAND].scssVariables
const brand = process.env.VUE_APP_BRAND
const brandVariablesPath = "vendor/"+ brand +"/sass";
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const webpack = require('webpack');

const gitRevisionPlugin = new GitRevisionPlugin();

// vue.config.js
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'brandVariables': path.resolve(__dirname, brandVariablesPath),
			}
		},
		devtool: 'source-map',

		plugins: [
			gitRevisionPlugin,
			new webpack.DefinePlugin({
				'VERSION': JSON.stringify(gitRevisionPlugin.version()),
				'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
				'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
			}),
		],

		output: {
			chunkFilename: '[name].[hash].js',
			filename: '[name].[hash].js'
		},

		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						priority: -10,
						test: /[\\/]node_modules[\\/]/
					}
				},
	
				chunks: 'async',
				minChunks: 1,
				minSize: 30000,
				name: true
			}
		},
		
	}
}