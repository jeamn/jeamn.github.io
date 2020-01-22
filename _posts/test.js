function cb (oldVal, newVal) {
    /* 渲染视图 */
    console.log(`数据刷新，旧值：${oldVal}，新值：${newVal}`);
}
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,       /* 属性可枚举 */
        configurable: true,     /* 属性可被修改或删除 */
        get: function reactiveGetter () {
            return val;         /* 实际上会依赖收集，下一小节会讲 */
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            cb(val, newVal);
        }
    });
}
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}
class Vue {
    /* Vue构造类 */
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}
let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello ,world.";  /* 视图更新啦～ */



for(var i=0; i<5; i++){
    (function(j){
        setTimeout(function timer() {
            console.log(j)
        }, 0);
    })(i)
}
for(var i=0; i<6; i++){
    setTimeout((j) => {
        console.log(j)
    }, 0, i);
}
for(let i=0; i<7; i++){
    setTimeout(function() {
        console.log(i)
    }, 0);
}
