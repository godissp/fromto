/**
 * Created by shupeng on 2016/9/27.
 */
var each = require('./each')
var map = require('./map')
var filter = require('./filter')
module.exports = function(array,func){
    var location  = [];
    var middle = {};
    each(array,function(v ,i){
        var m = func(v,i)
        if(middle[m] !== undefined){
            location = filter(location,function(v,i){
                return v!=m;
            })
        }
        middle[m] = i;
        location.push(m)
    })
    return map(location,function(v ,i){
        return array[middle[v]]
    })
}