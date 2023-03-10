'use strict';
const bookings = []

//# functions default args------------------------------------
const createBooking = function (flightNum, numPassengers = 1, discount = 0.01, price = 200) {

    const booking = {
        flightNum,
        numPassengers,
        price
    }
    numPassengers >= 4 ? discount = 0.05 : null
    const totalPrice = (price) * numPassengers
    const totalPriceWd = (price - price * discount) * numPassengers
    bookings.push(booking)
    return `Flight ${flightNum} passengers: ${numPassengers}\nTotal price: ${totalPriceWd}$ with discount ${discount * 100 + '%'}\nSavings:${totalPrice - totalPriceWd}$`
}
console.log(createBooking('AB767', 5, undefined, 1000))//⬇️
console.log(createBooking('AB767', undefined, undefined, 1000))//⬇️
/*
Flight AB767 passengers: 5
Total price: 4750$ with discount 5%
Savings:250$
---------------------------
Flight AB767 passengers: 1
Total price: 990$ with discount 1%
Savings:10$
*/
//# How passing arguments works----------------------
const flight = 'LH323'
const jonas = {
    name: 'Some Thing',
    passport: 8129894728,
}
const checkIn = function (flightNum, passenger) {
    flightNum = 'KL222'// not mutating because of its primitive type
    console.log(flightNum)//Kl222
    passenger.name = 'Mr.' + passenger.name
    console.log(passenger.passport === 8129894728 ? 'Checked in' : 'Wrong passport')//Checked in
}
checkIn(flight, jonas)
console.log(flight)// still LH323
console.log(jonas.name)// Mr.Some thing ---> reference type

// the same as doing
const flightNum = flight
const passenger = jonas
passenger.name = 'ms'
console.log(flightNum)//LH323
console.log(passenger.name)// ms
console.log(jonas.name)//ms


//# First-Class and High-Order functions------------------------------
//image⚠️


//Ex:
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase()
}
const upperFirstWord = function (str) {
    const [first, ...other] = str.split(' ')
    return [first.toUpperCase(), ...other].join(' ')
}
// Higher order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`)
    console.log(`Transformed string: ${fn(str)}`)
    console.log(`Transformed by: ${fn.name}`)
}
transformer('js is the best', upperFirstWord)//⬇️callback
/*
Original string: js is the best
Transformed string: JS is the best
Transformed by: upperFirstWord
*/
transformer('come here closer', oneWord)//⬇️callback
/*
Original string: come here closer
Transformed string: comeherecloser
Transformed by: oneWord
*/
//# functions returning functions--------------------------------

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
}
const greeterHey = greet('Hey')
greeterHey('UBu')// Hey Ubu
greet('hello')('BUBU')// hello BUBU
// using arrow function

