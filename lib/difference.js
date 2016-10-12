/**
 * Created by shupeng on 2016/9/27.
 */
var filter = require('./filter')
var isArray = require('./isArray')
module.exports = function(origin,minus){
    if(!isArray(origin)){
        return null
    }
    if(!isArray(minus)){
        return origin
    }
    var result = filter(origin,function(v){
        if(minus.indexOf(v) === -1){
            return true
        }
    })
    return result;
}