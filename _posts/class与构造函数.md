---
title: class与构造函数的继承
tags:
  - JavaScript
  - ES6
date: 2017-08-20
---

### 一、class 与 构造函数
先回顾一下 JS 构造函数：

```js
function MathHandle(x, y){
    this.x = x
    this.y = y
}
MathHandle.prototype.add = function(){
    return this.x + this.y
}
let result = new MathHandle(1, 2)
console.log(result.add())
```

<!-- more -->

定义了一个构造函数后，在它的原型上扩展了一个 add 方法，再实例化一个对象。

那么ES6 的 class 语法是怎么实现这一过程的？

```js
class MathHandle {
    constructor(x, y) {
    this.x = x
    this.y = y
    }
    add() {
        return this.x + this.y
    }
}
const result = new MathHandle(1, 2)
console.log(result.add())
```

ES6的 class 语法实现的结果跟构造函数是一样的，所以 class 其实是语法糖，本质还是构造函数，跟 Java 语言的 class 还不是同个东西。

```js
MathHandle === MathHandle.prototype.constructor // true

result._proto_ === MathHandle.prototype // true

typeof MathHandle // function
```

构造函数的显式原型默认有一个 constructor 属性，该属性的值等于构造函数本身。

new 出来的实例默认有一个隐式原型，值等于构造函数的显示原型。

所以 class 的本质还是构造函数。

### 二、如何实现继承
首先看一下 JS 构造函数是怎样实现继承的

```js
function Animal(){
    this.eat = function() {
        console.log('Animal eat')
    }
}
function Dog() {
    this.shout = function() {
        console.log('Dog shout')
    }
}
```

接下来实现 Dog 继承 Animal 的 eat 方法

```js
Dog.prototype = new Animal()
```

new 一个Animal 的实例并赋值到 Dog 构造函数的显式原型中。

**原理：**
 
  > 把低级构造函数的原型赋值成高级构造函数的实例
  
接下来看一下 ES6 的 class 怎样实现继承：

```js
class Animal{
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat`)
    }
}
```

然后用 extend 实现继承

```js
class Dog extends Animal{
    constructor(name){
        super(name) //在执行Dog构造函数的时候先把Animal的构造器执行一遍
        this.name = name
    }
    shout() {
        console.log(`${this.name} shout`)
    }
}
```

new 个实例看看

```js
const dog = new Dog('柯基')
dog.shout() //柯基shout
dog.eat() //柯基eat
```