const greet2 = (greeting) => (name) => {
    console.log(`${greeting} ${name}`)
}
greet2('Yo')('Lulu')// Yo Lulu
//# This keyword manual assignment in functions using call, apply and bind method
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    //book method
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`)
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
    },// this is referenced to object it calling
}
lufthansa.book(644, 'Ilya')// Ilya booked a seat on Lufthansa flight LH644

lufthansa.book(632, 'Alex')//Alex booked a seat on Lufthansa flight LH632

console.log(lufthansa.bookings)//⬇️
/*
[
  { flight: 'LH644', name: 'Ilya' },
  { flight: 'LH632', name: 'Alex' }
]
*/

// but what if we need to do the same on another similar obj
const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
}
// we can store the book.method as function to variable
const book = lufthansa.book
//----book(23,'Sarah')//Cannot read properties of undefined (reading 'airline')
// it happens because of this keyword changed scope. now this points to undefined
// the book function is now just a regular function and not an obj.method
// to fix it we use function methods that points out of what this keyword should be
//## .call()
book.call(eurowings, 23, 'Sarah')//Sarah booked a seat on Eurowings flight EW23
console.log(eurowings.bookings)//[ { flight: 'EW23', name: 'Sarah' } ]
book.call(lufthansa, 333, 'Mary')//Mary booked a seat on Lufthansa flight LH333
console.log(lufthansa.bookings)//⬇️
/*
[
  { flight: 'LH644', name: 'Ilya' },
  { flight: 'LH632', name: 'Alex' },
  { flight: 'LH333', name: 'Mary' }
]
*/

//## Apply method works the same as call() but instead of regular arguments for functions it takes
// an array of their arguments
const flightData = [555, 'George']
book.apply(eurowings, flightData)//George booked a seat on Eurowings flight EW555
//  the more modern way is just spread on call()
book.call(lufthansa, ...flightData)//George booked a seat on Lufthansa flight LH555

//# bind method
// does the same thing, but it doesn't call function it just return a new function with bound
// this keyword

const bookEW = book.bind(eurowings)
bookEW(223, 'John')//John booked a seat on Eurowings flight EW223
// we can go deeply using multiple arg when binding
// here we create a specific book func for flight 23
const bookEW23 = book.bind(eurowings, 23)
bookEW23('Mary')//Mary booked a seat on Eurowings flight EW23
console.log(eurowings.bookings)//⬇️
/*
[
  { flight: 'EW23', name: 'Sarah' },
  { flight: 'EW555', name: 'George' },
  { flight: 'EW223', name: 'John' },
  { flight: 'EW23', name: 'Mary' }
]
*/
// #With event Listeners
lufthansa.planes = 300
lufthansa.buyPlane = function () {
    console.log(this)//<button class="buy">Buy new plane 🛩</button>
    this.planes++
    console.log(this.planes)//NaN
}
//----document.querySelector('.buy').addEventListener('click',lufthansa.buyPlane)
//this happens because in EventListeners this keyword is pointing on element on which
// EventListeners is attached
// to fix this we use bind method because it doesn't call the function, but just binding this
// keyword
//document.querySelector('.buy').addEventListener('click',
// lufthansa.buyPlane.bind(lufthansa))//⬇️clicked 3 times
/*
{airline: 'Lufthansa', iataCode: 'LH', bookings: Array(4), planes: 300, book: ƒ, …}
 301
 {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(4), planes: 301, book: ƒ, …}
 302
 {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(4), planes: 302, book: ƒ, …}
 303
 */
// Partial application
const addTax = (rate, value) => value + value * (rate / 100)
console.log(addTax(10, 200))//220

/*
 in this case we don't need this keyword, we need to preset the rate value
*/
const addVat = addTax.bind(null, 23)
// so it does the same as
const addVat2 = value => value + value * 0.23
console.log(addVat2(200))//246
console.log(addVat(200))//246
// the order of the args when presetting must be the same as in function we are binding to
const addTaxRate = rate => value => value + value * (rate / 100)
console.log(addTaxRate(23)(100))// 123

// # Immediately Invoked Function Expression IIFE
// Need when we need a function that is called once and then disappears

const runOnce = function () {
    console.log('never again')//never again, never again
}
runOnce()
runOnce();
// the syntax is⬇️
(function () {
    console.log('never again')// never again
})()
// used when we need to use var
// instead to protect scope view use block scoping {}


//# Closures
const secureBook = function () {
    let passengersCount = 0
    return function () {
        passengersCount++
        console.log(`${passengersCount} passengers`)
    }
}
const booker = secureBook()
// ⚠️image⚠️
booker()
booker()
booker()
// ⚠️image⚠️
// ⚠️image⚠️
// has a priority in-front of global scope
// when it happens
//Ex 1

let f

const g = () => {
    const a = 10
    // reassign f variable
    f = function () {
        console.log(a * 2)//20
    }
    // now f is a function and has a closure as variable access in its backpack
}
const h = () => {
    const b = 20
    f = function () {
        console.log(b * 2)//40
    }
}
g()
f()
// reassign again
h()
f();
// Ex 2
// const boardPassengers = (n,wait)=>{
//     const perGroup = n/3
//     setTimeout(function (){
//         console.log(`All ${n}`)
//         console.log(`3 groups each with ${perGroup}`)
//     },wait*1000)
//     console.log(`Start in ${wait} sec.`)
// }
// const perGroup = 400
// boardPassengers(180,4);
//from here
(function (){
    const header = document.querySelector('h1')
    header.style.color = 'red'
// to here is the birthplace of EventHandler so it remembers its surrounding
    document.body.addEventListener('click',()=>header.style.color='blue')
    // when clicked IIFE has gone but its variables as they are at birthplace still accessible
})()