---
title: app.js 入口文件解析
tags:
  - JavaScript
  - Node
date: 2017-09-05
---

在学习入口文件之前先来看一段常规的入口文件代码：

```js
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine,'jade'');

app.all('*',function(req,res){
    res.render(
        'index',
        {msg:'Welcome to node!'}
    );
});
http
  .createServer(app)
  .listen(
    app.get('port'),
    function(){
      console.log('Express server listening on port'+app.get('port'));
    }   
);
```
<!-- more -->

接下来对该入口文件的各个部分做介绍，以便更好地理解 express 是怎么工作的。

### 1.执行顺序
请求会沿着中间件的处理链自上而下进行，顺序如下：

引入依赖---设置相关配置---连接数据库（可选）---定义中间件---定义路由---开启服务---在多核系统上启动cluster多核处理模块（可选）

### 2.具体解析
引入依赖: require( ) 如：

```js
var express = require('express');
```
实例化Express.js对象: 

```js
var app = express();
```
配置Express.js设置:如

```js
app.set();
```
使用键值对的形式 

```js
app.set('appName','hello-world');
```
**在app.js中定义几个配置:**

port: 服务器监听请求的端口号:

```js
app.set('port',process.env.PORT || 3000);
```
views:视图模板的绝对路径:

```js
app.set('views',path.join(__dirname,'views'));
```

view engine: 模板文件的扩展，如：jade、html

如果使用环境变量中提供的端口号来访问：

```js
process.env.PORT
```
中间件配置两种方式：

（1）由外部第三方模块定义，如：

```js
app.use(bodyParser.json());
```
（2）由应用本身定义，如：

```js
app.use(function(req,res,next){...});
```
**路由配置：**

路由一般放在中间件的后面，而错误处理的中间件是放在路由后面。

在哪里定义自身路由：如

捕获URL中所有方式的请求：

```js
app.all('*',function(req,res){...});
```

在请求处理函数内部，一个模板是由msg所渲染的（res.render()函数）：

```js
app.all('*',function(req,res){
    res.render('index',{msg:'hello world'})
});
```

res.render(viewName,data,callback(error,html))参数解释：

viewName：带有文件名扩展的模板名或未设置扩展的模板引擎。

data：一个由locals传递的可选对象。

callback：可选函数，由错误或者HTML绘制完成后调用。

启动服务的介绍：
    
```js
http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port' + app.get('port'));
});
```
### 未完待续...




