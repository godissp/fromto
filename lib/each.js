/**
 * Created by shupeng on 2016/9/26.
 */
var isArray = require('./isArray');

module.exports = function (some,func) {
    if(isArray(some)){
        for(var i=0;i<some.length;i++){
            func(some[i],i)
        }
    }else{
        for(var i in some){
            func(some[i],i)
        }
    }
};
