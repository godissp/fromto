/**
 * Created by shupeng on 2016/9/28.
 */
var ft = require('../index.js')
var assert = require('assert');
describe('ft', function() {
    describe('#trigger()', function() {
        it('trigger', function() {
            ft.bind({'eventA':function(param1,param2,param3){
                assert.deepEqual(this.args,['paramA',123,{name:'paramB'}])
            }})
            ft.trigger('eventA','paramA',123,{name:'paramB'})
        });
    });
    describe('#triggerAsyncOnce()', function() {
        it('triggerAsyncOnce', function(done) {
            var operatArray = []
            ft.bind({
                'eventB':function(param1,param2,param3){
                    operatArray.push(this.event)
                    assert.deepEqual(this.args,['paramA',123,{name:'paramB'}])
                },
                'eventC':function(param1,param2,param3){
                    operatArray.push(this.event)
                    assert.deepEqual(this.args,['paramA',123,{name:'paramB'}])
                },
                'eventD':function(param1,param2,param3){
                    operatArray.push(this.event)
                    assert.deepEqual(this.args,['paramA',123,{name:'paramB'}])
                }
            })
            ft.triggerAsyncOnce('eventB','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventC','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventC','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventB','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventD','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventD','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventD','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventD','paramA',123,{name:'paramB'})
            ft.triggerAsyncOnce('eventB','paramA',123,{name:'paramB'})
            setTimeout(function(){
                assert.deepEqual(operatArray,['eventC','eventD','eventB'])
                done()
            })
        });
    });
    describe('#addMiddleware()', function() {
        it('addMiddleware', function() {
            ft.bind({'eventE':function(param1,param2,param3){

            }})
            ft.addMiddleware(function(){
                assert.deepEqual(this.args,['paramA',123,{name:'paramB'}])
                this.next();
                return 'middleware works'

            })
            assert.equal('middleware works',ft.trigger('eventE','paramA',123,{name:'paramB'}).returnValue)
        });
    });
});