const paths = require('./paths');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
webpackConfig.entry = {};

process.NODE_ENV = 'test'

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      paths.appIndexJs,
      `${paths.appSrc}/**/*.spec.*`
    ],
    preprocessors: {
      [paths.appIndexJs]: ['webpack'],
      [`${paths.appSrc}/**/*.spec.*`]: ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-webpack')
    ]
  })
}