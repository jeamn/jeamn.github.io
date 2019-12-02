---
layout:     post
title:      拥抱TypeScript系列五
subtitle:   类型变换、类型声明
date:       2019-04-23
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - JavaScript
---

## 一、类型变换
### 1、交叉类型
- 交叉类型（Intersection Types）表示将多个类型合并为一个类型
```js
interface Bird {
  name: string,
  fly(): void
}
interface Person {
  name: string,
  talk(): void
}
type BirdPerson = Bird & Person;
let p: BirdPerson = { name: 'jeamn', fly() { }, talk() { } };
p.fly;
p.name
p.talk;
```

### 2、typeof
- 可以获取一个变量的类型
```js
//先定义类型，再定义变量
type People = {
    name:string,
    age:number,
    gender:string
}
let p1:People = {
    name:'jeamn',
    age:10,
    gender:'male'
}
```
```js
//先定义变量，再定义类型
let p1 = {
    name:'jeamn',
    age:10,
    gender:'male'
}
type People = typeof p1;
function getName(p:People):string{
    return p.name;
}
getName(p1);
```

### 3、索引访问操作符
- 可以通过[]获取一个类型的子类型
```js
interface Person{
    name:string;
    age:number;
    job:{
        name:string
    };
    interests:{name:string,level:number}[]
}
let FrontEndJob:Person['job'] = {
    name:'jeamn'
}
let interestLevel:Person['interests'][0]['level'] = 2;
```

### 4、keyof
- 索引类型查询操作符
```js
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person;

function getValueByKey(p:Person,key:PersonKey){
  return p[key];
}
let val = getValueByKey({name:'jeamn',age:10,gender:'male'},'name');
console.log(val);
```

### 5、映射类型
```js
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person]?:Person[Key]
}

let p1:PartPerson={};
//也可以使用泛型
type Part<T> = {
  [key in keyof T]?:T[key]
}
let p2:Part<Person>={};
```

### 6、内置工具类型
- TS 中内置了一些工具类型来帮助我们更好地使用类型系统
#### (1)Partial
- Partial 可以将传入的属性由非可选变为可选，具体使用如下：
```js
type Partial<T> = { [P in keyof T]?: T[P] };

interface A {
  a1: string;
  a2: number;
  a3: boolean;
}
type aPartial = Partial<A>;

const a: aPartial = {}; // 不会报错
```

#### (2)Required
- Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。
```js
//type Required<T> = { [P in keyof T]-?: T[P] };

interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
/**
 * type Require<T> = { [P in keyof T]-?: T[P] };
 */
let p:Required<Person> = {
  name:'jeamn',
  age:10,
  //gender:'male'
}
```

#### (3)Readonly
- Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现。
```js
interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
//type Readonly<T> = { readonly [P in keyof T]: T[P] };
let p:Readonly<Person> = {
  name:'jeamn',
  age:10,
  gender:'male'
}
p.age = 11;
```

#### (4)Pick
- Pick 能够帮助我们从传入的属性中摘取某一项返回
```js
interface Animal {
  name: string;
  age: number;
}
/**
 * From T pick a set of properties K
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
// 摘取 Animal 中的 name 属性
type AnimalSub = Pick<Animal, "name">; //{ name: string; }
let a:AnimalSub = {
    name:'jeamn',
    age:10
}
```

#### (5)映射类型修饰符的控制
- TypeScript中增加了对映射类型修饰符的控制
- 具体而言，一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除
- TS 中部分内置工具类型就利用了这个特性（Partial、Required、Readonly...），可以参考 Partial、Required 的实现

### 7、交叉类型
- 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
#### (1)定义条件类型
```js
interface Fish {
    name: string
}
interface Water {
    name: string
}
interface Bird {
    name: string
}
interface Sky {
    name: string
}
//三元运算符
type Condition<T> = T extends Fish ? Water : Sky;
let condition: Condition<Fish> = { name: '水' };
```

#### (2)条件类型的分发
```js
interface Fish {
    fish: string
}
interface Water {
    water: string
}
interface Bird {
    bird: string
}
interface Sky {
    sky: string
}

type Condition<T> = T extends Fish ? Water : Sky;
//(Fish extends Fish ? Water : Sky) | (Bird extends Fish ? Water : Sky)
// Water|Sky
let condition1: Condition<Fish | Bird> = { water: '水' };
let condition2: Condition<Fish | Bird> = { sky: '天空' };
```

#### (3)内置条件类型
- TS 在内置了一些常用的条件类型，可以在 lib.es5.d.ts 中查看：

##### 1) Exclude
从 T 可分配给的类型中排除 U
type  E = Exclude<string|number,string>;
let e:E = 10;
##### 2) Extract
从 T 可分配的类型中提取 U
type  E = Extract<string|number,string>;
let e:E = '1';
##### 3) NonNullable
从 T 中排除 null 和 undefined
type  E = NonNullable<string|number|null|undefined>;
let e:E = null;
##### 4) ReturnType
- 获取函数类型的返回类型 
```js 
function getUserInfo() { return { name: "jeamn", age: 10 }; }
// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo type UserInfo = ReturnType;
const userA: UserInfo = { name: "jeamn", age: 10 };
```

##### 5) InstanceType<T>
-  获取构造函数类型的实例类型
```js
class Person{
  name:string;
  constructor(name){
    this.name = name;
  }
  getName(){console.log(this.name)}
}

type  P = InstanceType<typeof Person>;
let p:P = {name:'jeamn',getName(){}};
```

## 二、类型声明
- 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
- 类型声明在编译的时候都会被删除，不会影响真正的代码
### 1、普通类型声明
```js
declare const $:(selector:string)=>{ //变量
    click():void;
    width(length:number):void;
};
declare let name:string;  //变量
declare let age:number;  //变量
declare function getName():string;  //方法
declare class Animal{name:string}  //类

interface Person{ //声明接口
    name:string
}

type Student = { //声明类型
    name:string
}|'string';
```

