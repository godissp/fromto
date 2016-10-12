/**
 * Created by shupeng on 2016/9/27.
 */
module.exports = function(array,func){
    var newArray = [];
    for(var i=0;i<array.length;i++){
        if(func(array[i],i)){
            newArray.push(array[i])
        }
    }
    return newArray;
}