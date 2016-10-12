/**
 * Created by shupeng on 2016/9/21.
 */
var eventDepth = 0;
var parents = [];

module.exports = function(){
    var event = this.event;
    var args = this.args;
    var parent = parents[eventDepth-1]
    var eventObj = {
        name:event,
        args:args,
        depth:eventDepth++,
        parent:parent,
        children:[]
    }
    parent?parent.children.push(eventObj):'';
    parents.push(eventObj);
    this.eventTree = eventObj;
    try{
        var result = this.next();
    }catch(e){
        window['console']?console.log('Event "' + event + '" ', e.stack ):''
    }finally{
        eventDepth--
        parents.pop();
    }

    return result
}