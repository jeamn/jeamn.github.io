---
layout:     post
title:      拥抱TypeScript系列一
subtitle:   基本概念、安装编译、数据类型、函数
date:       2019-04-01
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - JavaScript
---

## 一、TypeScript 是什么
- Typescript是由微软开发的一款开源的编程语言
- Typescript是Javascript的超集，遵循最新的ES5/ES6规范。TypeScript扩展了Javascript语法
- TS提供的类型系统可以帮助我们在写代码的时候提供更丰富的语法提示
- 在创建前的编译阶段经过类型系统的检查，就可以避免很多线上的错误

## 二、TypeScript安装和编译
安装
```
npm i typescript -g
```
编译
```
tsc helloworld.ts
```
生成配置文件
```
tsc --init
```
VScode运行
- Terminal->Run Task-> tsc:build 编译
- Terminal->Run Task-> tsc:watch 编译并监听

npm scripts
- npm run 实际上是调用本地的 Shell 来执行对应的 script value，所以理论上能兼容所有 bash 命令
- Shell 在类 Unix 系统上是 /bin/sh，在 Windows 上是 cmd.exe

## 三、数据类型
### 1、布尔类型(boolean)
```js
let married: boolean = false;
```

### 2、数字类型(number)
```js
let age: number = 10;
```

### 3、字符串类型(string)
```js
let firstname: string = 'zfpx';
```

### 4、数组类型(array)
```js
let arr2: number[] = [4,5,6];
let arr3: Array<number> = [7,8,9];
```

### 5、元组类型(tuple)
- 在 TypeScript 的基础类型中，元组（ Tuple ）表示一个已知数量和类型的数组
```js
let people:[string,number] = ['jeamn',5];
people[0].length;
people[1].toFixed(2);
```

### 6、枚举类型(enum)
- 事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
- 比如性别、月份、星期、颜色、单位、学历
#### （1）普通枚举
```js
enum Gender{
    GIRL,
    BOY
}
console.log(`Mike是${Gender.BOY}`);
console.log(`Linda是${Gender.GIRL}`);

enum Week{
    MONDAY=1,
    TUESDAY=2
}
console.log(`今天是星期${Week.MONDAY}`);
```

#### （2）常数枚举
- 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。假如包含了计算成员，则会在编译阶段报错

```js
const enum Colors {
    Red,
    Yellow,
    Blue
}

let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
```
```js
const enum Color {Red, Yellow, Blue = "blue".length};
```

### 7、任意类型(any)
- any就是可以赋值给任意类型
- 第三方库没有提供类型文件时可以使用any
- 类型转换遇到困难时
- 数据结构太复杂难以定义

```js
let root:any=document.getElementById('root');
root.style.color='red';
```
```js
let root:(HTMLElement|null)=document.getElementById('root');
root!.style.color='red';//非空断言操作符
```

### 8、null 和 undefined
- null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined
- strictNullChecks 参数用于新的严格空检查模式,在严格空检查模式下， null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any

```js
let x: number;
x = 1;
x = undefined;    
x = null;   

let y: number | null | undefined;
y = 1;
y = undefined;   
y = null;
```

### 9、void 类型
- void 表示没有任何类型
- 当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。

```js
function greeting(name:string):void {
    console.log('hello',name);
    //当我们声明一个变量类型是 void 的时候，它的非严格模式(strictNullChecks:false)下仅可以被赋值为 null 和 undefined
    //严格模式(strictNullChecks:true)下只能返回undefined
    //return null;
    //return undefined;
}
```

### 10、never类型
- never是其它类型(null undefined)的子类型，代表不会出现的值
#### (1)作为不会返回（ return ）的函数的返回值类型

```js
// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function error(message: string): never {
    throw new Error(message);
}
let result1 = error('hello');
// 由类型推论得到返回值为 never
function fail() {
    return error("Something failed");
}
let result = fail();

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
    while (true) {}
}
```

