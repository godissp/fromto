/**
 * Created by shupeng on 2016/7/13.
 */
var each = require('./lib/each')
var isArray = require('./lib/isArray')
var copyArray = require('./lib/copyArray')
var uniqueLast = require('./lib/uniqueLast')
var eventTree = require('./middlewares/baseMiddleware.js')
var initMiddleware = [triggerFunc,eventTree]
var _ = {};
_.each = require('./lib/each')
_.some = require('./lib/some')
_.rest = require('./lib/rest')


/**
 * 事件广播函数
 */
function broadcast(){
    var self = this;
    var originArgs = Array.prototype.slice.call(arguments)
    self.trigger.apply(self,originArgs)
    each(self.childChannels,function(child){
        child.broadcast.apply(child,originArgs)

    })
}

/**
 * 初始化ft
 * @param events obj对象
 */
function bind(events){
    var self = this
    _.each(events,function(v,key){
        self.allEvents[key] = v
    })
}

/**
 * 解绑事件
 * @params string
 */
function unbind(key){
    var self = this
    if(self.allEvents.hasOwnProperty(key)){
        delete self.allEvents[key]
    }
}

/**
 * 添加中间件
 * @params string
 */
function addMiddleware(fn){
    this.triggerMiddleware.splice(1,0,fn)
}


/**
 * 触发事件
 * @params string
 */
function trigger(){
    var self = this;
    var index = self.triggerMiddleware.length-1;
    var originArgs = Array.prototype.slice.call(arguments)
    var event = originArgs[0];
    var args = _.rest(originArgs);
    var thenIsDefine = false;
    var successFunc;
    var errorFunc;
    var eventArrayLength
    var eventArrayBackNum = 0;
    var raceIsDefine
    var raceSuccessFunc;
    var raceErrorFunc
    var allIsDefine;
    var allSuccessFunc;
    var allErrorFunc;
    var allParams = [];
    var value;

    if(isArray(event)){
        value = []
        eventArrayLength = event.length;
        for(var j = 0;j<event.length;j++){
            (function(){
                var index = j;
                var newArgs = copyArray(args)
                newArgs.splice(0,0,event[j])
                var childEvent = self.trigger.apply(self,newArgs);
                value.push(childEvent.value)
                childEvent.then(function(v){
                    allParams[index] = v;
                    ++eventArrayBackNum;
                    if(eventArrayBackNum === 1 && raceSuccessFunc && raceIsDefine){
                        raceSuccessFunc(allParams);
                    }else if(eventArrayBackNum === eventArrayLength && allSuccessFunc && allIsDefine){
                        allSuccessFunc(allParams)
                    }
                },function(v){
                    ++eventArrayBackNum;
                    if(eventArrayBackNum === 1 && raceErrorFunc && raceIsDefine){
                        raceErrorFunc(v);
                    }else if(eventArrayBackNum === eventArrayLength && allErrorFunc && allIsDefine){
                        allErrorFunc(v)
                    }
                })
            })()
        }
    }else{
        var player = {
            next:function(){
                if(index == -1) return
                return self.triggerMiddleware[index--].apply(this,arguments);
            },
            event:event,
            args:args,
            allEvents:self.allEvents,
            ft:self,
            channelName:self.channelName,
            trigger:function(){
                self.trigger.apply(self,arguments);
            },
            resolve:function(value){
                delete player.resolve
                delete player.reject
                if(thenIsDefine&&successFunc){
                    successFunc(value)
                }else{
                    setTimeout(function(){
                        successFunc?successFunc(value):''
                    },0)
                }
            },
            reject:function(err){
                delete player.resolve
                delete player.reject
                if(thenIsDefine&&errorFunc){
                    errorFunc(err)
                }else{
                    setTimeout(function(){
                        errorFunc?errorFunc(value):''
                    },0)
                }
            }
        }
        value = player.next()
    }

    var result = {
        event:event,
        returnValue:value,
        then:function(success,error){
            thenIsDefine = true
            successFunc = success;
            errorFunc = error;
        },
        race:function(success,error){
            raceIsDefine = true
            raceSuccessFunc = success;
            raceErrorFunc = error;
        },
        all:function(success,error){
            allIsDefine = true
            allSuccessFunc = success;
            allErrorFunc = error;
        }
    }

    return result
}

/**
 * 事件节流机制触发函数
 */
function triggerAsyncOnce(){
    var self = this;
    clearTimeout(self.timeout)
    self.asyncEvent.push(arguments);
    self.timeout = setTimeout(function(){
        asyncEventStart.apply(self)
    },0);
}

/**
 * 异步事件节流
 */
function asyncEventStart(){
    var self  = this;
    var eventDone = [];
    var resultEvent = uniqueLast(self.asyncEvent,function(v,i){
        return v[0];
    })
    _.each(resultEvent,function(v,i){
        self.trigger.apply(self,v);
        eventDone.push(v[0]);
    })
    self.asyncEvent = [];
}

/**
 * trigger函数
 */
function triggerFunc(){
    var self = this
    self.next()
    var event = self.event;
    var args = self.args;
    if(self.allEvents[event]){
        return self.allEvents[event].apply(self,args);
    }
}


function channel(name){
    var self = this;
    if(!self.childChannels.hasOwnProperty(name)){
        self.childChannels[name] = getFtInstance(name);
        self.childChannels[name]['parentChannel'] = self;
    }

    return  self.childChannels[name];
}

function getFtInstance(name){
    return {
        channelName:name,
        allEvents : {},
        childChannels : {},
        asyncEvent : [],
        timeout : null,
        triggerMiddleware : initMiddleware,
        bind : bind,
        channel : channel,
        unbind : unbind,
        addMiddleware : addMiddleware,
        trigger : trigger,
        triggerAsyncOnce : triggerAsyncOnce,
        broadcast:broadcast
    }
}

var ft = getFtInstance('root');

global.ft = ft

module.exports =  ft;









