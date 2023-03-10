"use strict";

// let hasDriversLicense = false
// const passTest = true
//
// if (passTest) hasDriversLicense = true
// if (hasDriversLicense) console.log('I can drive')

// const interface = 'auto'
// const private = 3232

//############################################Challenge #1 Average team's score ################################

// const dolphinsScore = [[44, 23, 71],[85,54,41]]
// const koalasScore = [[65, 54, 49],[23,34,27]]
//
// const teamAverageScoreCalc = (arr) => {
//     return arr.reduce((acc, pre) => acc + pre) / arr.length;
// }
//
// function checkWinner(dolphinsScore, koalasScore) {
//     const dolphinAverage = teamAverageScoreCalc(dolphinsScore)
//     const koalaAverage = teamAverageScoreCalc(koalasScore)
//     let winner
//     switch (true) {
//         case dolphinAverage >= 2 * koalaAverage:
//             winner = `${dolphinAverage} vs. ${koalaAverage}, Dolphins Wins`
//             break
//         case dolphinAverage <= 2 * koalaAverage:
//             winner = `${koalaAverage} vs. ${dolphinAverage}, Koalas Wins`
//             break
//         default:
//             winner = 'No one wins'
//     }
//     return winner
// }
// const testData1 = checkWinner(dolphinsScore[0],koalasScore[0])
// const testData2 = checkWinner(dolphinsScore[1],koalasScore[1])
//
// console.log(testData1)
// console.log(testData2)
//
// ######################################Coding challenge #2 Array ######################################
//
// const dataArr = [125,555,44,340]
//
// const tipCalc = (arr) =>{
//     let tip;
//     return arr.map((el) => {
//         el >= 50 && el <= 300 ? tip = 0.15 : tip = 0.2;
//         return Math.round(el + el * tip)
//     })
// }
// console.log(tipCalc(dataArr))

// Small challenge with object introduction
//
// const user = {
//     firstName: 'Jonas',
//     lastName:'Something',
//     birthYear: new Date(1995,5,14).getTime(),
//     job:'driver',
//     hasDriverLicense:true,
//     friends:['Michael','John','William'],
//
//
//     calcAge:function () {
//         const yearToday = new Date()
//         const yearInMs = 31556952000
//         return  this.age = Math.floor((yearToday-this.birthYear)/yearInMs)
//     },
//     getSummary: function (){
//         return `${this.firstName} ${this.lastName} is a ${this.calcAge()}-years old ${this.job}, and he has ${this.hasDriverLicense?'a':'no'} driver's license`
//     },
// }
// console.log(user.getSummary())
// console.log(`${user.name} has ${user.friends.length} friends, and his best friend is ${user.friends[0]}`)

// ####################################Challenge #3BMI #####################################

// class Person {
//     constructor(...props)
//     {const [fullName,weight,height]=props
//         this.fullName = fullName
//         this.weight = weight
//         this.height = height
//     }
//     getBMI(){
//         return Math.round(this.weight/Math.pow(this.height,2))
//     }
// }
//
// const Mark = new Person('Mark Asa',70,1.7)
// const Jona = new Person('Jona SHU',92,1.8)
// const checkBMI = function (){
//     return Mark.getBMI()>Jona.getBMI()?`${Mark.fullName}'s BMI(${Mark.getBMI()}) is higher than ${Jona.fullName}'s BMI(${Jona.getBMI()})`:`${Jona.fullName}'s BMI(${Jona.getBMI()}) is higher than ${Mark.fullName}'s BMI(${Mark.getBMI()})`
// }();
// console.log(checkBMI)
// console.log(Mark)

// Loops

// for (let i = 0;i<=10;++i){
//     console.log(i)
// }

// const user = [
//     'Jonas',
//     'Something',
//     new Date().getFullYear() - 1995,
//     'driver',
//     true,
//     ['Michael', 'John', 'William'],
// ]
//
// const types = []
// for (let i = 0; i < user.length; i++) {
//     console.log(user[i])
//     //filling array
//     // types[i] = typeof user[i]
//     // or
//     types.push(typeof user[i])
//
// }
// console.log(types)

//############################# Coding Challenge #4 #############################
//
// const dataArr = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
// const tips = []
// const totals = []
//
// const tipCalc = (arr) => {
//     let tip
//     arr.map((el) => {
//         el >= 50 && el <= 300 ? tip = 0.15 : tip = 0.2;
//         tips.push(tip);
//         const total = Math.round(el + el * tip)
//         totals.push(total)
//     })
// }
// tipCalc(dataArr)
// const calcAverage = (arr) => {
//     return ((arr.reduce((acc,pre) => acc+pre))/arr.length).toFixed(2)
// }
// console.log(tips)
// console.log(totals)
// console.log(calcAverage(tips))
// console.log(calcAverage(totals))

// ##################### Coding challenge from code_wars: " Does my friend lying "##############

// function removeNb(n) {
//   if (!n) {
//     return;
//   }
//   const sequence = [];
//   const sum = (n * (n + 1)) / 2;
//   for (let a = Math.round((sum - n) / (n + 1)); a * a < sum; a++) {
//     const b = (sum - a) / (a + 1);
//     !(b % 1) && b < n
//       ? sequence.push([a, b], ...(a === b ? [] : [[b, a]]))
//       : null;
//   }
//   return sequence.sort();
// }
//
// console.log(removeNb(26));
