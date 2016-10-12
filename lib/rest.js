/**
 * Created by shupeng on 2016/9/26.
 */
module.exports = function(array){
    var result = [];
    for(var i=1;i<array.length;i++){
        result[i-1] = array[i]
    }
    return result
}