### 2、外部枚举
- 外部枚举是使用declare enum定义的枚举类型
- 外部枚举用来描述已经存在的枚举类型的形状
```js
外部枚举用来描述已经存在的枚举类型的形状
declare enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```
- declare 定义的类型只会用于编译时的检查，编译结果中会被删除。上例的编译结果如下
```js
var seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```
- 也可以同时使用declare 和 const
```js
declare const enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
];
```
编译结果
```js
var seasons = [
    0 /* Spring */,
    1 /* Summer */,
    2 /* Autumn */,
    3 /* Winter */
];
```

### 3、namespace
- 如果一个全局变量包括了很多子属性，可能使用namespace
- 在声明文件中的namespace表示一个全局变量包含很多子属性
- 在命名空间内部不需要使用 declare 声明属性或方法
```js
declare namespace ${
    function ajax(url:string,settings:any):void;
    let name:string;
    namespace fn {
        function extend(object:any):void;
    }
}
$.ajax('/api/users',{});
$.fn.extend({
    log:function(message:any){
        console.log(message);
    }
});
export {};
```

### 4、类型声明文件
- 我们可以把类型声明放在一个单独的类型声明文件中
- 可以在类型声明文件中使用类型声明
- 文件命名规范为*.d.ts
- 观看类型声明文件有助于了解库的使用方式
#### (1)typings\jquery.d.ts
```js
declare const $:(selector:string)=>{
    click():void;
    width(length:number):void;
}
```

#### (2)tsconfig.json
```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",  
    "outDir":"lib"
  },
  "include": [
    "src/**/*",
    "typings/**/*"
  ]
}
```

#### (3)test.js
```js
$('#button').click();
$('#button').width(100);
export {};
```

### 5、第三方声明文件
- 可以安装使用第三方的声明文件
- @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
- JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
- 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
- 这些内置对象的类型声明文件，就包含在TypeScript 核心库的类型声明文件中

#### (1)使用jquery
```js
//对于common.js风格的模块必须使用 import * as 
import * as jQuery from 'jquery';
jQuery.ajax('/user/1');
```

#### (2)安装声明文件
```js
cnpm i @types/jquery -S
```

#### (3)自己编写声明文件  
types\jquery\index.d.ts
```js
declare function jQuery(selector:string):HTMLElement;
declare namespace jQuery{
  function ajax(url:string):void
}
export default jQuery;
```
tsconfig.json
- 如果配置了paths,那么在引入包的的时候会自动去paths目录里找类型声明文件
- 在 webpack 中，我们可以通过配置 alias 的形式来为项目里的文件做映射。在 tsconfig.json 中，我们同样也可以做路径的映射
- 在 tsconfig.json 中，我们通过 compilerOptions 里的 paths 属性来配置路径映射。 tsconfig.json
```js
{
    "baseUrl": "./",// 使用 paths 属性的话必须要指定 baseUrl 的值
    "paths": {
        "*":["types/*"]
    }
}
```

#### (4) npm声明文件可能的位置
- node_modules/jquery/package.json
- "types":"types/xxx.d.ts"
- node_modules/jquery/index.d.ts
- node_modules/@types/jquery/index.d.ts

### 6、扩展全局变量的类型
#### (1) 扩展局部变量类型
```js
interface String {
    double():string;
}

String.prototype.double = function(){
    return this+'+'+this;
}
console.log('hello'.double());

interface Window{
    myname:string
}
console.log(window.myname);
//export {}
```

#### (2) 模块内全局扩展
types\global\index.d.ts
```js
declare global{
    interface String {
        double():string;
    }
    interface Window{
        myname:string
    }
}

export  {}
```
```js
"include": [
    "src/**/*",
    "types/**/*"
]
```

### 7、合并声明
- 同一名称的两个独立声明会被合并成一个单一声明
- 合并后的声明拥有原先两个声明的特性
- 类既可以作为类型使用，也可以作为值使用，接口只能作为类型使用
```js
class Person{
    name:string=''
}
let p1:Person;//作为类型使用
let p2 = new Person();//作为值使用

interface Animal{
    name:string
}
let a1:Animal;
let a2 = Animal;//接口类型不能用作值
```

#### (1) 合并类型声明 
- 可以通过接口合并的特性给一个第三方为扩展类型声明
use.js
```js
interface Animal{
    name:string
}
let a1:Animal={name:'jeamn',age:10};
console.log(a1.name);
console.log(a1.age);
```
types\animal\index.d.ts
```js
interface Animal{
    age:number
}
```

#### (2) 使用命名空间扩展类
- 我们可以使用 namespace 来扩展类，用于表示内部类
```js
class Form {
  username: Form.Item='';
  password: Form.Item='';
}
//Item为Form的内部类
namespace Form {
  export class Item {}
}
let item:Form.Item = new Form.Item();
console.log(item);
```

#### (3) 使用命名空间扩展函数
- 我们也可以使用 namespace 来扩展函数
```js
function greeting(name: string): string {
    return greeting.words+name;
}

namespace greeting {
    export let words = "Hello,";
}

console.log(greeting('jeamn'))
```

#### (4) 使用命名空间扩展枚举类型
```js
enum Color {
    red = 1,
    yellow = 2,
    blue = 3
}

namespace Color {
    export const green=4;
    export const purple=5;
}
console.log(Color.green)
```

### 8、生成声明文件
- 把TS编译成JS后丢失类型声明，我们可以在编译的时候自动生成一份JS文件
```js
{
  "compilerOptions": {
     "declaration": true, /* Generates corresponding '.d.ts' file.*/
  }
}
```