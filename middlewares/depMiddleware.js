/**
 * Created by shupeng on 2016/9/19.
 */
var _ = require('underscore')
module.exports = function(params){
    var modulesArray = params.modulesArray;//加载的模块
    var dependence = params.dependence;//定义事件所依赖的模块 配置文件
    var log = params.log //是否打印错误日志
    return function(){
        var key = this.event;

        if(log){
            var eventDepds = dependence?dependence[key]:true;
            var leftDepds = _.difference(eventDepds,modulesArray)
            if(!eventDepds){
                logEventBindError(key)
                return
            }
            if(leftDepds.length == 0){
                var result = this.next()
                return result
            }else{
                logEventBindError(key, leftDepds)
            }
        }else{
            var eventDepds = dependence?dependence[key]:true;
            if(!eventDepds){
                return
            }
            if(_.difference(eventDepds,modulesArray).length == 0){
                var result = this.next()
                return result
            }
        }
    }
}

function logEventBindError(key,leftDepds){
    if(!leftDepds){
        console.warn('%ctriggerError','color:orange','the dependece modules of event "'+key+'" need to be declared ');
    }else{
        console.warn('%ctriggerError','color:orange','['+leftDepds.toString()+'] modules are needed for event "'+key+'"');
    }
}
function logUnbind(key){
    console.log('%cunBind','color:orange','event "'+key+'" is unbinded!');
}