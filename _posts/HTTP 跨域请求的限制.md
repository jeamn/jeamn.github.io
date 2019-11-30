---
title: HTTP 跨域请求的限制
tags:
  - HTTP
date: 2018-06-03
---

## 一、访问URL
**从输入URL到页面加载成功发生了什么???**

（1）浏览器最开始会去做 Redirect ，因为浏览器可能记录了这个地址已经永久跳转到了一个新的地址，所以一开始它会去判断需不需要 Redirect 。

（2）浏览器会去看缓存，因为可能你请求的资源已经缓存过了，所以会先看 App catch 是否有缓存，如果没有缓存才去服务器请求资源。

（3）去 DNS 查找域名对应的 IP 地址，即 DNS 解析。有了 IP 地址， 才会创建 TCP 连接，而且要经过 TCP 三次握手才能建立连接。

> 如果是 HTTPS 连接，要创建一个 HTTPS 的连接，过程跟三次握手不一样，因为要建立一个能保证数据安全传输的过程。

（4）连接创建成功后才可以发送 HTTP 请求的数据包，发送完成服务器接收并处理，最终返回请求结果才算完成了一次 HTTP 请求。
<!--more-->
## 二、HTTP版本
在最初的 HTTP/0.9 版本，是只有一个命令 GET ，没有 HEADER 等描述数据的信息，服务器发送完毕，就关闭 TCP 连接。

HTTP/1.0 增加了很多命令，增加了 status code 和 header。

HTTP/1.1 实现了持久连接，pipeline。

HTTP2 所有数据以二进制传输，同一个连接里面发送多个请求不再需要按照顺序来，头信息压缩以及推送等提高效率的功能。

## 三、HTTP 三次握手
为什么要三次握手？为了规避网络传输中的服务器延时而导致的服务器开销问题。
首先客户端发起一个要连接的数据包请求到服务端，服务端接收到了该数据包就知道有一个客户要跟它创建连接，那么服务端会开启一个 TCP 端口，并返回一个数据包给客户端。客户端收到后就知道服务端已经允许我去创建这个连接了，然后会进行第三次握手。第三次握手是为了保证服务端知道客户端已经接收到了服务端的同意请求，这样服务端才会确认开启端口。

## 四、创建一个 HTTP 服务
在 node 环境下运行

```js
const http = require('http')

http.createServer(function(request, response){
  response.end('Hello http.')
}).listen(8081)

console.log('Server listening on 8081')
```
## 五、CORS跨域请求的限制与解决
由于浏览器的同源策略，只要协议、端口、域名有一个不同那么就属于跨域。

为了模拟浏览器跨域请求服务器的效果，我们创建两个服务并监听不同的端口，

先创建一个index.html文件来模拟发送请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Client sent the request</h1>
</body>
</html>

<script>
  let xhr = new XMLHttpRequest()
  xhr.open('GET','http://127.0.0.1:8082/')
  xhr.send()
</script>
```

- client.js 客户端监听8081端口

```js
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response){
  console.log('request come',request.url)

  const html = fs.readFileSync('index.html','utf8')

  response.writeHead(200,{
    'Content-Type':'text/html'
  })
  response.end(html)
}).listen(8081)

console.log('Server listening on 8081')
```

- server.js 服务端监听8082端口

```js
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response){
  console.log('request come',request.url)

  //response.writeHead(200,{
    //'Access-Control-Allow-Origin': '*'
  //}) // 服务端设置跨域请求

  response.end('Server has been Requested')
}).listen(8082)

