const webpack = require('webpack')
const { merge } = require('webpack-merge')
const TerserJSPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config')

require('dotenv').config()

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({
      terserOptions: {
        format: {
            comments: false,
        },
    },
    extractComments: false,
    })
  ]},
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(),
  ],
})
