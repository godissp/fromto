/**
 * Created by shupeng on 2016/8/3.
 */
const webpack = require('webpack')
const path = require('path')
const rootPath = __dirname;


const wpConfig = {
    entry: {
        //fromto:path.join(rootPath,'index.js'),
        entry:path.join(rootPath,'entry.js')
    },
    output: {
        path: path.join(rootPath,'dest'),
        filename: "[name].js"
    },
    plugins:[
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ],
    module: {
        loaders: [
            //{
            //    test: /test\.js$/,
            //    loader: "testSyncLoader!testAsyncLoader!testPitchLoader!"
            //}
        ]

    },
    //devtool:'source-map',
    resolve:{
        extensions:['','.js','.json']
    }
};

module.exports = wpConfig