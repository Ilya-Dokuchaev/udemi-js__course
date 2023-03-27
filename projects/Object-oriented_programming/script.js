'use strict';
//# What is OOP
// #1 screenshot 📷
// #2 screenshot 📷
// #3 screenshot 📷
// #4 screenshot 📷
// #5 screenshot 📷
// #6 screenshot 📷
// #7 screenshot 📷
// #8 screenshot 📷
// #9 screenshot 📷
// Constructor functions always start with the capital letter

const Person = function (firstName, birthYear) {
    console.log(this)//-> Person {}
    // Instance properties
    this.firstName = firstName
    this.birthYear = birthYear
    console.log(this)//-> Person {firstName: 'Ilya', birthYear: 1995}
}

const ilya = new Person('Ilya', 1995)
console.log(ilya)//-> Person {firstName: 'Ilya', birthYear: 1995}
/*
 1) New {} is created
 2) function is called, this = {}
 3) {} is linked to prototype
 4) function auto return {}
 */
// Now we can create as many as we want obj using this constructor func
const jonas = new Person('Jonas', 1999)
const jack = new Person('Jack', 1993)
// To assign the method to constructor func use prototype inheritance

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear)
}
// prototype === .prototypeOfLinkedObject NOTE: BAD NAMING
// __proto__ is like a reference to prototype of ☝
//EX:
console.log(ilya.__proto__)// Person {calcAge: [f] }
console.log(ilya.__proto__ === Person.prototype)//true

console.log(Person.prototype.isPrototypeOf(ilya))//true

// We can also set properties of obj on __proto__
Person.prototype.species = 'Homo Sapience'

console.log(ilya.__proto__.species)// Homo Sapience
// but it is not the prototype
console.log(ilya.hasOwnProperty('firstName'))//true
console.log(ilya.hasOwnProperty('species'))//false
console.log(ilya.__proto__.hasOwnProperty('species'))//true

// How prototype inheritance / delegation works screenshot 📷
// The prototype chain screenshot 📷


