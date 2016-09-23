/**
 * Created by shupeng on 2016/7/13.
 */

var _ = require('underscore')
var ft = {};
var pageEvent = {};
var asyncEvent = [];
var timeout;
var triggerMiddleware = [];

/**
 * 初始化ft
 * @param events obj对象
 */
ft.bind = function(events){
    _.each(events,function(v,key){
        pageEvent[key] = v
    })
}

/**
 * 解绑事件
 * @params string
 */
ft.unbind = function(key){
    if(pageEvent[key]){
        delete pageEvent[key]
    }
}

/**
 * 添加中间件
 * @params string
 */
ft.addMiddleware = function(fn){
    triggerMiddleware.splice(1,0,fn)
}

/**
 * trigger基本逻辑
 * @params string
 */
triggerMiddleware.push(trigger)

/**
 * 触发事件
 * @params string
 */
ft.trigger = function(){
    var index = triggerMiddleware.length-1;
    var originArgs = Array.prototype.slice.call(arguments)
    var event = originArgs[0];
    var args = _.rest(originArgs);
    var player = {
        next:function(){
            if(index == -1) return
            return triggerMiddleware[index--].apply(this,arguments);
        },
        event:event,
        args:args,
        pageEvent:pageEvent,
        ft:ft
    }
    return player.next()
}

/**
 * 事件节流机制触发函数
 */
ft.triggerAsyncOnce = function(){
    clearTimeout(timeout)
    asyncEvent.push(arguments);
    timeout = setTimeout(function(){
        asyncEventStart()
    },0);
}

/**
 * 异步事件节流
 */
function asyncEventStart(){
    var eventDone = []
    _.each(asyncEvent,function(v,i){
        var done  = _.some(eventDone,function(m){
            return m == v[0]
        })
        if(done){
            return
        }else{
            ft.trigger.apply(ft,v);
            eventDone.push(v[0]);
        }
    })
}

/**
 * trigger函数
 */
function trigger(){
    this.next()
    var event = this.event;
    var args = this.args;
    if(pageEvent[event]){
        return pageEvent[event].apply(pageEvent,args);
    }
}

/**
 * config 函数
 */
ft.config = function(){}

global.ft = ft

module.exports =  ft;









