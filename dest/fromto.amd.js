define(function(){return function(n){function e(r){if(t[r])return t[r].exports;var i=t[r]={exports:{},id:r,loaded:!1};return n[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var t={};return e.m=n,e.c=t,e.p="",e(0)}([function(n,e,t){(function(e){function r(n){return{channelName:n,allEvents:{},childChannels:{},asyncEvent:[],timeout:null,triggerMiddleware:g,bind:i,channel:f,unbind:a,addMiddleware:o,trigger:l,triggerAsyncOnce:c}}function i(n){var e=this;y.each(n,function(n,t){e.allEvents[t]=n})}function a(n){var e=this;e.allEvents.hasOwnProperty(n)&&delete e.allEvents[n]}function o(n){this.triggerMiddleware.splice(1,0,n)}function l(){var n,e,t,r,i,a,o,l,c,u,s=this,f=s.triggerMiddleware.length-1,p=Array.prototype.slice.call(arguments),d=p[0],g=y.rest(p),x=!1,m=0,E=[];if(h(d)){u=[],t=d.length;for(var w=0;w<d.length;w++)!function(){var n=w,e=v(g);e.splice(0,0,d[w]);var f=s.trigger.apply(s,e);u.push(f.value),f.then(function(e){E[n]=e,++m,1===m&&i&&r?i(E):m===t&&l&&o&&l(E)},function(n){++m,1===m&&a&&r?a(n):m===t&&c&&o&&c(n)})}()}else{var C={next:function(){if(f!=-1)return s.triggerMiddleware[f--].apply(this,arguments)},event:d,args:g,allEvents:s.allEvents,ft:s,channelName:s.channelName,trigger:function(){s.trigger.apply(s,arguments)},resolve:function(e){delete C.resolve,delete C.reject,x&&n?n(e):setTimeout(function(){n?n(e):""},0)},reject:function(n){delete C.resolve,delete C.reject,x&&e?e(n):setTimeout(function(){e?e(u):""},0)}};u=C.next()}var j={event:d,value:u,then:function(t,r){x=!0,n=t,e=r},race:function(n,e){r=!0,i=n,a=e},all:function(n,e){o=!0,l=n,c=e}};return j}function c(){var n=this;clearTimeout(n.timeout),n.asyncEvent.push(arguments),n.timeout=setTimeout(function(){u.apply(n)},0)}function u(){var n=this,e=[];y.each(n.asyncEvent,function(t,r){var i=y.some(e,function(n){return n==t[0]});i||(n.trigger.apply(n,t),e.push(t[0]))})}function s(){var n=this;n.next();var e=n.event,t=n.args;if(n.allEvents[e])return n.allEvents[e].apply(n,t)}function f(n){var e=this;return e.childChannels.hasOwnProperty(n)||(e.childChannels[n]=r(n),e.childChannels[n].parentChannel=e),e.childChannels[n]}var h=t(1),v=t(2),p=t(3),d=r("root"),g=[s,p],y={};y.each=t(4),y.some=t(5),y.rest=t(6),e.ft=d,n.exports=d}).call(e,function(){return this}())},function(n,e){n.exports=Array.isArray||function(n){return"[object Array]"==Object.prototype.toString.call(n)}},function(n,e){n.exports=function(n){for(var e=[],t=0;t<n.length;t++)e[t]=n[t];return e}},function(n,e){var t=0,r=[];n.exports=function(){var n=this.event,e=this.args,i=r[t-1],a={name:n,args:e,depth:t++,parent:i,children:[]};i?i.children.push(a):"",r.push(a),this.eventTree=a;try{var o=this.next()}catch(l){}finally{t--,r.pop()}return o}},function(n,e,t){var r=t(1);n.exports=function(n,e){if(r(n))for(var t=0;t<n.length;t++)e(n[t],t);else for(var t in n)e(n[t],t)}},function(n,e){n.exports=function(n,e){for(var t=0;t<n.length;t++)if(e(n[t],t))return!0}},function(n,e){n.exports=function(n){for(var e=[],t=1;t<n.length;t++)e[t-1]=n[t];return e}}])});