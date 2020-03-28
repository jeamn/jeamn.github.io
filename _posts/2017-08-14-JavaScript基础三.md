---
layout:     post
title:      JavaScript基础三
date:       2017-08-14
author:     Jeamn
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - JavaScript
---

### 一、实现防抖函数
原理：在事件被触发n秒后再执行回调，如果n秒内事件又触发，那么重新计时。
```js
const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

function a() {
    console.log('a')
}

timer1 = setInterval(debounce(a,500),1000)
// timer1 = setInterval(debounce(a,2000),1000)
setTimeout(() => {
    clearInterval(timer1)
}, 3000);
```

使用场景：提交按钮、搜索框联想

### 一、实现节流函数
原理：规定在一个单位时间内，只触发一次函数。如果在这个单位时间内多次触发，只有一次生效。
```js
const throttle = (fn, gepTime) => {
    let flag = true
    return (...args) => {
        if(!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this, args)
            flag = true
        }, gepTime);
    }
}
const a = function(){
    console.log('a')
}

timer1 = setInterval(throttle(a, 1000), 500);
setTimeout(() => {
    clearTimeout(timer1)
}, 3000);
```

使用场景：拖拽场景、缩放场景、动画场景

### 三、实现 call