console.log('Server listening on 8082')
```

然后将服务都开启，会出现如下报错，即产生了跨域问题。

![](http://ww1.sinaimg.cn/large/8b50d584gy1fu5s6kpu50j20ls0130t5.jpg)

那么，解决的方法是，在服务端设置跨域

```js
response.writeHead(200,{
    'Access-Control-Allow-Origin': '*'
}) // 服务端设置跨域请求，*表示允许所有请求跨域，可单独设置需要跨域的域名或端口，
```

其实不管我们有没有添加这个请求头，浏览器都会向服务器发送请求，而且浏览器在发送请求的时候，是不知道这个请求有没有跨域的，所以它还是会向服务器发送请求并接收返回内容。

![](http://ww1.sinaimg.cn/large/8b50d584gy1fu5sxgymu3j20iv0320t1.jpg)

只不过，在浏览器接收返回内容的时候，如果未检测到 Access-Control-Allow-Origin 设置为允许，那么浏览器会把请求的内容忽略掉，并且在命令里报这个跨域的错误。

这说明，在跨域请求中，浏览器是发送了请求，服务器也接收到请求并返回响应的，只不过浏览器在解析返回内容的时候，发现这是不允许的，所以才会出现跨域问题，所以拦截掉了。这就是浏览器的同源策略。

所以想要跨域我们可以在服务器上设置允许跨域，这只是一种解决方法。

那么前端是如何处理跨域问题的呢？一般我们会采用 jsonp 来解决：

在 index.html 中，将 script 标签内容修改一下即可，

```js
<script src="http://127.0.0.1:8082/"></script>
```

然后去掉 server.js 里面的跨域响应头，发现是没有报错的，即跨域成功。

jsonp实现的原理很简单，它不管服务器是否设置了跨域的头，其实就是在 script 里面加载一个链接，这个链接访问了服务器的某个请求，并且返回了内容，我们可以在返回内容里面写可执行的 js 代码。

## 六、CORS限制及预请求
在跨域的时候，默认允许的请求方法有 GET、HEAD、POST，允许的数据类型 Content-Type 有 text/plain、multipart/form-data、application、x-www-form-urlencoded，那么在跨域的时候，除了这些默认被允许的请求方法以及数据类型之外，其余的则需要浏览器的预请求去验证。

还有一个是请求头的限制，这个有时间再去了解一下。

那么什么是预请求呢？

我们将 index.html 文件下的 script 改成

```js
fetch('http://localhost:8082/',{
    method: 'POST',
    headers: {
        'X-Text-Cors': '12345'
    }
})
```

可以看到，
![](http://ww1.sinaimg.cn/large/8b50d584gy1fu5ulkil4pj20l208k0tr.jpg)

多了一个请求， 浏览器首先发送了一个 Request Methods 为 OPTIONS 的请求（除这个外其余都是跟 POST 请求一样的），服务端可以根据不同的 Request Methods 进行不同的操作，通过这个  OPTIONS 来认可浏览器发送请求，然后浏览器才再实际发送 POST 请求。

如果我们尝试将 POST 请求改成 PUT 请求，
```js
fetch('http://localhost:8082/',{
    method: 'PUT',
    headers: {
        'X-Text-Cors': '12345'
    }
})
```

![](http://ww1.sinaimg.cn/large/8b50d584gy1fu5uu39ry7j20lt02gq3h.jpg)
很显然会报错，因为 PUT 请求不是默认可以跨域的请求方法，这个时候我们可以在服务端 server.js 文件设置允许的请求方法，代码如下：

```js
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response){
  console.log('request come',request.url)

  response.writeHead(200,{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Text-Cors',
    'Access-Control-Allow-Methods': 'PUT'
  })

  response.end('Server has been Requested')
}).listen(8082)

console.log('Server listening on 8082')
```

以上这就是突破浏览器跨域限制的方法，那么浏览器为什么要提供这些限制呢？

因为浏览器希望进行跨域时，能保证服务器端的安全，所以浏览器不允许随便跨域，就提供了一些限制，所以我们可以根据这些限制进行判断要不要跨域，从而保证安全。

请求头中还有一个属性，Access-Control-Max-Age ,来控制允许发送正式请求的时间，即在这个时间内，浏览器跨域不用发送预请求，直接发送正式请求就可以了。















