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


//# ES6 classes.
// Classes is a syntax sugar, they use prototypal inheritance

// class expression
/*
 const PersonCl = class  {

 }
 */

// class declaration

class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName
        this.birthYear = birthYear
    }

    get age() {
        return 2037 - this.birthYear
    }

    // also we must use getter to set back the predefined property to that we checked
    get fullName() {
        return this._fullName
    }

// check if userName is a full name
    // Pattern for setting a property that already exist
    set fullName(name) {
        console.log(name)
        name.includes(' ')
            // we use _ to create a new variable for setter otherwise there will be name conflict
            ? this._fullName = name
            : console.log(`${name} is not a full name!`)
    }

// static methods
    static hey() {
        console.log('HEY')
    }

    // instance methods
    // to create a methods :
    // Methods will be added to prototype property
    calcAge() {
        console.log(2037 - this.birthYear)
    }
}

// Also we can add methods the old way
PersonCl.prototype.greet = function () {
    console.log(`Hi, my name's ${this.fullName}`)
}
const jessica = new PersonCl('Jessica Davis', 1999)
console.log(jessica)// PersonCl {firstName: 'Jessica', birthYear: 1999}
jessica.calcAge()//38
jessica.greet()// Hi, my name's Jessica
console.log(jessica.__proto__ === PersonCl.prototype)// true


//** use of getter
console.log(jessica.age)//38

/*
 1. Classes aren't hoisted // Use before they are declared is not possible as in regular functions
 2. Classes are first-class citizens // This means we can pass them into functions and also
 return them from functions
 3. Classes bodies are always executed in strict mode
 */


// # Getters and Setters
const account = {
    owner: 'jonas',
    movements: [100, 200, 300, 400, 100],
    // getter
    get latest() {
        return this.movements.slice(-1).pop()
    },
    //setter. NOTE: always takes one param as argument
    set latest(mov) {
        return this.movements.push(mov)
    },
}
// use of getter: get the data without calling the method. NOTE: take a look at PersonCl ☝
console.log(account.latest)//100
//use of setter: use case - check the data before we create an object using classes. NOTE: take a
// look at
// PersonCl ☝
account.latest = 999
console.log(account.movements)//[100,200,300,400,100,999]

//------------------ # Static methods
// is also like an Array.from() or Number.parseFloat() they are not attached to the object
// itself but into its constructor function in .prototype

/*PersonCl.hey = function () {
 console.log('HEY')
 console.log(this)// points to constructor function, bc of rule 'this in method points the
 // object calling that method'
 }
 PersonCl.hey()// HEY*/

// jessica.hey()// jessica.hey() is not a function. Object cannot access this hey static method
// because it isn't inherited from PersonCl
//NOTE: to declare a static method inside class look PersonCl
PersonCl.hey()//HEY


//-----------# Object.create()
// Uses prototype inheritance also but in different way
// syntax create
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear)
    },
    initial(firstName,birthYear){
        this.firstName = firstName
        this.birthYear = birthYear
    }
}
const steven = Object.create(PersonProto)
console.log(steven)// now doesn't have anything except method that is in its prototype chain
steven.name = 'Steven'
steven.birthYear = 1992
steven.calcAge()//45
console.log(steven)
//#screenshot #10 📷
console.log(steven.__proto__===PersonProto)//true
// To not set obj properties obj.property = something. We can make a method that is seems like
// similar to a constructor function. NOTE: look up for initial
const sarah = Object.create(PersonProto)
sarah.initial('Sarah',2000)
sarah.calcAge()//37