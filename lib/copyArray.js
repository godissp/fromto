/**
 * Created by shupeng on 2016/9/26.
 */
module.exports = function copyArray(array){
    var result = [];
    for(var i=0;i<array.length;i++){
        result[i] = array[i]
    }
    return result
}