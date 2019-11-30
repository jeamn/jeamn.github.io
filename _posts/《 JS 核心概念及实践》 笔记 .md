---
title: 《 JS 核心概念及实践》 笔记
tags:
  - JavaScript
  - 原型
date: 2017-04-23
---

## 1. 类型判断和 “instanceof”
JS是弱类型语言，JS引擎会根据上下文来“猜测”对象的类型，然后做隐式转换。所以条件判断我们可以这样写：

```
if(datamodel.item){···} 
```

<!-- more -->
其中 datamodel.item 是一个对象。
JS引擎会自动将对象类型转化为布尔类型。

但有时候需要知道变量或参数在运行时的类型，否则JS引擎会报错，所以在调用之前应进行判断，举个栗子：

```js
function handleMessage(message, handle){
    if(typeof handle == "function"){
        return handle(message);
    }else{
        throw new Error("The 2nd argument should be a function");
    }
}
```
有时候typeof不能准确判断类型，比如对象和数组的值均为“object”，可用 **instanceof** 进一步判断：

```js
print(obj instanceof Array); //false
```

## 2. 迷人的this 
在 JAVA 中，this 指代当前对象，有编译期绑定。

在 JS 中，this 是运行期绑定，具备多层含义，使用很灵活。

**简单地概括一下 ：**
作为函数调用时，this 绑定到全局对象；
作为方法调用时，this 绑定到该方法所属的对象。

各举一个栗子：

（1）作为构造函数调用：

```js
function Person(name, age){ 
    this.name = name; 
    this.age = age; 
```
（2）作为对象方法调用：
在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，this 被自然绑定到该对象。

```js
var point = { 
 x : 0, 
 y : 0, 
 moveTo : function(x, y) { 
     this.x = this.x + x; 
     this.y = this.y + y; 
     } 
 }; 

 point.moveTo(1, 1)//this 绑定到当前对象，即 point 对象
```

还有一种是使用 **call** 和 **apply** 调用：

call 和 apply 是函数对象的方法，通常用来修改函数的上下文，函数中的 this 指针将被替换为call 或者 apply 的第一个参数。

```js
var mike = {name: "Mike", age: 20}
var jeamn = {name: "Jeamn", age: 25}
function printName{
    return this.name;
}
print(printName.call(jeamn));//this 为 jeamn
print(printName.call(mike));//this 为 mike

//只有一个参数时，call 和 apply 使用方式一样
print(printName.apply(jeamn));
print(printName.apply(mike));
```

下面举例说明不止一个参数时两者的区别：

call : 若干个参数用逗号隔开

```js
function hello(thing,time) {  
  console.log(this + " says " + thing + time);
}

hello.call("Jeamn", "hello world","today") //=> Jeamn says hello world today
```

apply : 参数组成数组

```js
function hello(thing,time) {  
  console.log(this + " says " + thing + time);
}

hello.apply("Jeamn", ["hello world","today"]) //=> Jeamn says hello world today
```

## 3. 构造函数
“ new 创建了一个新的没有任何属性的对象，然后调用该函数，把新的对象作为 this 关键字的值传递。设计来和 new 运算符一起使用的函数叫做构造函数。”  ----《权威指南》

和普通函数的区别是什么呢？

用 new 关键字调用、函数内部使用this、默认不用返回值、
函数命名首字母建议大写……

##  4. 原型和继承

#### (1) 原型对象和原型链
先来解释一下原型，
JS中一切皆对象。对象是一个 **属性的集合**，另外有一个隐式的对象------原型对象。即，每个对象都有一个*内部链接到另一个对象* 的对象，我们称它为**原型**。（属性的名称为_proto_）

**原型链：**
原型对象又有自己的原型，一直下去，直到达到一个以 **null** 为原型的对象，组成的链称为原型链。(null没有原型)

当JS引擎在访问对象的属性的时候，如果在对象本身中没有找到，则会去原型链中查找，找到直接返回值，找不到返回undefined。

举两个栗子：

```js
//声明一个对象 Base
function Base(name){
    this.name = name;
    this.getName = function(){
        return this.name;
    }
}

//声明一个对象 Child
function Child(id){
    this.id = id;
    this.getId = function(){
        return this.id
    }
}

//将 Child 的原型指向一个新的 Base 对象
Child.prototype = new Base("base");

//实例化一个 Child 对象
var c1 = new Child("child");

//c1 本身具有 getId 方法
print(c1.getId());

//c1从原型链上“继承”了 getName 方法
print(c1.getName());
```

```js
function Person(name, age){
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    }
    this.getAge = function(){
        return this.age
    }
}
var tom = new Person("Tom",39);
var james = new Person("James",30);
```


![GitHub set up-w200](http://ww1.sinaimg.cn/large/8b50d584gy1ffcr5k3mygj22io1w0x6p.jpg)




很显然，通过原型链，可以实现继承，来看下面：

#### (2) 原型继承
JS中没有“子类”和“父类”的概念，也没有“类”和“实例”的区分，所以它的继承是基于原型链。

为了能更好地实现继承，JS的设计者引入 prototype 属性，这个属性包含一个 prototype 对象，存放着所有实例对象需要共享的属性和方法。那些不需要共享的放在了构造函数里面。

实例对象一旦创建，自动引用prototype对象的属性和方法。

#### 总结一下：
    
> 使用原型可以显著减小每个对象所需的内存数量，因为对象可以继承原型链上很多属性，即便是在对象创建以后才添加到原型中的属性，对象也可以继承它。



 
 
 





