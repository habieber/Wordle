/*----- constants -----*/
import {WORDS} from "./words.js"

/*----- state variables -----*/

// let secretWord = WORDS[0].toUpperCase();
let secretWord;

let winner;
let loser;

//an array of arrays that contain the guessed letters from each line
// let guessedWords = [[]];
let nextSpace;
let turn;
let guessedWords;



/*----- cached elements  -----*/
const messegeEl = document.querySelector('h2');
const playAgainBtn = document.getElementById('play-again-btn');
const board = document.querySelectorAll('#board > div')

/*----- event listeners -----*/
const letters = document.querySelectorAll('button.key');
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/

init();


function init() {
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    console.log(secretWord);
    winner = 0;
    loser = 0;
    guessedWords = [[]];
    turn = 1;
    //first word is at index 0 here.
    nextSpace = 1;
    //why am I having to manually enter this?
    playAgainBtn.style.visibility = 'hidden'
    // board.forEach((box, i) => {
    //     box.innerText = '';
    //     box.style.backgroundColor = 'black';
    // })
    render();
    renderBoard();
}




//find out why delete button isn't working properly after hitting play again btn




function render() {
    renderKeyboard();
    renderMessage();
}

function renderBoard() {
    document.querySelectorAll('#board > div').forEach((div, i) => {
        div.style.backgroundColor = 'black';
        div.innerText = '';
    })
   messegeEl.style.visibility = 'hidden';
}

// makes the clicking of keys populate letters to the board
function renderKeyboard() {
//learned this logic in a youtube tutorial
    for (let i = 0; i < letters.length; i++) {
        letters[i].onclick = ({target}) => {
                const key = target.textContent;
                
// diversion if enter or delete are clicked
                if(key === 'ENTER') {
                    handleSubmitGuess();
                    turn += 1;
                    return;
                } else if(key === 'DEL') {
                    handleDelete();
                    return;
                }

                handleAddLetter(key);
            }
        }
    }

function handleSubmitGuess() {
    const currentWord = getCurrentWordArr().join('');

    // working on a spell check kind of thing

    // console.log(WORDS.includes(currentWord.toLowerCase()))

    // encountering a bug that I need to work through!! 

    if(!WORDS.includes(currentWord.toLowerCase())) {
        console.log('not a word')
        handleNonwords();
        return;
    }

    if(currentWord.length !== 5){
        return;
    } else if(currentWord === secretWord) {
        winner = 1;
    }

    highlightLetters();

    if(guessedWords.length === 6) {
        loser = 1;
    }

    guessedWords.push([]);

    //adding a 'locked' class after a word is submitted so it can't be deleted
    let row = document.querySelectorAll('.row' + turn);
    row.forEach((letter, i) => {
        letter.classList.add('locked')
    })

    render();
}

function highlightLetters() {
    let row = document.querySelectorAll('.row' + turn);
    const currentWord = getCurrentWordArr();
    const secretWordArr = secretWord.split('');

    currentWord.forEach((letter, i) => {
        const secretLetter = secretWordArr[i];
        const key = document.getElementById(`${currentWord[i]}`);
        if (currentWord[i] === secretWordArr[i]) {
            //console.log('match')
            //console.log(i);
            row[i].style.backgroundColor = 'rgb(68, 125, 61)';
            
            key.style.backgroundColor = 'rgb(68, 125, 61)';
            console.log(key);
            console.log(currentWord[i])
        } else if (secretWordArr.includes(currentWord[i])) {
            row[i].style.backgroundColor = 'rgb(165, 143, 46)';
            key.style.backgroundColor = 'rgb(165, 143, 46)';
        } else {
            row[i].style.backgroundColor = 'rgb(44, 44, 46)';
            key.style.backgroundColor = 'rgb(44, 44, 46)';
        }
    })
}

function handleDelete() {
    const lastLetterEl = document.getElementById((nextSpace - 1));
    
    if(!lastLetterEl.classList.contains('locked')) {
        let currentWordArr = getCurrentWordArr();
        const deletedLetter = currentWordArr.pop();
    
        currentWordArr = guessedWords[guessedWords.length - 1]
    
        lastLetterEl.textContent = '';
        nextSpace = nextSpace - 1;
    }
}

function handleAddLetter(letter) {
    const currentWordArr = getCurrentWordArr()

    if (currentWordArr && currentWordArr.length < 5) {
        currentWordArr.push(letter)

        //access by row instead
        const nextSpaceEl = document.getElementById(nextSpace)
        nextSpace = nextSpace + 1

        nextSpaceEl.textContent = letter;
    }
}

// somehow, this situation screws up the rest of my functions
function handleNonwords() {
    messegeEl.style.visibility = 'visible';
    messegeEl.innerText = 'Enter a valid word';
    turn -= 1;
    console.log(turn);
    //shakey tile animation?
}

function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1]   
}

function renderMessage() {
    if(winner === 1) {
        messegeEl.style.visibility = 'visible';
        messegeEl.innerText = `You got it!`;
        playAgainBtn.style.visibility = 'visible';
    } else if(loser === 1) {
        messegeEl.style.visibility = 'visible';
        messegeEl.innerText = `Nice try! The word was ${secretWord}`;
        playAgainBtn.style.visibility = 'visible';
    }
}






//          CODE GRAVEYARD!!

// previous attempt at a color shading function

// function getTileColor(letter, index) {
//     const currentWord = getCurrentWordArr();
//     const isLetter = currentWord.includes(letter)

//     if (!isLetter) {
//         return 'grey'
//     } 

//     const letterSpot = currentWord.charAt(index)
//     const isLetterInSpot = (letter === letterSpot)

//     if (isLetterInSpot) {
//         return 'green'
//     }

//     return 'orange'
// }
