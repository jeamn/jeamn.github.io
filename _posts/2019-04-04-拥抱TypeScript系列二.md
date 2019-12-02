---
layout:     post
title:      拥抱TypeScript系列二
subtitle:   基本概念、安装编译、数据类型、函数
date:       2019-04-01
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - JavaScript
---

## 五、类
### 1、如何定义类
- "strictPropertyInitialization": true / 启用类属性初始化的严格检查/
- name!:string
```js
class Person{
    name:string;
    getName():void{
        console.log(this.name);
    }
}
let p1 = new Person();
p1.name = 'jeamn';
p1.getName();
```
### 2、存取器
- 在 TypeScript 中，我们可以通过存取器来改变一个类中属性的读取和赋值行为
- 构造函数
    - 主要用于初始化类的成员变量属性
    - 类的对象创建时自动调用执行
    - 没有返回值
```js
class User {
    myname:string;
    constructor(myname: string) {
        this.myname = myname;
    }
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('jeamn');
user.name = 'mike'; 
console.log(user.name); 
```
### 3、参数属性
```js
class User {
    constructor(public myname: string) {}
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('jeamn');
console.log(user.name); 
user.name = 'mike'; 
console.log(user.name);
```
### 4、readonly
- readonly 修饰的变量只能在构造函数中初始化
- 在 TypeScript 中，const 是常量标志符，其值不能被重新分配
- TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly
- readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查（在支持 const 语法的 JavaScript 运行时环境中）
```js
class Animal {
    public readonly name: string
    constructor(name:string) {
        this.name = name;
    }
    changeName(name:string){
        this.name = name;
    }
}

let a = new Animal('jeamn');
a.changeName('mike');
```
### 5、继承
- 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
- 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
- super可以调用父类上的方法和属性
```js
class Person {
    name: string;//定义实例的属性，默认省略public修饰符
    age: number;
    constructor(name:string,age:number) {//构造函数
        this.name=name;
        this.age=age;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Student extends Person{
    no: number;
    constructor(name:string,age:number,no:number) {
        super(name,age);
        this.no=no;
    }
    getNo():number {
        return this.no;
    }
}
let s1=new Student('jeamn',10,1);
console.log(s1);
```
### 6、类里面的修饰符
```js
class Father {
    public name: string;   //类里面 子类 其它任何地方外边都可以访问
    protected age: number; //类里面 子类 都可以访问,其它任何地方不能访问
    private money: number; //类里面可以访问，子类和其它任何地方都不可以访问
    constructor(name:string,age:number,money:number) {//构造函数
        this.name=name;
        this.age=age;
        this.money=money;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Child extends Father{
    constructor(name:string,age:number,money:number) {
        super(name,age,money);
    }
    desc() {
        console.log(`${this.name} ${this.age} ${this.money}`);
    }
}

let child = new Child('jeamn',10,1000);
console.log(child.name);
console.log(child.age);
console.log(child.money);
```
### 7、静态属性 静态方法
```js
class Father {
    static className='Father';
    static getClassName() {
        return Father.className;
    }
    public name: string;
    constructor(name:string) {//构造函数
        this.name=name;
    }

}
console.log(Father.className);
console.log(Father.getClassName());
```
### 8、抽象类
- 抽象描述一种抽象的概念，无法被实例化，只能被继承
- 无法创建抽象类的实例
- 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
```js
abstract class Animal {
    name!:string;
    abstract speak():void;
}
class Cat extends Animal{
    speak(){
        console.log('喵喵喵');
    }
}
let animal = new Animal();//Cannot create an instance of an abstract class
animal.speak();
let cat = new Cat();
cat.speak();
```
- 访问控制修饰符 | private protected public
- 只读属性 | readonly
- 静态属性 | static
- 抽象类、抽象方法 | abstract
### 9、抽象类 vs 接口
- 不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
- 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
- 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
- 抽象类也可以实现接口
```js
abstract class Animal{
    name:string;
    constructor(name:string){
      this.name = name;
    }
    abstract speak():void;
}
interface Flying{
    fly():void
}
class Duck extends Animal implements Flying{
    speak(){
        console.log('汪汪汪');
    }
    fly(){
        console.log('我会飞');
    }
}
let duck = new Duck('mike');
duck.speak();
duck.fly();
```
### 10、抽象方法
- 抽象类和方法不包含具体实现，必须在子类中实现
- 抽象方法只能出现在抽象类中
- 子类可以对抽象类进行不同的实现
```js
abstract class Animal{
    abstract speak():void;
}
class Dog extends Animal{
    speak(){
        console.log('小狗汪汪汪');
    }
}
class Cat extends  Animal{
    speak(){
        console.log('小猫喵喵喵');
    }
}
let dog=new Dog();
let cat=new Cat();
dog.speak();
cat.speak();
```
### 11、重写(override) vs 重载(overload)
- 重写是指子类重写继承自父类中的方法
- 重载是指为同一个函数提供多个类型定义
```js
class Animal{
    speak(word:string):string{
        return '动作叫:'+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return '猫叫:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello'));
//--------------------------------------------
function double(val:number):number
function double(val:string):string
function double(val:any):any{
  if(typeof val == 'number'){
    return val *2;
  }
  return val + val;
}

let r = double(1);
console.log(r);
```
### 12、继承 vs 多态
- 继承（Inheritance）子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
```js
class Animal{
    speak(word:string):string{
        return 'Animal: '+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return 'Cat:'+word;
    }
}
class Dog extends Animal{
    speak(word:string):string{
        return 'Dog:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello'));
let dog = new Dog();
console.log(dog.speak('hello'));
```
