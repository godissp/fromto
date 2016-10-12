/**
 * Created by shupeng on 2016/8/3.
 */
const webpack = require('webpack')
const path = require('path')
const rootPath = __dirname;
const wpConfig = {
    entry: {
        fromto:path.join(rootPath,'index.js')
    },
    output: {
        path: path.join(rootPath,'dest'),
        libraryTarget:'umd',
        filename: "[name].umd.js"
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve:{
        extensions:['','.js','.json']
    }
};

module.exports = wpConfig