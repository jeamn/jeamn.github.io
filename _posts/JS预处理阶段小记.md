---
title: JS预处理阶段小记
Tags: 
  - JavaScript
date: 2017-05-04
---
JS代码在执行之前，会进行预处理。这里分全局预处理和函数预处理：
## 一、全局预处理
预处理阶段把var声明的函数和变量添加到词法环境，即window对象。
**
预处理阶段会处理var声明的变量和function声明的函数，不预处理函数表达式的方法创建的函数，如：var g = function（）    
<!--more-->
这里是先扫描函数声明后扫描由var声明的变量，若：

* 处理函数声明时有冲突，则会覆盖
* 处理变量声明时有冲突，则会忽略


    
举个栗子 ：

```js
alert(f);
function f(){
    console.log('11');
}
var f = 5;
function f(){
    console.log('22');
}
```

这里的结果是输出：


function f(){
    console.log('22');
}

这也说明了在JS里面函数是一等公民，其他的靠边站……

下面看一下预处理阶段函数和变量是这么添加到词法环境的：

```js
                //////////运行结果如下：/////////
alert(a);               //undefined
alert(b);       //没用var声明，不会添加到词法环境中去，会报错
alert(f);       //function(){console.log('f')}
alert(g);       //undefined
var a = 5;      
b = 6
alert(b);       // 6
function f(){
	console.log('f');
}
var g = function(){
	console.log('g');
}
alert(g);     //function(){console.log('g');}

```

预处理阶段完成后才会进行赋值。

## 二、函数预处理
函数预处理阶段，向函数的词法环境添加的顺序如下：

* 1.函数的参数
* 2.内部声明式函数
* 3.内部var变量

***注意点：冲突情况与全局处理一样***

举个栗子：

```js
function f(a,b){
    alert(a);
    alert(b);

	var b = 100;  //变量声明时有冲突，被忽略
	function a(){    //函数声明有冲突，会覆盖前面的a
    }
}
f(1,2);
```
预处理时词法作用域：
{
    a:指向函数
    b:2
    
}

输出结果为：
function a(){    //函数声明有冲突，会覆盖前面的a
    }
2

***注意点：***
> 1. 如果函数形参有两个，而只传了一个实参，那么没传实参的形参在词法环境中将是undefined
> 2. 如果在函数里面变量未用var声明，则该变量不会添加到函数的词法环境，而是会添加到最外层的词法环境，即window全局词法环境


