/*
 * Copyright (c) 2023.
 */

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data
{
    const account1 = {
        owner: 'Jonas Schmedtmann',
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
        interestRate: 1.2, // %
        pin: 1111,
    };

    const account2 = {
        owner: 'Jessica Davis',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        interestRate: 1.5,
        pin: 2222,
    };

    const account3 = {
        owner: 'Steven Thomas Williams',
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
        interestRate: 0.7,
        pin: 3333,
    };

    const account4 = {
        owner: 'Sarah Smith',
        movements: [430, 1000, 700, 50, 90],
        interestRate: 1,
        pin: 4444,
    };

    const accounts = [account1, account2, account3, account4];

// Elements
    const labelWelcome = document.querySelector('.welcome');
    const labelDate = document.querySelector('.date');
    const labelBalance = document.querySelector('.balance__value');
    const labelSumIn = document.querySelector('.summary__value--in');
    const labelSumOut = document.querySelector('.summary__value--out');
    const labelSumInterest = document.querySelector('.summary__value--interest');
    const labelTimer = document.querySelector('.timer');

    const containerApp = document.querySelector('.app');
    const containerMovements = document.querySelector('.movements');

    const btnLogin = document.querySelector('.login__btn');
    const btnTransfer = document.querySelector('.form__btn--transfer');
    const btnLoan = document.querySelector('.form__btn--loan');
    const btnClose = document.querySelector('.form__btn--close');
    const btnSort = document.querySelector('.btn--sort');

    const inputLoginUsername = document.querySelector('.login__input--user');
    const inputLoginPin = document.querySelector('.login__input--pin');
    const inputTransferTo = document.querySelector('.form__input--to');
    const inputTransferAmount = document.querySelector('.form__input--amount');
    const inputLoanAmount = document.querySelector('.form__input--loan-amount');
    const inputCloseUsername = document.querySelector('.form__input--user');
    const inputClosePin = document.querySelector('.form__input--pin');

    const displayMovements = movements => {
        containerMovements.innerHTML = ''
        movements.forEach(mov => {
            const type = mov > 0 ? 'deposit' : 'withdraw'
            const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${type}</div>
          <div class="movements__value">${mov > 0 ? `+${mov}` : mov}€</div>
        </div>
       `
            containerMovements.insertAdjacentHTML('afterbegin', html)
        })
    }


    const calcDisplayCurrentBalance = (array) => {
        array.balance = array.movements.reduce((previousValue, currentValue) => previousValue + currentValue)
        labelBalance.textContent = `${array.balance} €`
    }

    const calcDisplaySummary = function (array) {
        const incomes = array.movements
            .filter(el => el > 0)
            .reduce((a, c) => a + c, 0)
        labelSumIn.textContent = `${incomes}€`
        const outcomes = array.movements
            .filter(el => el < 0)
            .reduce((a, c) => a + c, 0)
        labelSumOut.textContent = `${outcomes}€`
        const interest = (array.movements
            .filter(el => el > 0)
            .map(el => el * array.interestRate / 100)
            .filter(el => el >= 1)
            .reduce((a, c) => a + c)).toFixed(2)
        labelSumInterest.textContent = `${interest}€`
    }

    const createUserNames = accs => {
        accs.forEach(acc => {
            acc.username = acc.owner
                .toLowerCase()
                .split(' ')
                .map(name => name.at(0))
                .join('')
        })
    };
    createUserNames(accounts)
    const updateUi = (acc) => {
        displayMovements(acc.movements)
        calcDisplayCurrentBalance(acc)
        calcDisplaySummary(acc)
    }
// Event handlers
    let currentAccount
    btnLogin.addEventListener('click', e => {
        e.preventDefault()
        currentAccount = accounts.find(el => el.username === inputLoginUsername.value)
        if(currentAccount?.pin === Number(inputLoginPin.value)) {
            // display ui
            labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ').at(0)}`
            containerApp.style.visibility = 'visible'
            containerApp.style.opacity = '1'
            inputLoginUsername.value = inputLoginPin.value = ''
            inputLoginPin.blur()
            //
            updateUi(currentAccount)


        }
    })
    btnTransfer.addEventListener('click', e => {
        e.preventDefault()
        const amount = Number(inputTransferAmount.value)
        const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
        inputTransferAmount.value = inputTransferTo.value = ''

        if(amount > 0 &&
            receiverAcc &&
            currentAccount.balance >= amount &&
            receiverAcc?.username !== currentAccount.username
        ) {
            //do transfer
            currentAccount.movements.push(-amount)
            receiverAcc.movements.push(amount)
            //updateUi
            updateUi(currentAccount)
        }

    })
    btnClose.addEventListener('click',evt => {
        evt.preventDefault()
        if(inputCloseUsername.value===currentAccount.username&&Number(inputClosePin.value)===currentAccount.pin){
            accounts.splice(accounts.findIndex(acc=>acc.username===currentAccount.username),1)
            containerApp.style.opacity = '0'
            containerApp.style.visibility = 'hidden'
            console.log(accounts)
        }
        inputClosePin.value=inputCloseUsername.value=''
    })
    btnLoan.addEventListener('click',evt => {
        evt.preventDefault()
        const amount = Number(inputLoanAmount.value)
        if(amount>0&& currentAccount.movements.some(mov=>mov>=amount/10)){
            currentAccount.movements.push(amount)
            updateUi(currentAccount)
        }
        inputLoanAmount.value=''
    })

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//
const array = [1,2,2,2,3,4]
let shallow = array.slice()
console.log(shallow)// [ 1, 2, 2, 2, 3, 4 ]
//# Array.prototype.splice()👾
// works the same as slice() but actually mutates the original array
// and as the second arg takes how many el we need to delete from array a.k.a. deletedCounts
//# reverse() 👾
// mutates the original array and returns its reversed value
const arr2= ['a','b','c','d']
arr2.reverse()
console.log(arr2)//[ 'd', 'c', 'b', 'a' ]
// # concat()
 // doesn't mutate original array returns a new array that concat first arg with second
console.log(arr2.concat(array.toString()))/!*
[
  'd', 'c', 'b', 'a', 1,
  2,   2,   2,   3,   4
]
*!/
//# forEach()
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach((movement,index)=>{
    console.log(movement>0?`${index+1}: You deposited ${movement}`:`${index+1}: You withdraw ${Math.abs(movement)}`)/!*
1: You deposited 200
2: You deposited 450
3: You withdraw 400
4: You deposited 3000
5: You withdraw 650
6: You withdraw 130
7: You deposited 70
8: You deposited 1300
*!/
})

// with Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`)/!*
USD: United States dollar
EUR: Euro
GBP: Pound sterling
*!/
})
//with Set
 const currUnique = new Set(['USD','USD','USD','EUR','EUR','EUR','EUR'])
