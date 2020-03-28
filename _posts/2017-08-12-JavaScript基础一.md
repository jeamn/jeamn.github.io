---
layout:     post
title:      JavaScript基础一
date:       2017-08-12
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - JavaScript
---

## 一、JS数据类型————概念篇
### 1、JS 原始数据类型和引用数据类型有哪些？
原始数据类型7种：String、Number、Boolean、Null、Undefined、Symbol、BigInt  
引用数据类型1种：对象Object（包含普通对象Object、数组对象Array、正则对象RegExp、日期对象Date、数学函数Math、函数对象Function）  
### 2、null 是对象吗？为什么?
null 不是对象  
虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object。  
### 3、0.1+0.2为什么不等于0.3？
0.1和0.2在转换成二进制数后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就出现了精度的损失。  
相加后因浮点小数的限制而截断的二进制数字在转换为十进制时就会变成 0.30000000000000004。  
### 4、如何理解BigInt?
是一种新的数据类型，用于当整数值大于Number数据类型支持的范围时。

## 二、JS数据类型————检测篇
### 1、typeof 是否能正确判断类型
对于原始类型来说，除了 null 之外，都可以调用 typeof 显示正确的类型。  
但对于引用数据类型，除了函数之外，都会显示 “object”  
所以采用 typeof 判断对象数据类型是不准确的，可以采用 instanceof ，原理是基于原型链查找的，只要处于原型链上，判断就为 true  
### 2、instanceof 能否判断基本数据类型
能，利用 Symbol.hasInstance ，用于判断某对象是否为某构造器的实例
```js
class MyNumber {  
  static [Symbol.hasInstance](instance) {
    return typeof instance === 'number'
  }
}
console.log(1 instanceof MyNumber); // true
```  
### 3、手动实现一下 instanceof 的功能
```js
function myInstance(left, right){
  if(typeof left !== 'object' || left === null) return false // 基本数据类型直接返回 false
  let proto = Object.getPrototypeOf(left) // 获取传入参数的原型对象
  while(true){
    if(proto == null) return false // 查找到原型链尽头，依旧没找到构造函数
    if(proto == right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```  
### 4、Object.is 和 === 的区别
前者在后者的基础上修复了一些特殊情况下的失误，具体来说就是 +0 和 -0，NaN 和 NaN。  
后者判断中，  
> NaN === NaN 为 false，是不对的，应该为 true。
> +0 === -0 为 true，是不对的，应该为 false  
源码如下：
```js
function is(x, y){
  if(x === y){
    return x !== 0 || y !== 0 || 1/x === 1/y
  } else {
    return x !== x && y !== y
  }
}
```  

## 三、JS数据类型————转换篇
### 1、[] == ![] 结果是什么？为什么？  
== 中，左右两边都需要转换为数字后进行比较。[] 转换为数字是 0，![] 首先是转换为布尔值，由于 [] 作为一个引用类型转换为布尔值为 true，因此 ![] 为 false，再转换为数字为 0。0 == 0，结果为true。  

### 2、JS类型转换有哪几种？
类型转换只有三种，
- 转换成数字  
- 转换成布尔值  
- 转换成字符串  
规则如下：
（1）以下转换为布尔值时：
number：除了0、-0 和 NaN 为 false 之外，其余都为 true  
string：除了空字符串为 false 之外，其余都为 true  
undefined、null：false  
引用类型：true  
（2）以下转换为字符串时：  
number：5 => '5'  
Boolean、函数、Symbol：'true'  
数组：[1,2] => '1,2'  
对象：'[Object Object]'  
（3）以下转换为数字：  
string：'1' => 1，'a' => NaN  
素组：空数组转化为 0，只有一个元素且元素是数字类型转化为数字，其余转化为 NaN  
null：0  
除了数组的引用类型时：NaN  
Symbol：抛错   
   
### 3、== 和 === 有什么区别？
=== 是严格相等，指的是左右两边不仅值要相等，类型也要相等。  
== 对于一般情况，只要值相等，就会返回 true，但还会涉及到一些隐式类型转换，规则如下：  
- 两边的类型是否相同，相同的话就直接比较值得大小；  
- 判断是否是 null 和 undefined，是的话返回 true；  
- 判断是否是 String 和 Number，是的话将 String 转化为 Number再进行比较；  
- 判断其中一方是否是 Boolean，是的话转成 Number 再进行比较；  
- 如果其中一方是 Object，另一方是 String、Number 或者 Symbol，会将 Object 转换成字符串再进行比较；  

## 四、三种常见的内存泄漏
- 1、意外的全局变量    

函数内部未用 var 定义变量，或者函数内部使用了 this 赋值了变量。    
解决方法：在 js 文件头部加上 'use strict'，使用严格模式避免意外的全局变量，此时 this 会指向 undefined。

- 2、被遗忘的计时器或回调函数
未结束的定时器未赋值为 null

- 3、闭包

## 五、理解 JavaScript 中的执行上下文和执行栈
执行上下文：    
是当前 js 代码被解析和执行时所在环境的抽象概念。它定义了变量或函数有权访问的其他数据，决定了他们各自的行为。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。

