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
  if(typeof left !== 'object' && left === null) return false // 基本数据类型直接返回 false
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

## 四、谈谈你对闭包的理解
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

### 3、闭包有哪些表现形式？
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
### 4、如何解决下面的循环输出问题
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

## 五、谈谈你对原型链的理解
（1）原型对象和构造函数有什么关系？
在 js 中，每当定义一个函数数据类型的时候，都会自带一个 prototype 属性，这个属性指向函数的原型对象；
当函数经过 new 调用时，这个函数就成为了构造函数，会返回一个全新的实例对象，这个实例对象中有一个 __proto__ 属性，指向构造函数的原型对象。
（2）描述一下原型链
js 对象通过 prototype 属性指向父类对象，直到指向 Object 为止，这样就形成了一个原型指向的链条，即原型链。
对象的 hasOwnProperty() 可以检查自身中是否含有该属性。
使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true。


## 六、JavaScript内存机制————数据是如何存储的？
基本数据类型用栈存储，引用数据类型和闭包用堆存储。

## 七、如何理解EventLoop————宏任务和微任务篇
在 JS 中，常见的任务有，
- 1、渲染事件
- 2、用户交互事件
- 3、js脚本执行
- 4、网络请求、文件读写事件

为了让这些任务有条不紊地执行，V8 采用了队列的方式来存储这些任务，即先来的先执行。   

普通任务队列和延迟队列中的任务，都属于宏任务。   

对于每个宏任务，其内部都有一个微任务队列。

引入微任务的初衷是为了解决异步回调的问题，对于异步回调的处理，总结起来有两种方式：  
（1）将异步回调，进行宏任务队列的入队操作；  
（2）将异步回调放到当前宏任务的末尾；

第一种执行回调的时机应该是在前面所有宏任务完成之后，若现在的任务队列非常长，回调得不到执行，会造成卡顿；  
第二种则是，在每一个宏中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空直接执行下一个宏任务，如果不为空，依次执行微任务，直到执行完才去执行下一个宏任务。

常见的微任务有：MutationObserver、Promise.then（或.reject）以及以 Promise 为基础开发的其他技术（如fetch API），还包括 V8 的垃圾回收过程。

## 八、如何理解EventLoop————node.js篇
### 1、nodejs 的 eventLoop 分为五个阶段：
（1）timer 阶段：执行定时器回调的阶段。会检查定时器（setTimeout、setInterval），如果到了时间，就执行回调。   
（2）I/O 异常回调阶段：第一阶段结束后，当没有等待到的异步事件的响应时，nodejs 会进入到 I/O 异常的回调阶段。比如 TCP 连接遇到拒绝，就会在这个时候执行回调。   
（3）poll 阶段：当 nodejs 中有异步操作，比如文件 I/O、网络 I/O 等操作做完了，就会通过 'data'、'connect' 等事件使得事件循环到达 poll 阶段。到达 poll 阶段后，如果当前已经存在定时器且到时间了，拿出来执行，eventLoop 将回到 timer 阶段；如果没有定时器，会去看回调函数队列。如果队列不为空，拿出队列中的方法依次执行；如果队列为空，检查是否有 setImmdiate 的回调。有则前往 check 极端；没有则继续等待（相当于阻塞一段时间），等待 callback 函数加入队列，加入后会立即执行。一段时间后，会自动进入 check 阶段。   
（4）check 阶段：直接执行 setImmdiate 的回调。   
（5）关闭事件的回调阶段

### 2、node 版本影响执行结果：
node 版本 >= 11的，它会和浏览器表现一致，一个定时器运行完立即执行响应的微任务。   
小于11的情况下，对定时器的处理是：若一个定时器任务出队并执行完，发现队首的任务仍然是一个定时器，那么会将微任务暂时保存直接去执行新的定时器任务，执行完后，再一一执行中途产生的微任务。

### 3、nodejs 和 浏览器关于eventLoop的主要区别
浏览器中的微任务是在每个相应的宏任务中执行的，而 nodejs 中的微任务是在不同阶段执行的。

### 4、关于 process.nextTick 的一点说明
process.nextTick 是一个独立于 eventLoop 的任务队列，在每一个 eventLoop 阶段完成后悔去检查这个队列，如果有任务，会让这部分任务 `优先于微任务` 执行。