console.log(currUnique)// Set{'USD','EUR'}
currUnique.forEach(value => {
    console.log(value)})// USD, EUR

*/
//
//-----------------------------------
//# Data transformations with map() filter() reduce()
//⚠️image  ️⚠️
//# filter()
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];// returns shallow copy of
// filtered through callback function
const movementsDeposit = movements2.filter(mov => mov > 0)
console.log(movementsDeposit)//[200, 450, 3000, 70, 1300]
const widthdraw = movements2.filter(mov => mov < 0)
console.log(widthdraw)// [-400, -650, -130]
// # reduce()

//accumulator --> SNOWBALL
const balance = movements2.reduce((previousValue, currentValue, currentIndex) => {
    console.log(`       Iteration ${currentIndex}: ${previousValue} ,  ${currentValue}`)
    /*
            Iteration 0: 0 ,  200
            Iteration 1: 200 ,  450
            Iteration 2: 650 ,  -400
            Iteration 3: 250 ,  3000
            Iteration 4: 3250 ,  -650
            Iteration 5: 2600 ,  -130
            Iteration 6: 2470 ,  70
            Iteration 7: 2540 ,  1300
    */
    return previousValue + currentValue
}, 0)
console.log(balance)//3840

// Maximum value using reduce()
const max = movements2.reduce((acc, curr) => acc > curr ? acc : curr, 0)
console.log(max)
// Min value

const min = movements2.reduce((acc, curr) => acc > curr ? curr : acc, 0)
console.log(min)

//# find()
// works same as filter but returns the first found el of array that satisfy the condition
// that is a callback function
console.log(movements2.find(el => el > 1000))// 3000


//# empty arrays + fill()
const x = new Array(5)// empty array [empty*5]
x.fill(1,2,5)
console.log(x)// [ , , 1, 1, 1]
x.fill(2,0,2)
console.log(x)// [ 2, 2, 1, 1, 1]

// # Array.from()
const y =Array.from({length:8},()=>2)
console.log(y)
const diceRandom = Array.from({length:100},()=>Math.trunc(Math.random()*100))
console.log(new Set(diceRandom).size)
//⚠️image  ️⚠️
