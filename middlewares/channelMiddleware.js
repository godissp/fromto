/**
 * Created by user on 16/9/25.
 */
module.exports = function(){
    var event = this.event;
    var ft = this.ft;
    var args = this.args;
    if(isArray(event)){
        for(var i=0;i<event.length;i++){
            var newArgs = copyArray(args)
            newArgs.splice(0,0,event[i])
            ft.trigger.apply(ft,newArgs);
        }
        return
    }else{
        return this.next()
    }
}
function isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
}
function copyArray(array){
    var result = [];
    for(var i=0;i<array.length;i++){
        result = array[i]
    }
    return result
}