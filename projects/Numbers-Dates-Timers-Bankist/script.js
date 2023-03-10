'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2023-03-01T17:01:17.194Z',
        '2023-03-08T23:36:17.929Z',
        '2023-03-07T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

///////////////////////////////////// ////////////
// Functions
const formatDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
        Math.trunc(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

    const dayPassed = calcDaysPassed(new Date(), date)
    if(dayPassed === 0) return 'Today';
    if(dayPassed === 1) return 'yesterday';
    if(dayPassed <= 7) return `${dayPassed} days ago`;
    else {
        const optionsDate = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }
        return new Intl.DateTimeFormat(locale, optionsDate).format(date)
    }
}

const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value)
}

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(acc.movementsDates[i])
        const displayDate = formatDate(date, acc.locale)

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCur(mov, acc.locale, acc.currency)}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${formatCur(acc.balance, acc.locale, acc.currency)}`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${formatCur(out, acc.locale, acc.currency)}`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${formatCur(interest, acc.locale, acc.currency)}`;
};

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};
const startLogoutTimer = function () {
    const displayTimer = () => {
        const min = String(Math.trunc(time / 60)).padStart(2, '0')
        const sec = String(time % 60).padStart(2, '0')
        labelTimer.textContent = `${min}:${sec}`
        time--
        if(time < 0) {
            clearInterval(timer)
            containerApp.style.opacity = '0';
            labelWelcome.textContent = 'Log in to get started'
        }
    }
    let time = 5
    displayTimer()
    const timer = setInterval(displayTimer, 1000)
    return timer
}
///////////////////////////////////////
// Event handlers
let currentAccount, timer;


btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        containerApp.style.opacity = '100';
        const updateDate = () => {
            let nowDate = new Date()
            const optionsDate = {
                hour: 'numeric',
                minute: 'numeric',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }
            labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, optionsDate).format(nowDate)
        }
        updateDate()
        setInterval(() => {
            updateDate()
        }, 1000 * 10)
        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        if(timer) clearInterval(timer)
        timer = startLogoutTimer()
        // Update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if(
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString())
        receiverAcc.movementsDates.push(new Date().toISOString())
        // Update UI
        updateUI(currentAccount);
    }
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(Number(inputLoanAmount.value));

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        // Add movement
        setTimeout(() => {
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString())
            // Update UI
            updateUI(currentAccount);
        }, 5000)

    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if(
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        console.log(index);
        // .indexOf(23)

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = '0';
    }

    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// # Converting and Checking Numbers
//# Working with dates :
// 1) Create a date
const now = new Date()
console.log(now)// Wed Mar 08 2023 16:24:38 GMT+0300 (GMT+03:00)


console.log(new Date('Aug 02 2020 18:05:41'))

console.log(new Date(3 * 24 * 60 * 60 * 1000))

// Working with dates
const future = new Date(2037, 11, 19, 15, 23, 50, 11)
console.log(future)//Sat Dec 19 2037 15:23:50 GMT+0300 (GMT+03:00)
console.log(future.getFullYear())//2037
console.log(future.getMonth())//11
console.log(future.getDate())//19
console.log(future.getDay())//6
console.log(future.getHours())//15
console.log(future.getMinutes())//23
console.log(future.getSeconds())//50
console.log(future.getMilliseconds())//11

console.log(future.toISOString())//2037-12-19T12:23:50.011Z

console.log(future.getTime())//2144838230011

console.log(Date.now()) // 1678354378896

console.log(new Date(Date.now()))// Thu Mar 09 2023 12:34:22 GMT+0300 (GMT+03:00)

future.setFullYear(1995)
console.log(future)//Tue Dec 19 1995 15:23:50 GMT+0200 (GMT+03:00)


