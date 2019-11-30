---
title: JavaScript 设计模式（一）开发环境搭建
tags:
  - JavaScript
  - ES6
date: 2018-05-20
---

## 一、开发环境搭建
#### 初始化环境  
> npm init      

安装 webpack 打包工具 
> npm i webapck webpack-cli --save-dev


然后在根目录下创建一个 src 文件夹，存放 index.js 文件，然后根目录下创建一个 webpack.dev.config.js 文件来配置 webpack，代码如下：

```js
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  }
}
```

<!--more-->

配置一下 package.json 文件里面的 scripts 字段，添加一个 dev ：
> "dev": "webpack --config ./webpack.dev.config.js --mode development"

这样在命令行中我们就可以通过 npm run dev，来打包文件。

#### 接下来做一些本地环境的配置，让开发效率提高。
安装 webpack-dev-server 本地服务环境和 html-webpack-plugin
> npm i webpack-dev-server html-webpack-plugin --save-dev

然后在根目录下创建 index.html 文件，修改 webpack.dev.config.js 文件如下：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  //插件列表
  plugins:[
    new HtmlWebpackPlugin({ 
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './release'),  // 根目录
    open: true,  //自动打开浏览器
    port: 9000
  }
}
```

然后修改 package.json 文件的配置：
> "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"

我们通过 new HtmlWebpackPlugin 新建了一个空模板，通过模板的地址（即'./index.html'），在 npm run dev 命令执行后，自动将打包生成的bundle.js 嵌入到该模板中。

那么现在已经实现本地服务的热更新了。
#### 通过 babel 来编译ES6代码
首先安装 babel 相关的依赖
> npm i babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-latest --save-dev

为了让 webpack 打包的时候能自动检测我们代码，并将 ES6 语法 转换为 ES5语法，我们在 webpack.dev.config.js 文件里添加这个配置，并通过 modules.exports 输出：

```js
module: {
    rules: [{
      test: /\.js?$/,  //检验 .js 的文件
      exclude: /(node_modules)/, //哪些文件忽略不编译
      loader: 'babel-loader' //根据webpack的标准，检测出这些文件后要执行loader，就是将检测出的文件进行babel的处理，如果遇到ES6则转换为ES5
    }]
  },
```

然后我们在根目录下创建一个 .babelrc 文件，代码如下：

```js
{
  "presets": ["es2015", "latest"],
  "plugins": []
}
```

接下来可以试验一下是不是能正常编译，在 src文件里面修改 index.js 文件如下：

```js
class Person {
  constructor(name){
    this.name = name
  }
  getname(){
    return this.name
  }
}
let p = new Person('jeamn')
console.log(p.getname())
```

我们写了一些 ES6 语法的代码，然后运行命令 npm run dev，不出意外代码应该能正常编译。

## 二、UML类图
UML 是 Unified Modeling Language，统一建模语言。

维基百科这样介绍：**用于说明、可视化、构建和编写一个正在开发的、面向对象的软件密集系统的制品的开放方法。**

定义一个 Person 类

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  eat() {
    console.log(`${this.name} eat something`)
  }
  speak() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`)
  }
}
```

我们通过 **[ProcessOn](https://www.processon.com/)** 来画 UML 图。其中 + 表示该属性或者方法是公有的，

![](http://ww1.sinaimg.cn/large/8b50d584gy1ftqv3xd6xwj208m04wjr8.jpg)

上面是一个类，那么在面向对象的程序设计中，一般是不止一个类的，那么多个类之间的关系有很多种，下面介绍一下泛化和关联：

#### 泛化：

- 如果 People 类是 A 和 B 的父类，A 和 B 具有公共父类 People ，则说明 People 是 A 和 B 的泛化，也就是继承关系。

- 泛化用来描述父类与子类之间的关系，父类又称作基类或者超类，子类又称作派生类。

- 在 UML 图中，泛化用带空心三角形的直线来表示。

在 UML 中，泛化有三个要求

- i 子类应包含父类的一切属性和方法

- ii 子类应包括除了父类的属性和方法之外的信息

- iii 可以使用父类实例的地方，也可以使用子类的实例

#### 关联：
- 关联即类之间的练习，是一种结构化关系，比较常见，用于表示一类对象和另一类对象之间有联系。

- 在 UML 图中，关联用带实心三角形的直线来表示。

下面用代码演示：

```js
//定义一个People父类
class People {
  constructor(name, car) {
    this.name = name
    this.car = car
  }
  saySomething() {
    
  }
}
//定义一个Car类
class Car {
  constructor(car) {
    this.car = car
  }
  showCar() {
    return this.car
  }
}
//定义A类继承People类
class A extends People {
  constructor(name, car) {
    super(name, car)
  }
  saySomething() {
    console.log(`I'm ${this.name}, I have a ${this.car}.`)
  }
}
//定义B类继承People类
class B extends People {
  constructor(name, car) {
    super(name, car)
  }
  saySomething() {
    console.log(`I'm ${this.name}.`)
  }
}
let aCar = new Car('BMW')
let a = new A('a', aCar.showCar())
let b = new B('b')
a.saySomething()
b.saySomething()
```

UML 图实现：
![](http://ww1.sinaimg.cn/large/8b50d584gy1ftqybpbbrcj20gu0bhjrl.jpg)

#### 练练手
- 打车时，可以打快车或专车。任何车都有车牌号和名称
- 不同车价格不同，快车每公里1元，专车没公里2元。
- 行程开始时，显示车辆信息
- 行程结束时，显示打车金额（假定行程就5公里）

```js
class Car {
  constructor(num, name) {
    this.num = num
    this.name = name
  }
}

