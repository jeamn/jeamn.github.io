---
title: JavaScript 设计模式（二）设计原则和设计模式
tags:
  - JavaScript
  - ES6
date: 2018-05-22
---

## 一、Unix的设计哲学
《Unix/Linux设计哲学》里面有几个设计的准则：

- 小即是美

- 让每个程序只做好一件事

- 快速建立原型

- 舍弃高效率而取可移植性

- 采用纯文本来存储数据

- 充分利用软件的杠杆效应（软件复用）
<!--more-->

- 使用shell脚本来提高杠杆效应和可移植性

- 避免强制性的用户界面

- 让每个程序都称为过滤器

## 二、五大设计原则 SOLID

- S - 单一职责原则
> 一个程序只做好一件事
> 
> 如果功能过于复杂就拆分开，每个部分保持独立

- O - 开放封闭原则
> 对扩展开放，对修改封闭
> 
> 增加需求时，扩展新代码，而非修改已有代码
> 
> 这是软件设计的终极目标

- L - 李氏置换原则
> 所有父类能出现的地方，子类都能出现
> 
> 子类能覆盖父类
> 
> JS 中使用较少（弱类型 & 继承使用较少）

- I - 接口独立原则
> 保持接口的单一独立，避免出现 “胖接口”
> 
> JS 中没有接口（ TypeScript 例外），使用较少
> 
> 类似于单一职责原则，这里更关注接口

- D - 依赖倒置原则
> 面向接口编程，编程中应该依赖于抽象而不依赖于具体
> 
> 使用方只关注接口而不关注具体类的实现
> 
> JS 中使用较少（没有接口 & 弱类型）

#### 用 Promise 来说明 S O

```js
function loadImg(src) {
    let promise = new Promise(function(resolve, reject) {
      let img = document.createElement('img')
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function() {
        reject('图片加载失败')
      }
      img.src = img
    })
    return promise
}
let src = 'http://ww1.sinaimg.cn/large/8b50d584gy1ftqv3xd6xwj208m04wjr8.jpg'
let result = loadImg(src)
result.then(function() {
  console.log('img.width:', img.width)
  return img
}).then(function() {
  console.log('img.height:', img.height)
}).catch(function(err) {
  console.log(err)
})
```

每个 then 中的逻辑值负责做好一件事，那么这就是单一职责原则。

如果增加新需求，那么我们就新增 then，做到扩展新代码，而不是修改旧代码。

## 三、23种设计模式
- 创建型
> 工厂模式 （工厂方法模式、抽象工厂模式、建造者模式）
> 单例模式
> 原型模式

- 组合型
> 适配器模式
> 装饰器模式
> 代理模式
> 外观模式
> 桥接模式
> 组合模式
> 享元模式

- 行为型
> 策略模式
> 模板方法模式
> 观察者模式
> 迭代器模式
> 职责链模式
> 命令模式
> 备忘录模式
> 状态模式
> 访问者模式
> 中介者模式
> 解释器模式


