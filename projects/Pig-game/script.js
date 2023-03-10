'use strict';
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')
const rollDiceBtnEl = document.querySelector('.btn--roll')
const holdBtnEl = document.querySelector('.btn--hold')
const newBtnEl = document.querySelector('.btn--new')
const currentScore0El = document.getElementById('current--0')
const currentScore1El = document.getElementById('current--1')
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const closeBtnEl = document.querySelector('.close-modal');
const showModalEl = document.querySelectorAll('.show-modal');



function changeClassOnEvent(whatElToListen, typeEvent, elementWhereChangeClassList, className, behaviorType, keyPressed) {
    function listenerForSingle(el) {
        el.addEventListener(typeEvent, (evt) => {
            if (evt.target === el) {
                behaviorType ==='add'?
                    addClassList(elementWhereChangeClassList, className):removeClassList(elementWhereChangeClassList,className)
            }
        });
    }
    function listenerForListNodes(el) {
        el.forEach((el) => el.addEventListener(typeEvent, (evt) => {
            el.blur();
            if (evt.target === el) {
                behaviorType ==='add'?
                    addClassList(elementWhereChangeClassList, className):removeClassList(elementWhereChangeClassList,className)
            }
        }));
    }
    function listenerForKeypress(el) {
        el.addEventListener(typeEvent, (evt) => {
            if (evt.key === keyPressed) {
                behaviorType ==='add'?
                    addClassList(elementWhereChangeClassList, className):removeClassList(elementWhereChangeClassList,className)
            }
        });

    }
    function addClassList() {
        elementWhereChangeClassList.map((el) => el.classList.add(className));
    }
    function removeClassList() {
        elementWhereChangeClassList.map((el) => {
            el.classList.remove(className);

        });
    }
    return whatElToListen.map((el) => {
        typeEvent === 'keydown'|| typeEvent === 'keyup' ? listenerForKeypress(el) : null;
        el.hasOwnProperty(length) ? listenerForListNodes(el) : listenerForSingle(el);
    });
}

let currScore,scores,activePlayer,playing
// noinspection JSValidateTypes
const conditionStart = {
    score0El: score0El.textContent = 0,
    score1El: score1El.textContent = 0,
    diceEl: diceEl.style.display = "none",
    currentScore0El: currentScore0El.textContent = 0,
    currentScore1El: currentScore1El.textContent = 0,
    currScore: currScore = 0,
    scores: scores = [0, 0],
    activePlayer: activePlayer = 0,
    playing: playing = true,
}

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = (0).toString()
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    currScore = 0
    playing = false
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    setTimeout(() => {
        playing = true
    }, 850)
}

const setCurrentScore = (dice) => {
    if (dice === 1) {
        switchPlayer()
    } else {
        currScore += dice
        diceEl.style.opacity = '1'
        document.querySelector(`#current--${activePlayer}`).textContent = currScore.toString()
    }
}


rollDiceBtnEl.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.src = `https://www.linkpicture.com/q/dice-${dice}_1.png`

        dice ? diceEl.style.display = 'block' : null
        setCurrentScore(dice)
    }

})

holdBtnEl.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer].toString()

        if (scores[activePlayer] >= 100) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player`).classList.remove('player--active')
            document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1} Won!`
            diceEl.style.display = conditionStart.diceEl
        } else switchPlayer()
    }
})
newBtnEl.addEventListener('click', () => {
    playing = conditionStart.playing
    scores = conditionStart.scores
    currScore = conditionStart.currScore
    currentScore0El.textContent = conditionStart.currentScore0El
    currentScore1El.textContent = conditionStart.currentScore1El
    score0El.textContent = conditionStart.score0El
    score1El.textContent = conditionStart.score1El
    diceEl.style.display = conditionStart.diceEl

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    document.querySelector(`.player--1`).classList.remove('player--active')
    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`
    activePlayer = conditionStart.activePlayer
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
})
changeClassOnEvent([showModalEl], 'click', [modalEl, overlayEl], 'hidden');
changeClassOnEvent([overlayEl, closeBtnEl], 'click', [modalEl, overlayEl], 'hidden','add');
changeClassOnEvent([document], 'keyup', [modalEl, overlayEl], 'hidden', 'add','Escape');