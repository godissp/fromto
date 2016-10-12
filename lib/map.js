/**
 * Created by shupeng on 2016/9/26.
 */
var isArray = require('./isArray');

module.exports = function (some,func) {
    var newSome
    if(isArray(some)){
        newSome = []
        for(var i=0;i<some.length;i++){
            newSome[i] = func(some[i],i)
        }
    }else{
        newSome = {}
        for(var i in some){
            newSome[i] = func(some[i],i)
        }
    }
    return newSome
};