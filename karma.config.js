// Karma configuration
// Generated on Tue Sep 27 2016 18:04:29 GMT+0800 (中国标准时间)
var webpackConfig = require('./webpack.config')

// shared config for all unit tests
module.exports = function(config){
  config.set({
    frameworks: ['mocha'],
    files: [
      './test/*.js'
    ],
    preprocessors: {
      'test/*.js': ['webpack']
    },
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: false,
    autoWatch: true,
    browsers: ['Chrome']
  })
}