执行上下文三种类型：   
（1）全局执行上下文：一个，浏览器中是 window，this 指向这个全局对象；   
（2）函数执行上下文：无数个，只有在函数被调用的时候才会创建，每次调用都会创建一个新的执行上下文；   
（3）Eval 函数执行上下文：运行在 eval 函数中的代码。

执行栈也叫调用栈，具有后进先出结构，用于存储在代码执行期间创建的所有执行上下文。

首次运行 js 代码时，会创建一个全局执行上下文并 push 到当前的执行栈中。每当发生函数调用，引擎都会为该函数创建一个新的函数执行上下文并 push 到当前执行栈的栈顶。

运行完函数后，该函数执行上下文会从栈中 pop 出，上下文控制权将移到当前执行栈的下一个执行上下文。

### 执行上下文的创建分两个阶段：  
（1）创建阶段：   
> 确定 this 的值，也称为 This Binding    
> 词法环境组件被创建    
> 变量环境组件被创建    

（2）执行阶段：完成对所有变量的分配，最后执行代码

### This Binding：   
> 全局执行上下文中，this 的值指向全局对象，在浏览器中指向 window 对象，在 nodejs 中指向这个文件的 module 对象。     
> 函数执行上下文中，this 的值取决于函数的调用方式，具体有：默认绑定、隐式绑定、显示绑定、new绑定、箭头函数

### 词法环境两个组成部分：   
（1）环境记录：存储变量和函数声明的实际位置    
（2）对外部环境的引用：可以访问其外部词法环境

### 词法环境两种类型：    
（1）全局环境：是一个没有外部环境的词法环境，其外部引用为 null。拥有一个全局对象（window）及其关联的方法和属性（如数组方法）以及任何用户自定义的全局变量，this 的值指向这个全局对象。    
（2）函数环境：用户在函数中定义的变量被存储在环境记录中，包含了 arguments 对象。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。   

### 变量环境
变量环境也是一种词法环境，因此具有词法环境的所有属性。    
在 ES6 中，词法环境用于存储 `函数声明和变量（let、const）绑定`，变量环境用于存储 `变量（var）绑定`。

### 变量提升原因
在执行上下文创建阶段，函数声明存储在环境中，而 var 定义的变量会被设置为 undefined 。


## 六、对闭包的理解
### 1、什么是闭包？
> 红宝书：闭包是指有权限访问另外一个函数作用域中的变量的函数  
> MDN：闭包是指那些能够访问自由变量的函数（自由变量指的是在函数中使用的但既不是函数参数也不是函数局部变量的变量，其实就是另外一个函数作用域中的变量）   
    
### 2、闭包产生的原因？
（1）首先要明白作用域的概念，在ES5中只存在两种作用域 ---- 全局作用域和函数作用域。当访问一个变量时，解释器会首先在当前作用域查找标识符，如果没有找到，就去父作用域找，直到找到该变量或者不在父作用域中，这就是作用域链。
（2）每一个子函数都会拷贝上级的作用域，形成一个作用域的链条，如：
```js
var a = 1
function f1(){
  var a = 2
  function f2(){
    var a = 3
    console.log(a)
  }
}
```
在这段代码中，f1的作用域指向全局䄦它本身，f2的作用域指向全局、f1和它本身。
（3）闭包产生的本质就是，当前环境中存在指向父级作用域的引用，如：
```js
function f1(){
  var a = 2
  function f2(){
    console.log(a)
  }
  return f2
}
var x = f1()
x()
```
在当前环境中，含有对f2的引用，而f2引用了window、f1、f2的作用域。因此f2可以访问到f1的作用域的变量。就产生了闭包。  

> 当函数返回没有被引用的时候，就会被垃圾回收器回收。但是对于闭包，即使外部函数返回了，函数对象仍会引用它被创建时的作用域对象。

### 3、闭包特性
（1）可以访问当前函数以外的变量  
```js
function fa(){
    var a = 1
    function fb(){
        console.log(a)
    }
    return fb()
}
fa()
```

（2）即使外部函数已经返回，闭包仍能访问外部函数定义的变量
```js
function fa(){
    var a = 1
    function fb(){
        console.log(a)
    }
    return fb
}
let fc = fa()
fc()
```

（3）闭包可以更新外部变量的值
```js
function fa(){
    var a = 1
    function fb(){
        a = 2
        console.log(a)
    }
    return fb
}
let fc = fa()
fc()
```

