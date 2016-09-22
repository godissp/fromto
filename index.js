/**
 * Created by shupeng on 2016/7/13.
 */
define(['underscore'],
    function(_) {
        var eventBus = {};
        var pageEvent = {};
        var asyncEvent = [];
        var timeout;
        var triggerMiddleware = [];

        /**
         * 初始化eventBus
         * @param events obj对象
         */
        eventBus.bind =  eventBus.bindNoLog = function(events){
            _.each(events,function(v,key){
                pageEvent[key] = v
            })
        }

        /**
         * 解绑事件
         * @params string
         */
        eventBus.unbind = eventBus.unbindNoLog = function(key){
            if(pageEvent[key]){
                delete pageEvent[key]
            }
        }

        /**
         * 添加中间件
         * @params string
         */
        eventBus.addMiddleware = function(fn){
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
        eventBus.trigger = function(){
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
                eventBus:eventBus
            }
            return player.next()
        }

        /**
         * 事件节流机制触发函数
         */
        eventBus.triggerAsyncOnce = function(){
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
                    eventBus.trigger.apply(eventBus,v);
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
        eventBus.config = function(){}

        return eventBus;
})