class Trip {
  constructor(car) {
    this.car = car
  }
  start() {
    console.log(`行程开始，名称${this.car.name},车牌号：${this.car.num}`)
  }
  end() {
    console.log(`行程结束，价格${this.car.price * 5}`)
  }
}
class Kuaiche extends Car {
  constructor(num, name) {
    super(num, name)
    this.price = 1
  }
}
class Zhuanche extends Car {
  constructor(num, name) {
    super(num, name)
    this.price = 2
  }
}

let car = new Kuaiche(10010, '奔驰')
let trip = new Trip(car)
trip.start()
trip.end()
```

- 某停车场分3层，每层100车位
- 每个车位都能监控到车辆的驶入和离开
- 车辆进入前。显示每层的空余车位和数量
- 车辆进入时，摄像头空识别车牌号和时间
- 车辆出来时，出口显示器显示车牌号和停车时长

```js
// 车辆
class Car {
  constructor(num) {
    this.num = num
  }
}

// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log('车牌号：',car.num)
    console.log(`停车时间: ${Date.now() - inTime}ms`)
  }
}

// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || []
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {} //存储摄像头拍摄返回的车辆信息
  }
  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car)
    // 停到某个停车位
    const i = parseInt(Math.random() * 100 % 100)
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.num] = info
  }
  out(car) {
    // 获取信息
    const info = this.carList[car.num]
    // 将停车位清空
    const place = info.place
    place.out()
    // 显示时间
    this.screen.show(car, info.inTime)
    // 清空记录
    delete this.carList[car.num]
  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index} 层还有 ${floor.emptyPlaceNum()} 个空闲车位`
    }).join('\n')
  }
}

// 层
class Floor {
  constructor(index, places){
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(p => {
      if(p.empty) {
        num = num + 1
      }
    })
    return num
  }
}

// 车位
class Place {
  constructor() {
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

// 测试
// 初始化停车场
const floors = []
for(let i = 0; i < 3; i++) {
  const places = []
  for(let j = 0; j < 100; j++) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}
const park = new Park(floors)

// 初始化车辆
const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)

console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)

console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)

console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)

console.log('第三辆车离开')
park.out(car3)
```

![](http://ww1.sinaimg.cn/large/8b50d584gy1ftvtgwxuorj20ab0c33zf.jpg)



