### 4、闭包有哪些表现形式？
（1）返回一个函数
（2）作为函数参数传递
```js
var a = 1
function foo(){
  var a = 2
  function baz(){
    console.log(a)
  }
  bar(baz)
}
function bar(fn){
  fn()
}
foo() // 输出2，而不是1
```
（3）在定时器、事件监听、Ajax请求、跨窗口通信、或者任何异步中，只要使用了回调函数，实际就是在使用闭包。  
```js
// 定时器
setTimeout(function timeHandler(){
  console.log('111');
}，100)

// 事件监听
$('#app').click(function(){
  console.log('DOM Listener');
})
```
（4）IIFE创建闭包，保存了全局作用域和当前函数的作用域，因此可以访问全局的变量。   
```js
var a = 2
(function(){
  console.log(a)
})()
```
### 5、如何解决下面的循环输出问题
```js
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```
解释：因为 setTimeout 是宏任务，由于 JS 中单线程 eventLoop 机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后，setTimeout 中的回调才依次执行，但输出 i 的时候当前作用域没有 i，就往上一级找，发现 i 的时候，循环已经结束。
解决方法：
（1）IIFE，每次for循环时，把此时的 i 变量传递到定时器中，
```js
for(var i = 1;i <= 5;i++){
  (function(j){
    setTimeout(function timer(){
      console.log(j)
    }, 0)
  })(i)
}
```
（2）给定时器传入第三个参数，作为timer函数的第一个参数，
```js
for(var i=1;i<=5;i++){
  setTimeout(function timer(j){
    console.log(j)
  }, 0, i)
}
```
（3）使用 ES6 中的 let
```js
for(let i = 1; i <= 5; i++){
  setTimeout(function timer(){
    console.log(i)
  },0)
}
```

## 七、作用域链和原型链
### 1、作用域链   
当访问一个变量时，解释器会首先在当前作用域查找标识符，如果没找到会去父作用域找，直到找到该变量的标识符或者不在父作用域中，这就是作用域链。作用域链的顶端是全局对象，在全局环境中定义的变量会绑定到全局对象中。   

### 2、原型链    
在 JavaScript 中，一共有两种类型的值，原始值和对象值。每个对象都有一个 `__proto__` 属性，此属性指向该对象的构造函数的原型。所以对象可以通过 `__proto__` 与上游的构造函数的原型对象连接起来，而上游的原型对象也有一个 `__proto__` 属性，这样就形成了原型链。原型链的顶端是 null，即 `Object.prototype.__proto__`。

对象的 hasOwnProperty() 可以检查自身中是否含有该属性。

使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true。

两者区别：   
一般来说，作用域链是针对变量的，js里面大的范围上来说，只有两种作用域，全局作用域和函数内部作用域，如果函数1里面又定义了函数2（一般都是匿名函数）， 那么就有了这么一个作用域链全局作用域==>函数1作用域==>函数2作用域；特点是函数1里面可以直接使用全局作用域的变量，函数2里面可以直接使用全局作用域和函数1作用域的变量。    
而原型链的话，一般是定义构造函数时用到。可以认为是针对构造函数的或者说针对构造函数对应的类的。原型链的头部就是Object类/构造函数，如果有构造函数1.prototype = 构造函数2；那么也就有这么一个原型链； Object ==> 构造函数1 ==> 构造函数2，这样的好处是构造函数2对应的类，可以拥有构造函数1 和Object中的属性，js没有对应继承的关键字，所以用原型链来模拟继承的效果。

两者在查找时的区别：    
如果去查找一个普通对象的属性，但是在当前对象和原型上都找不到时，会返回 undefined，    
```js
function Animal(name){
    this.name = name;
}
Animal.prototype.name = 'mike'
function Dog(dogName){
    this.dogName = dogName;
}
//继承
Dog.prototype = Object.create(Animal.prototype);
var dog1 = new Dog('泰迪');
console.log(dog1.name)
```

但查找的属性在作用域链中不存在的话就会抛出 ReferenceError。

### 原型对象和构造函数有什么关系？      
在 js 中，每当定义一个函数数据类型的时候，都会自带一个 prototype 属性，这个属性指向函数的原型对象；
当函数经过 new 调用时，这个函数就成为了构造函数，会返回一个全新的实例对象，这个实例对象中有一个 __proto__ 属性，指向构造函数的原型对象。

## 八、闭包与作用域链
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope(); // foo指向函数f
foo();					// 调用函数f()
```

执行过程如下：
1、进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈；    
2、全局执行上下文初始化；     
3、执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈；    
4、checkscope 执行上下文初始化，创建变量对象、作用域链、this 等；    
5、checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出；    
6、执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈；    
7、f 执行上下文初始化，创建变量对象、作用域链、this 等；    
8、f 函数执行完毕，f 函数执行上下文从执行上下文栈中弹出；

当函数 f 执行的时候，checkscope 函数的执行上下文已经被销毁，那么函数 f 是如何获取到 scope 变量的？

解释：函数 f 执行上下文维护了一个作用域链，会指向 checkscope 的作用域，作用域链是一个数组，子函数会保存它所有的父级作用域，指向关系为：当前作用域 -> 父作用域 -> 祖父作用域 -> ··· -> 全局作用域。所以 f 函数维护着 checkscope 的作用域，才能访问到变量 scope。

这就是闭包实现的关键：通过函数的作用域链找到自由变量。

总结：从理论上，所有的函数都是闭包，因为他们都在创建的时候就将上层执行上下文的数据保存起来了。普通函数在访问全局变量就相当于是在访问自由变量。而从实践的角度，以下函数才算是闭包：即使创建函数的上下文已经销毁，它仍然存在（比如内部函数从父函数中返回）；或者在代码中引用了自由变量。

## 九、this解析
