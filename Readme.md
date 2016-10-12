

  frometo is a javascript middleware tool to help you manage the events on you page.


## Installation

```
$ npm install frometo
```




##frometo ———— api
使用fromTo来管理页面事件

###ft对象方法
***
#### # allEvents
###### type:attribute
所在频道的事件对象，包含所有事件

#### # channelName
###### type:attribute
所在频道名称，ft对象为root

#### # bind
###### type:func; param:Object
event对象是一个key-value键值对，且不支持重复绑定。这样可以确保每个事件处理逻辑的唯一性
```
ft.bind({
  eventA:function(){...},
  eventB:function(){...}
})
```
#### # unbind
###### type:func; param:String
取消事件绑定
```
ft.unbind('eventA')
```
#### # trigger
###### type:func; param:[String|Array, ... ]
触发之前绑定过的事件,在ft中一个事件的触发是有返回值的，其中分为同步返回和异步返回，同步返回结果在trigger结果(此处称为result)中的returnValue属性获取。针对异步返回，ft实现了一套类promise的Api，通过result.then(success,fail)获取异步返回结果。针对多事件触发，result还实现了result.all、以及result.race等类promise方法，用来处理异步事件。
```
ft.bind({
  eventA:function(v){
     var self  = this
     setTimeout(function(){
       self.resolve(v+'done in 2s')//类promise，resolve表示异步返回成功。失败使用this.reject方法
     },2000)
     return v+' done';
  }，
  eventB:function(v){
     var self  = this
     setTimeout(function(){
       self.resolve(v+'done in 5s')
     },5000)
     return v+' done';
  }
})
var result = ft.trigger('eventA','hello world');
console.log(result.retuanValue)
result.then(function(v){
  console.log(v)
})
//hello world done
//hello world done in 2s

var result = ft.trigger(['eventA','eventB'],'hello world');
console.log(result.retuanValue)
//['hello world done','hello world done']  //eventA和eventB同步返回结果
result.all(function(v){
  console.log(v)
  //['hello world done in 2s','hello world done in 5s'] //两个事件异步返回结果
})

```
#### # triggerAsyncOnce
###### type:func; param:[String|Array, ... ]
事件节流触发函数，在js事件循环内针对事件重复触发的情况，取最后一次触发事件
```
ft.triggerAsyncOnce('eventA','hello world1');
ft.triggerAsyncOnce('eventA','hello world2');
ft.triggerAsyncOnce('eventA','hello world3');
//只会触发参数为hello world3的eventA事件
```
#### # addMiddleware
###### type:func; param:Fucntion
为ft添加中间件。中间件本身是一个函数，在函数的this对象中，可获取事件相关的属性。通过this.next()方法实现中间件的级联调用。你可以根据实际需求扩展自己的中间件，如log等。
```
ft.bind({
  A:function(v){
    console.log('event function doing')
    return 'hello world'
  }
})
ft.addMiddleware(function(){
  console.log('start first middleware')
  var result =  this.next();
  console.log('finish first middleware')
  return 'first ' + result';
})
ft.addMiddleware(function(){
  console.log('start second middleware')
  var result =  this.next();
  console.log('finish second middleware')
  return 'second ' + result;
})
var result = ft.trigger('A')
console.log(result)
//start first middleware
//start second middleware
//event function doing
//finish second middleware
//finish first middleware
//first second hello world  -- 返回结果
```

#### # channel
###### type:func; param:String
创建ft的子频道，子频道与ft共享一套api，亦可绑定触发事件。子频道和父频道相互独立，父频道可触发子频道的广播事件（ft对象本身就是名字为root的channel）。
```
var channelA = ft.channel('channelA');
//创建channelA频道
channelA.bind({
   eventA:function(){...}
})
channelA.trigger('eventA') 
```
#### # broadcast
###### type:func; param:String
在频道广播事件，触发本频道以及子频道的所有同名事件
```
//这里创建了三个频道，A、B频道属于ft（root）频道，C频道属于B频道
var channelA = ft.channel('channelA');
var channelB = ft.channel('channelB');
var channelC = channelB.channel('channelC');
var eventObj = {
  whoiam:function(){
    console.log(this.channelName);
  }
}
ft.bind(eventObj)
channelA.bind(eventObj)
channelB.bind(eventObj)
channelC.bind(eventObj)
ft.broadcast(‘whoiam’)
//root
//channelA
//channelB
//channelC
//各频道依次报名
```

