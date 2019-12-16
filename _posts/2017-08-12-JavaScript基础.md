---
layout:     post
title:      JavaScript基础
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






