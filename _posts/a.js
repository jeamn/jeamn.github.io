// const debounce = (fn, delay) => {
//     let timer = null;
//     return (...args) => {
//         console.log('333')
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//         }, delay);
//     };
// };

// function a() {
//     console.log('a')
// }

// timer1 = setInterval(debounce(a,500),1000)
// // timer1 = setInterval(debounce(a,2000),1000)
// setTimeout(() => {
//     clearInterval(timer1)
// }, 3000);


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