###中间件函数中的this对象方法
***
#### # allEvents
###### type:attribute
所在频道的事件对象，包含所有事件

#### # args
###### type:attribute
事件触发的具体参数，以数组形式展示

#### # event
###### type:attribute
事件名称

#### # eventTree
###### type:attribute
由于事件常常是嵌套触发的，因此维护了一个eventTree来管理事件触发的依赖关系，例如：如果在‘firstInit’中触发了‘initAirplane’事件，则firstInit为eventTree的父事件

#### # ft
###### type:attribute
channel对象的引用，在ft触发的事件流中即为ft，可用于在中间件中进行事件触发、绑定等操作

#### # next
###### type:func;
用于调用中间件流中的下一个中间件，其实在ft中所绑定的事件函数就是一个最顶层的中间件。如果在某个中间件中不执行this.next()方法，改事件将最终不会被执行。
```
ft.addMiddleware(function(){
  var result =  this.next();
  return 'first ' + result';
})
```
#### # resolve
###### type:func;param:everything
在函数的异步处理逻辑中，触发resolve（result）传值给外部promise的then中的success方法。
resolve和reject只能触发一次返回结果。
```
ft.bind({
  eventA:function(){
    var result =  this.next();
    setTimeout(function(){
      this.resolve('async result')
    },2000)
    return 'first ' + result';
  }
})
ft.trigger('eventA').then(function(result){
  console.log(result)
  //async result
})
```

#### # reject
###### type:func;param:everything
在函数的异步处理逻辑中，触发reject（result）传递错误信息给外部promise的then中的error方法。
resolve和reject只能触发一次返回结果。
```
ft.bind({
  eventA:function(){
    var result =  this.next();
    setTimeout(function(){
      this.reject('async result error')
    },2000)
    return 'first ' + result';
  }
})
ft.trigger('eventA').then(function(result){
  ...
}，function(error){
  console.log(result)
  //async result error
})
```

#### # trigger
###### type:func; param:[String|Array, ... ]
用于本频道内事件触发
```
ft.addMiddleware(function(){
  this.trigger('someOtherEvent')
  var result = this.next();
  return result;
})
```

###trigger返回值属性方法
***
#### # event
###### type:attribute
事件名称

#### # returnValue
###### type:attribute
事件触发后的同步返回结果（事件处理函数中以return的形式返回的值），如果触发的是多事件的话，则次属性为一个返回值数组列表。

#### # then
###### type:func; param:[Function，Function]
用于本频道内事件触发
```
ft.bind({
  eventA:function(trueOrFalse){
    var result =  this.next();
    setTimeout(function(){
      if(trueOrFalse){
        this.resolve('async result success')
      }else{
        this.reject('async result error')
      }
    },2000)
  }
})
ft.trigger('eventA',true).then(function(result){
  console.log(result)
  //async result success
}，function(error){
  console.log(error)
  //async result error
})
```
#### # all
###### type:func; param:[Function，Function]
多事件触发时，所有的事件异步都有返回结果时触发回调
```
ft.bind({
  eventA:function(v){
     var self  = this
     setTimeout(function(){
       self.resolve(v+'done in 2s')//类promise，resolve表示异步返回成功。失败使用this.reject方法
     },2000)
     return v+' done';
  }，
  eventB:function(v){
     var self  = this
     setTimeout(function(){
       self.resolve(v+'done in 5s')
     },5000)
     return v+' done';
  }
})
var result = ft.trigger(['eventA','eventB'],'hello world').all(function(v){
  console.log(v)
  //['hello world done in 2s','hello world done in 5s'] //两个事件异步返回结果
})
```
#### # race
###### type:func; param:[Function，Function]
多事件触发时，有一个异步事件返回结果时触发回调
```
ft.bind({
  eventA:function(v){
     var self  = this
     setTimeout(function(){
       self.resolve(v+'done in 2s')//类promise，resolve表示异步返回成功。失败使用this.reject方法
     },2000)
     return v+' done';
  }，
  eventB:function(v){
     var self  = this
     setTimeout(function(){
       self.resolve(v+'done in 5s')
     },5000)
     return v+' done';
  }
})
var result = ft.trigger(['eventA','eventB'],'hello world').race(function(v){
  console.log(v)
  //['hello world done in 2s',undefined] //两个事件异步返回结果
})
```

