// "use strict";
//
// //------------------variable scope------------------------------------------------------------------------------------
// function calcAge(birthYear) {
//     const age = 2037 - birthYear; //function-scope variable
//
//     function printAge() {
//         const output = `${firstName},you are ${age}, born in ${birthYear}`; // function scope variable of printAge
//         console.log(output);
//         if(birthYear >= 1981 && birthYear <= 1996) {
//             console.log(firstName);
//             const output = "New output"; // creating new variable within block-scope
//             firstName = "Dona"; // reassigning global scope variable
//             const str = `Oh, and you're a millennial, ${firstName}`; //block-scope variable
//             console.log(str);
//             console.log(output);
//         }
//         console.log(output);
//     }
//
//     // console.log(str);
//     printAge();
//     return age;
// }
//
// let firstName = "Jona"; //global scope variable
// calcAge(1991);
//
// //-----------variables hoisting---------------------------------------------------------------------------------------
//
// //var hoisting in TDZ (temporal dead zone) var === undefined
// console.log(me);
// // console.log(job);//Cannot access before initialization let in TDZ
// // console.log(year);//Cannot access before initialization const in TDZ
// var me = "away";
// let job = "teacher";
// const year = 1991;
//
// //-----------Functions hoisting---------------------------------------------------------------------------------------
//
// console.log(addDecl(2, 3)); //function hoisting
// // console.log(addExpr(2, 3));//Cannot access before initialization functional expression because it is assigned to
// //variable
// // in TDZ
// // console.log(addArrow(2, 3));// The same as above
// //function declaration
// function addDecl(a, b) {
//     return a + b;
// }
//
// //Function expression
// const addExpr = function (a, b) {
//     return a + b;
// };
// const addArrow = (a, b) => a + b;
//
// //----------------------------this---------------------------------------------------------------------------------
//
// console.log(this); //top-level this pointing on window object
//
// const birthYearObj = {
//     year1: 1999,
//     year2: 2000,
//     calcAge: function () {
//         // method declaration
//         console.log(2020 - this.year1);
//     },
// };
// birthYearObj.calcAge(); //this point the object calling the method
//
// function calcAge2(birthYear) {
//     console.log(2020 - birthYear);
//     console.log(this); //this pointing the function inside
//     const calcAgeArrow = (birthYear) => {
//         console.log(2020 - birthYear);
//         console.log(this); // this pointing outside in arrow function
//     };
//     calcAgeArrow(birthYearObj.year2);
// }
//
// const calcAgeArrow = (birthYear) => {
//     console.log(2020 - birthYear);
//     console.log(this); // this pointing outside in arrow function
// };
// calcAgeArrow(birthYearObj.year2);
// calcAge2(birthYearObj.year1);
//
// //------------------------regular functions vs arrow functions--------------------------------------------------------
//
// const birthYearObj = {
//   year1: 1999,
//   year2: 2000,
//   firstName: "LoL",
//   calcAge: function () {
//     // method declaration
//     console.log(2020 - this.year1); // this is referenced on object that calling this method
//     const self = this; // preserving this -------------Solution 1
//     const isMillennium = function () {
//           // otherwise this inside regular function become undefined because functions as declaration have their
//           // own this
//           console.log(self.year1 >= 1981 && self.year <= 1996);
//           // console.log(this.year1 >= 1981 && this.year <= 1996);// like hear === cannot access prop of undefined
//           //   };
//           isMillennium(); /// even if calling and declaring inside method without preserving this
//           const isMillennium = () => {
//             //using arrow function expression--------------Solution 2
//             console.log(this.year1 >= 1981 && this.year <= 1996); //it's because an arrow function has this as parent scope
//             // reference
//           };
//           isMillennium();
//         }
//         //greet: () => console.log(`Hey ${this.firstName}`) // undefined because it's an arrow function and this is
//     // referenced to parent scope === window.obj
//   }
// }
// birthYearObj.calcAge();
// birthYearObj.greet();
//
// //Arguments keyword on regular functions we have arguments keyword : declaration and expression.But not in the arrow
// // functions
// const addExpr = function (a, b) {
//     console.log(arguments); // as it shows that in function as arg we pass an array type
//     return a + b;
// };
// addExpr(2, 5, 2, 3, 4); // it can be passed multiple args to a function
//
// //--------------------------how data types are stored: primitives vs. objects-----------------------------------------
// //Primitive value
// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age); //store their values by address created in memory call stack pointing on address not the value
// console.log(oldAge); // Ex: address===0001: value===30, when we redefine age as 31 it creates a new address===0002 with
// // value 31
//
//  //reference values
// const me = {
//   // store their value in Heap. Ex me{} in call stack address===003 but its value is D30F- as reference to
//   // memory address in Heap
//   name: "Jona",
//   age: 30,
//   family:['awd','awd awd']// this is an object inside object and when we do a copy of original this obj is still on
//   // the same address in Heap and if we change it on copied obj it will be changes on both original and cope objs
// };
// // const friend = me; // As we do now friend is pointing also the same address===0003 with the same reference value ===D30F
// // friend.age = 27; // And now we're modifying initial object me that stored in Heap, because it references on the same
// // // address D30F
// //
// // console.log("friend", friend); // that's why age is 27 in both of them - because they are the same obj
// // console.log("me", me);
// // Copying objects
// const you = Object.assign({}, me); // we create and assign in memory a shallow copy of  object with new Heap reference
// // address. Preserving only top level
// you.name = "And";
// console.log(me);
// console.log(you);
