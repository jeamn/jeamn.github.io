---
layout:     post
title:      拥抱TypeScript系列四
subtitle:   结构类型系统、类型保护
date:       2019-04-15
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - TypeScript
---

## 一、结构类型系统
### 1、接口的兼容性
- 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
- 原理是Duck-Check,就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的

```js
interface Animal {
    name: string;
    age: number;
}

interface Person {
    name: string;
    age: number;
    gender: number
}
// 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal: Animal): string {
    return animal.name;
}

let p = {
    name: 'jeamn',
    age: 10,
    gender: 0
}

getName(p);
//只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
let a: Animal = {
    name: 'jeamn',
    age: 10,
    gender: 0
}
```

### 2、基本类型的兼容性
```js
//基本数据类型也有兼容性判断
let num : string|number;
let str:string='jeamn';
num = str;

//只要有toString()方法就可以赋给字符串变量
let num2 : {
  toString():string
}

let str2:string='mike';
num2 = str2;
```

### 3、类的兼容性
- 在TS中是结构类型系统，只会对比结构而不在意类型

```js
class Animal{
    name:string
}
class Bird extends Animal{
   swing:number
}

let a:Animal;
a = new Bird();

let b:Bird;
//并不是父类兼容子类，子类不兼容父类
b = new Animal();
```
```js
class Animal{
  name:string
}
//如果父类和子类结构一样，也可以的
class Bird extends Animal{}

let a:Animal;
a = new Bird();

let b:Bird;
b = new Animal();
```
```js
//甚至没有关系的两个类的实例也是可以的
class Animal{
  name:string
}
class Bird{
  name:string
}
let a:Animal ;
a = new Bird();
let b:Bird;
b = new Animal();
```

### 4、函数的兼容性
- 比较函数的时候是要先比较函数的参数，再比较函数的返回值

#### (1)比较参数
```js
type sumFunc = (a:number,b:number)=>number;
let sum:sumFunc;
function f1(a:number,b:number):number{
  return a+b;
}
sum = f1;

//可以省略一个参数
function f2(a:number):number{
   return a;
}
sum = f2;

//可以省略二个参数
function f3():number{
    return 0;
}
sum = f3;

 //多一个参数可不行
function f4(a:number,b:number,c:number){
    return a+b+c;
}
sum = f4;
```

#### (2)比较返回值
```js
type GetPerson = ()=>{name:string,age:number};
let getPerson:GetPerson;
//返回值一样可以
function g1(){
    return {name:'jeamn',age:10};
}
getPerson = g1;
//返回值多一个属性也可以
function g2(){
    return {name:'jeamn',age:10,gender:'male'};
}
getPerson = g2;
//返回值少一个属性可不行
function g3(){
    return {name:'jeamn'};
}
getPerson = g3;
//因为有可能要调用返回值上的方法
getPerson().age.toFixed();
```

### 5、函数参数的协变
- 目标如果能够兼容源就是可以的

```js
type LogFunc = (a:number|string)=>void;
let log:LogFunc;

function log1(a:number|string|boolean){
  console.log(a);
}
//目标如果能够兼容源就是可以的
log = log1;
```

### 6、泛型的兼容性
- 泛型在判断兼容性的时候会先判断具体的类型,然后再进行兼容性判断

```js
//接口内容为空没用到泛型的时候是可以的
//1.接口内容为空没用到泛型的时候是可以的
interface Empty<T>{}
let x!:Empty<string>;
let y!:Empty<number>;
x = y;

//2.接口内容不为空的时候不可以
interface NotEmpty<T>{
  data:T
}
let x1!:NotEmpty<string>;
let y1!:NotEmpty<number>;
x1 = y1;

//实现原理如下,称判断具体的类型再判断兼容性
interface NotEmptyString{
    data:string
}

interface NotEmptyNumber{
    data:number
}
let xx2!:NotEmptyString;
let yy2!:NotEmptyNumber;
xx2 = yy2;
```

### 7、枚举的兼容性
- 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
- 不同枚举类型之间是不兼容的

```js
//数字可以赋给枚举
enum Colors {Red,Yellow}
let c:Colors;
c = Colors.Red;
c = 1;
c = '1';

//枚举值可以赋给数字
let n:number;
n = 1;
n = Colors.Red;
```

## 二、类型保护
- 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
- 类型保护就是能够通过关键字判断出分支中的类型

### 1、typeof 类型保护
```js
function double(input: string | number | boolean) {
    if (typeof input === 'string') {
        return input + input;
    } else {
        if (typeof input === 'number') {
            return input * 2;
        } else {
            return !input;
        }
    }
}
```

### 2、instanceof 类型保护
```js
class Animal {
    name!: string;
}
class Bird extends Animal {
    swing!: number
}
function getName(animal: Animal) {
    if (animal instanceof Bird) {
        console.log(animal.swing);
    } else {
        console.log(animal.name);
    }
}
```

### 3、null保护
- 如果开启了 strictNullChecks 选项，那么对于可能为 null 的变量不能调用它上面的方法和属性

```js
function getFirstLetter(s: string | null) {
    //第一种方式是加上null判断
    if (s == null) {
        return '';
    }
    //第二种处理是增加一个或的处理
    s = s || '';
    return s.charAt(0);
}
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
    function log() {
        console.log(s!.trim());
    }
    s = s || '';
    log();
    return s.charAt(0);
}
```

### 4、链判断运算符
- 链判断运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?.
- 如果运算符左侧的操作数 ?. 计算为 undefined 或 null，则表达式求值为 undefined 。否则，正常触发目标属性访问，方法或函数调用。

```js
a?.b; //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
a == null ? undefined : a.b;

a?.[x]; //如果a是null/undefined,那么返回undefined，否则返回a[x]的值
a == null ? undefined : a[x];

a?.b(); // 如果a是null/undefined,那么返回undefined
a == null ? undefined : a.b(); //如果a.b不函数的话抛类型错误异常,否则计算a.b()的结果

a?.(); //如果a是null/undefined,那么返回undefined
a == null ? undefined : a(); //如果A不是函数会抛出类型错误，否则调用a这个函数
```
> 链判断运算符 还处于 stage1 阶段,TS 也暂时不支持

### 5、可辨识的联合类型
- 就是利用联合类型中的共有字段进行类型保护的一种技巧
- 相同字段的不同取值就是可辨识

```js
interface WarningButton{
  class:'warning',
  text1:'修改'
}
interface DangerButton{
  class:'danger',
  text2:'删除'
}
type Button = WarningButton|DangerButton;
function getButton(button:Button){
 if(button.class=='warning'){
  console.log(button.text1);
 }
 if(button.class=='danger'){
  console.log(button.text2);
 }
}
```

### 6、in操作符
- in 运算符可以被用于参数类型的判断

```js
interface Bird {
    swing: number;
}

interface Dog {
    leg: number;
}

function getNumber(x: Bird | Dog) {
    if ("swing" in x) {
      return x.swing;
    }
    return x.leg;
}
```

### 7、自定义的类型保护
- TypeScript 里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
-要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
- 类型谓词的语法为 parameterName is Type 这种形式，其中 parameterName 必须是当前函数签名里的一个参数名`

```js
interface Bird {
  swing: number;
}

interface Dog {
  leg: number;
}

//没有相同字段可以定义一个类型保护函数
function isBird(x:Bird|Dog): x is Bird{
  return (<Bird>x).swing == 2;
  return (x as Bird).swing == 2;
}
function getAnimal(x: Bird | Dog) {
  if (isBird(x)) {
    return x.swing;
  }
  return x.leg;
}
```