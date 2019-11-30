---
title: 对bind函数的理解----this指针的指向问题
tags:
  - JavaScript
date: 2017-06-01
---
bind一个最主要的用法就是绑定。当我们需要解决如何在另一个函数中保持this上下文，我们就需要bind( )了。    


当我们将this设置到一个变量上，以便在改变了上下文之后继续引用到它。可是结果不令我们满意。
<!--more-->

* 举个栗子：

```js
name = "jeamn";
var User = {
	name: "mike",
	getName:function(){
		alert(this.name);
	}
};
User.getName();   //mike
var func = User.getName;
func();           //jeamn
```
当我们尝试把User的getName方法赋值给一个新的func变量，然后调用，并且希望this指向原来的对象。如果不做特殊处理，一般会丢失原来的对象。因为this指针的指向已经由局部变量转到全局变量。  

使用bind( )方法能够很漂亮的解决这个问题：

```js
var newFunc = User.getName.bind(User);
newFunc();        //mike
```
这样，我们就创建了一个‘this’绑定到User的函数。

.bind( )创建了一个函数，当这个函数在被调用的时候，它的this关键字会被设置成被传入的值（这里只调用bind( )时传入的参数）。

因此，我们传入想要的上下文this（其实就是User）到.bind( )函数中。然后，当回调函数被执行的时候，this便指向User对象。




