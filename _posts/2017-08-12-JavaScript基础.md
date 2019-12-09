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
