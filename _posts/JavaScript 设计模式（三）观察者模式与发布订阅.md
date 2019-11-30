---
title: JavaScript 设计模式（三）观察者模式与发布订阅
tags:
  - JavaScript
date: 2019-03-25
---

## 一、简单观察者模式实现
首先我们写一个 EventEmitter 类，实现简单的事件监听、触发与销毁。
```js
class EventEmitter{
    constructor(){
        this._events = {}
    }
    on(eventName, callback){
        let event = this._events[eventName]
        if(event){
            event.push(callback)
        } else {
            this._events[eventName] = [callback]
        }
    }

    emit(eventName){
        let event = this._events[eventName]
        if(event){
            event.forEach(fn => fn())
        }
    }

    off(eventName, callback){
        this._events[eventName] = this._events[eventName].filter(fn => fn != callback)
    }
}
let e = new EventEmitter()
e.on('cook', () => {
    console.log('做饭');
})
e.on('cook', () => {
    console.log('煮粥');
})
e.emit('cook')
```

<!-- more -->

首先，初始化一个 EventEmitter，然后通过 EventEmitter 的 on 方法注册了一个事件，当 emit 触发对应的事件时，执行对应监听的回调函数。监听与触发，是最简单的观察者模式，那么，观察者模式有什么特点呢?
> 观察者将自己注册在被观察者里，并提供更新的接口

> 当被观察者数据发生变化的时候，通知观察者调用更新的方法

> 被观察者提供维护观察者的一系列方法

观察者模式中，会有一个角色充当观察者，一个角色充当被观察者，那么在上面的 EventEmitter 中，观察者和被观察者其实是由同一个角色来充当，即 EventEmitter 这个类。该类自己监听它自己，并在监听被触发之后，调用监听的方法。

下面我们实现将观察者和被观察者分开：

我们定义一个明星的类，充当被观察者，再定义一个粉丝的类充当观察者，粉丝会观察着他们的明星，即观察者观察着被观察者。

```js
class Fan{
    constructor(name, star){
        this.name = name
        this.star = star
        this.star.attach(this)  // 初始化一个粉丝，并且粉丝将自己添加到他喜欢的明星的观察者队列里
    }
    update(){
        // 被观察者（明星）状态发生变化的时候，会通知观察者（粉丝）调用更新方法
        console.log(`${this.star.name}喜欢${this.star.getState()}，我也喜欢`);
    }
}

class Star{
    constructor(name){
        this.name = name
        this.state = ''
        this.observers = []
    }
    setState(state){
        this.state = state         // 明星改变自己的状态
        this._notifyAllObservers() // 一改变状态，就通知他的粉丝改变状态
    }
    getState(){
        return this.state
    }
    attach(observer){
        this.observers.push(observer)
    }
    _notifyAllObservers(){
        if(this.observers.length > 0){
            this.observers.forEach(observer => observer.update())
        }
    }
}
let star = new Star('周董')
let fanA = new Fan('张三', star)
star.setState('菊花')
```
这样，观察者与被观察者就是两个不同的类来充当，但我们会发现，观察者与被观察者之间还是有一定的耦合性的，因为观察者会将自己注册在被观察者里面。

那怎么解耦合呢？在观察者模式中，有一种典型的实现方式，可以将观察者与被观察者完全独立开来，这种模式，就是发布与订阅模式。发布与订阅模式是观察者模式的一种实现，会通过一个中间的代理对象来建立联系，从而实现发布者与订阅者的独立。我们来实现一个比较经典的房屋中介的例子：
```js
// 1、定义一个中介
class Agent {
    constructor(){
        this._events = {}
    }
    // 订阅
    subscribe(type, listener){                // 中介提供订阅信息的方法
        let listeners = this._events[type]
        if(listeners){
            listeners.push(listener)
        } else {
            this._events[type] = [listener]
        }
    }
    // 发布
    publish(type){                            // 中介提供发布信息的方法
        let listeners = this._events[type]
        let args = Array.prototype.slice.call(arguments, 1)
        if(listeners){                        // 发布信息时通知所有订阅该信息的订阅者
            listeners.forEach(listener => listener(...args))
        }
    }
}
// 2、定义一个发布者房东
class LandLord {
    constructor(name){
        this.name = name
    }
    lend({type, agent, msg}){
        agent.publish(type,msg)   // 房东发布信息后，会触发中介的发布方法，改方法会去通知所有订阅者
    }
}
// 3、定义一个订阅者租客
class Tenant {
    constructor(name){
        this.name = name
    }
    rent({type, agent}){        // 租客订阅信息，会触发中介的订阅方法，被中介监听
        agent.subscribe(type , msg => {
            console.log(`中介发布了${type}，具体信息：${msg}`);
        })
    }
}
// 4、发布订阅
let agent = new Agent()
let landlord = new LandLord()
let t1 = new Tenant('张三')
t1.rent({
    agent,
    type: '别墅'
})
landlord.lend({
    agent,
    type: '别墅',
    msg: '这别墅面朝大海'
})
```

发布订阅模式也叫观察者模式，但是它更符合设计模式的哲学，发布者与订阅者不需要相互知道对方的存在。

观察者模式大多是处理同步的，比如事件触发，被观察者就会调用观察者的方法。而发布订阅模式一般是处理异步的，比如 Promise 中，异步的的代码会先存储，等待时机成熟才会触发。