// String.prototype.findParenMatch = function(pos) {
//     let count = 0, step = this[pos] === ')' ? -1 : 1;
//     for(let i = pos; i >= 0 && i < this.length; i+=step) {
//         this[i]===')'?count--:count++
//         if(count === 0)return i;
//     }
//
//     return -1;
// }
//         let str=")((()))("
// console.log(str.findParenMatch(0))
// console.log(str.findParenMatch(1))
// console.log(str.findParenMatch(2))
// console.log(str.findParenMatch(3))
// console.log(str.findParenMatch(4))
// console.log(str.findParenMatch(5))
// console.log(str.findParenMatch(6))
// // console.log(str.findParenMatch(7))
//
// function disemvowel(str) {
//     let newStr = str.toLowerCase().replace((/a|o|u|e|i/g),'')
//     return newStr;
// }
// //
// // console.log(disemvowel('This os us es'))
//
// function isIsogram(str){
//     //...
//     const setArr = [...new Set(str)].join('')
//     return setArr===str
// }
//
// console.log(isIsogram('Dermatoglyphics'))
//
// function sumArray(array) {
//     array.sort((a,b)=>a-b).shift()
//     array.pop()
//     return  !array||array.length<3?0:array.reduce((a,b)=>a+b)
// }
//
// console.log(sumArray([6,2,1,8,10]))
// console.log(sumArray([10]))

function isPangram(string){
    let newStr = [...new Set([...string.toLowerCase().replace(/[\W\d']/g, "").split('')])].join('')
    return newStr.length===26
}

console.log(isPangram("The 'quick' brown 12fox jumps over the lazy dog."))d