#### (2)strictNullChecks
- 在 TS 中， null 和 undefined 是任何类型的有效值，所以无法正确地检测它们是否被错误地使用。于是 TS 引入了 --strictNullChecks 这一种检查模式
- 由于引入了 --strictNullChecks ，在这一模式下，null 和 undefined 能被检测到。所以 TS 需要一种新的底部类型（ bottom type ）。所以就引入了 never。

```js
// Compiled with --strictNullChecks
function fn(x: number | string) {
  if (typeof x === 'number') {
    // x: number 类型
  } else if (typeof x === 'string') {
    // x: string 类型
  } else {
    // x: never 类型
    // --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
  }
}
```

#### (3)never 和 void 的区别
- void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。
- 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

### 11、类型推论
- 是指编程语言中能够自动推导出值的类型的能力，它是一些强静态类型语言中出现的特性
- 定义时未赋值就会推论成any类型
- 如果定义的时候就赋值就能利用到类型推论

### 12、包装对象（Wrapper Object）
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
- 所有的原始数据类型都没有属性（property）
- 原始数据类型：布尔值、数值、字符串、null、undefined、Symbol

```js
let name = 'Jeamn';
console.log(name.toUpperCase());

console.log((new String('jeamn')).toUpperCase());
```
- 当调用基本数据类型方法的时候，JavaScript 会在原始数据类型和对象类型之间做一个迅速的强制性切换

```js
let isOK: boolean = true; // 编译通过
let isOK: boolean = Boolean(1) // 编译通过
let isOK: boolean = new Boolean(1); // 编译失败   期望的 isOK 是一个原始数据类型
```

### 13、联合类型
- 联合类型（Union Types）表示取值可以为多种类型中的一种
- 未赋值时联合类型上只能访问两个类型共有的属性和方法

```js
let name: string | number;
console.log(name.toString());
name = 3;
console.log(name.toFixed(2));
name = 'Jeamn';
console.log(name.length);

export {};
```

### 14、类型断言
- 类型断言可以将一个联合类型的变量，指定为一个更加具体的类型
- 不能将联合类型断言为不存在的类型

```js
let name: string | number;
console.log((name as string).length);
console.log((name as number).toFixed(2));
console.log((name as boolean));
```

### 15、字面量类型
- 可以把字符串、数字、布尔值字面量组成一个联合类型

```js
type ZType = 1 | 'One'|true;
let t1:ZType = 1;
let t2:ZType = 'One';
let t3:ZType = true;
```

### 16、字符串字面量 vs 联合类型
- 字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种
- 字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致

## 四、函数
### 1、函数的定义
- 可以指定参数的类型和返回值的类型

```js
function hello(name:string):void {
    console.log('hello',name);
}
hello('jeamn');
```

### 2、函数表达式
- 定义函数类型

```js
type GetUsernameFunction = (x:string,y:string)=>string;
let getUsername:GetUsernameFunction = function(firstName,lastName){
  return firstName + lastName;
}
```

### 3、没有返回值
```js
let hello2 = function (name:string):void {
    console.log('hello2',name);
    return undefined;
}
hello2('jeamn');
```

### 4、可选参数
- 在 TS 中函数的形参和实参必须一样，不一样就要配置可选参数,而且必须是最后一个参数

```js
function print(name:string,age?:number):void {
    console.log(name,age);
}
print('jeamn');
```

### 5、默认参数
```js
function ajax(url:string,method:string='GET') {
    console.log(url,method);
}
ajax('/users');
```

### 6、剩余参数
```js
function sum(...numbers:number[]) {
    return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3));
```

### 7、函数重载
- 在Java中的重载，指的是两个或者两个以上的同名函数，参数不一样
- 在TypeScript中，表现为给同一个函数提供多个函数类型定义

```js
let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
    if (typeof val === 'string') {
        obj.name=val;
    } else {
        obj.age=val;
    }
}
attr('zfpx');
attr(9);
attr(true);
console.log(obj);
```
