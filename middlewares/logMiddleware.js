/**
 * Created by shupeng on 2016/9/19.
 */

window.ft = {
    pageEvent:{}
}
var synctimeout;
module.exports = function(params){
    var event = this.event;
    var args = this.args;
    var pageEvent = window.ft.pageEvent = this.pageEvent
    if(pageEvent[event]){
        logEventBefore(event,args)
        var result = this.next()
        logEventAfter(event,result)
        return result
    }else{
        logEventErr(event)
    }
    //判断同步代码是否执行完成
    clearTimeout(synctimeout)
    synctimeout = setTimeout(function(){
        console.log('%c------------------------同步事件执行完毕------------------------','color:#4CAF50')
    },0)

    /**
     * 日志处理逻辑
     */
    function logEventBefore(event,args,async){
        var time = formatTime(new Date())
        if(async){
            if(args&&args.length){
                console.group('%c'+event+'  '+time,'color:#aaa');
                console.log('%c'+event+'.params','color:#03A9F4',args);
                console.groupEnd()
            }else{
                console.log('%c'+event+'  '+time,'color:#aaa');
            }

        }else{
            console.group(event+'  '+time);
            if(args&&args.length)
                console.log('%c'+event+'.params','color:#03A9F4',args);
        }

    }
    function logEventAfter(event,result){
        if(result)
            console.log('%c'+event+'.return','color:#4CAF50',result);
        console.groupEnd()
    }
    function logEventErr(event){
        console.warn('%c"'+event+'" event is not binded','color:orange');
    }

    /**
     * 时间格式化
     */
    function repeat(str, times) {
        return new Array(times + 1).join(str);
    };
    function pad(num, maxLength) {
        return repeat("0", maxLength - num.toString().length) + num;
    };
    function formatTime(time) {
        return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
    };


}