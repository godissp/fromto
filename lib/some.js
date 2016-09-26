/**
 * Created by shupeng on 2016/9/26.
 */
module.exports = function (array,func) {
    for(var i=0;i<array.length;i++){
        if(func(array[i],i)){
            return true;
        }
    }
};
