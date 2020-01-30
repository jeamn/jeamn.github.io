const arr = [1]
const noArr = '1'

function isArray(obj){
    // return Array.isArray(obj)
    console.log(Object.prototype.toString.call(obj))
    return Object.prototype.toString.call(obj) === '[object Array]'
}
console.log(isArray(arr))
console.log(isArray(noArr))