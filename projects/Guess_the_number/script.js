"use strict";

const classNameArr = [
    '.score',
    '.number',
    '.guess',
    '.again',
    '.message',
    '.high-score',
    '.check'
]
//Selecting needed elements: make sure that arr is iterable [0]className is a [0]element
const selector = (className) => className.map((el) => document.querySelector(el))
const [
    scoreEl,
    numberEl,
    guessEl,
    againEl,
    messageEl,
    highScoreEl,
    checkEl
] = selector(classNameArr)

//getting a secret number for the first time
const getSecretNumber = () => Math.trunc(Math.random() * 20 + 1)
let secretNumber = getSecretNumber()

const displayMessage = (message) => messageEl.textContent = message

//Initial values both of score and high-score
let score = 20, highScore = 0;



function guessCheckHandler() {
    let guess = Number(guessEl.value)
    //to clear the input value on submit
    guessEl.value = null
    //to handle the wrong numbers
    if (!guess || !(guess >= 1 && guess <= 20)) {
        displayMessage('Something went wrong, pick a number between 1 and 20')
        guess = null
        return
    }
    guessEl.focus()
    score--
    scoreEl.textContent = score.toString()
    switch (true) {
        //game over
        case score < 1:
            displayMessage('Game over💥')
            scoreEl.textContent = '0'
            document.body.style.backgroundColor = 'red'
            guessEl.blur()
            guessEl.readOnly = true
            checkEl.readOnly = true
            break
        //near the guessed number with delta 2
        case secretNumber === (guess + 2) || secretNumber === (guess - 2):
            displayMessage('You are getting closer')
            break
        //near the guessed number with delta 1
        case secretNumber === (guess + 1) || secretNumber === (guess - 1):
            displayMessage('You almost won')
            break
        //guessing state
        case secretNumber !== guess:
            displayMessage(secretNumber >= guess ? 'Too low' : 'Too high')
            break
        //won state
        case secretNumber === guess || 20:
            displayMessage('🏆 You won!')
            document.body.style.backgroundColor = '#60b347'
            numberEl.textContent = secretNumber.toString()
            numberEl.style.width = '60rem'
            if (score > highScore) {
                highScore = score
                highScoreEl.textContent = highScore
            }
            guessEl.blur()
            guessEl.value = guess
            guessEl.readOnly = true
            checkEl.readOnly = true
            break
        default:
    }
    return guess
}


function resetHandler() {
    secretNumber = getSecretNumber()
    score = 20
    displayMessage('Start guessing...')
    scoreEl.textContent = score.toString()
    document.body.style.backgroundColor = '#222'
    numberEl.textContent = '?'
    numberEl.style.width = '15rem'
    guessEl.value = null
    guessEl.readOnly = false
    checkEl.readOnly = false
}


document.querySelector('.check').addEventListener('click', () => guessCheckHandler())
guessEl.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') guessCheckHandler()
})
againEl.addEventListener('click', () => resetHandler())