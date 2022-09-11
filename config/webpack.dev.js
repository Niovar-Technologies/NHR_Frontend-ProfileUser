const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
	// publicPath: 'http://localhost:8081/',
       publicPath: 'https://profileuser.niovarpaie.ca/',
    },
    devServer: {
        port: 8080, 
        host: '0.0.0.0',
        historyApiFallback: {
            index: '/index.html'
        }
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
        },
        {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                 'file-loader',
                {
                     loader: 'image-webpack-loader',
                     options: {
                         bypassOnDebug: true, // webpack@1.x
                         disable: true, // webpack@2.x and newer
                     },
                },
              ],
        }
		
     ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'ProfileUser',
            filename: 'remoteEntry.js',
            exposes: {
                './ProfileUserApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = {
    stats: { children: true }
};
module.exports = merge(commonConfig, devConfig)
