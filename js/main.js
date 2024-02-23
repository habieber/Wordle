/*----- constants -----*/
const WORDS_LIST = ['CODER', 'LOSER'];
const MAX_GUESSES = 6;

/*----- state variables -----*/

let board;
let guesses;
let winner;
let lose;

let guessedWords = [[]];
let nextSpace = 1;

/*----- cached elements  -----*/
const deleteBtn = document.getElementById('delete-key')
const enterBtn = document.getElementById('enter-key')

/*----- event listeners -----*/
const letters = document.querySelectorAll('button');

/*----- functions -----*/

init();

function init() {
    renderBoard();
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    const letters = document.querySelectorAll('button.key');
//borrowed this for loop from youtube tutorial
    for (let i = 0; i < letters.length; i++) {
        letters[i].onclick = ({target}) => {
                const key = target.textContent;
                addLetter(key);
            }
        }
    }

function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1]
}

function addLetter(letter) {
    const CurrentWordArr = getCurrentWordArr()

    if (CurrentWordArr && CurrentWordArr.length < 5) {
        CurrentWordArr.push(letter)

        const nextSpaceEl = document.getElementById(nextSpace)
        nextSpace = nextSpace + 1

        nextSpaceEl.textContent = letter;
    }
}

// renderControls () {
//     playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
// }