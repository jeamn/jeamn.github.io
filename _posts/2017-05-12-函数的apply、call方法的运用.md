---
layout:     post
title:      函数的apply、call方法的运用
date:       2017-05-12
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - JavaScript
---
JavaScript为函数对象定义了两个方法：apply和call，          
它们的作用都是将函数绑定到另外一个对象上去运行，两者仅在定义参数的方式有所区别:       
 

```js
Function.prototype.apply(thisArg,argArray);//数组
Function.prototype.call(thisArg[,arg1[,arg2...]]);//多个参数
```

从函数原型可以看到，第一个参数都被取名为thisArg，即所有函数内部的this指针都会被赋值为thisArg，这样做的目的是实现将函数作为另外一个对象的方法运行。
<!--more-->

* 下面代码演示下：
定义一个函数func1，具有属性p和方法A

```js
function func1(){
    this.p = "func1-";
    this.A = function(arg){
        alert(this.p + arg);
    }
}
```
定义一个函数func2,具有属性p和方法B

```js
function func2(){
    this.p = "func2-";
    this.A = function(arg){
        alert(this.p + arg);
    }
}
```
然后创建实例

```js
var obj1 = new func1();
var obj2 = new func2();
obj1.A("byA");           //显示func1-byA
obj2.B("byB");           //显示func2-byB

```
用apply和call时

```js
obj1.A.apply(obj2,["byA"]);   //func2-byA
obj2.B.apply(obj1,["byB"]);   //func1-byB
obj1.A.call(obj2,"byA");      //func2-byA
obj2.B.call(obj1,"byB");      //func1-byB
```

可以看出，obj1的方法A被绑定到obj2运行后，整个函数A的运行环境就转移到了obj2，即this指针指向了obj2。同样obj2的函数B也可以绑定到obj1对象去运行。

简单来说，就是apply和call这两个关键字在运行时，能将运行环境进行转移。在继承和包装的时候回特别用到。

与argument的length属性不同，函数对象还有一个属性length，它表示函数定义时所指定参数的个数，而非调用时实际传递的参数个数。
利用这个性质可以判断函数中参数的个数。

```js
function sum(a,b){
    return a+b;
}
alert(sum.length);    //2
```

JS中出现同名函数时，后者会覆盖前者。




