/*----- constants -----*/
const WORDS_LIST = ['CODER', 'LOSER'];
const MAX_GUESSES = 6;

/*----- state variables -----*/

let board = [];
let secretWord = WORDS_LIST[0];

let winner;
let lose;

let guessedWords = [[]];
let nextSpace = 1;

/*----- cached elements  -----*/
// const deleteBtn = document.getElementById('delete-key')
// const enterBtn = document.getElementById('enter-key')
// ^^ cached these, but then realized I didn't need to specifically access them

/*----- event listeners -----*/
const letters = document.querySelectorAll('button.key');

/*----- functions -----*/

init();


function init() {
    board = document.querySelectorAll('board > div')
    render();
}

function render() {
    renderKeyboard();
    // renderMessage();
    // renderKeyboard();
}

function renderBoard() {
    // board.forEach() {

    // }
} 

// makes the clicking of keys populate letters to the board
function renderKeyboard() {

//borrowed this for loop from youtube tutorial
    for (let i = 0; i < letters.length; i++) {
        letters[i].onclick = ({target}) => {
                const key = target.textContent;
                
// diversion if enter or delete are clicked
                if(key === 'ENTER') {
                    handleSubmitGuess();
                    return;
                } else if(key === 'DEL') {
                    handleDelete();
                    return;
                }

                addLetter(key);
            }
        }
    }

function handleSubmitGuess() {
    console.log('submit guess function!')
    const currentWordArr = getCurrentWordArr().join('');
    if(currentWordArr.length !== 5){
        return;
    } else if(currentWordArr === secretWord) {
        console.log('you win!');
    }

    guessedWords.push([]);
}

function handleDelete() {
    console.log('delete function!')
}

function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1]
    
}

function addLetter(letter) {
    const currentWordArr = getCurrentWordArr()

    if (currentWordArr && currentWordArr.length < 5) {
        currentWordArr.push(letter)

        const nextSpaceEl = document.getElementById(nextSpace)
        nextSpace = nextSpace + 1

        nextSpaceEl.textContent = letter;
    }
}

// renderControls () {
//     playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
// }