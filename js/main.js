/*----- constants -----*/
import {WORDS} from "./words.js"

/*----- state variables -----*/
let secretWord;
let winner;
let loser;
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
    playAgainBtn.style.visibility = 'hidden'
    render();
    renderBoard();
}

function render() {
    renderKeyboard();
    renderMessage();
}

function renderBoard() {
    document.querySelectorAll('#board > div').forEach((div, i) => {
        div.style.backgroundColor = 'black';
        div.innerText = '';
        div.classList.remove('locked');
    })
    document.querySelectorAll('.key').forEach((key) => {
        key.style.backgroundColor = 'grey';
    })
   messegeEl.style.visibility = 'hidden';
}

function renderKeyboard() {
//learned this logic in a youtube tutorial
    for (let i = 0; i < letters.length; i++) {
        letters[i].onclick = ({target}) => {
                const key = target.textContent;
                
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

    // flawed spell checking, since not every word is in my library

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

    //added a 'locked' class after a word is submitted so it can't be deleted
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
    const green = 'rgb(68, 125, 61)';
    const yellow = 'rgb(165, 143, 46)';
    const grey = 'rgb(44, 44, 46)';

//inspired by https://stackoverflow.com/questions/72865151/duplicate-verification-in-wordle-clone/72865444#72865444
    for (let i = 0; i < 5; i++) {
        const key = document.getElementById(`${currentWord[i]}`);

        if (currentWord[i] === secretWordArr[i]) {
            row[i].style.backgroundColor = green;
            key.style.backgroundColor = green;
            secretWordArr[i] = '';
            currentWord[i] = '';
        }
    }    
    for (let i = 0; i < 5; i++) {
        const key = document.getElementById(`${currentWord[i]}`);

        if (!currentWord[i]) continue;
        const index = secretWordArr.indexOf(currentWord[i]);
        console.log(i)
        if (index !== -1) {
            row[i].style.backgroundColor = yellow;
            key.style.backgroundColor = yellow;
            secretWordArr[index] = '';
        } else {
            row[i].style.backgroundColor = grey;
            key.style.backgroundColor = grey;
        }
    }    
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

        //access by row instead?
        const nextSpaceEl = document.getElementById(nextSpace)
        nextSpace = nextSpace + 1

        nextSpaceEl.textContent = letter;
    }
}

function handleNonwords() {
    messegeEl.style.visibility = 'visible';
    messegeEl.innerText = 'Enter a valid word';
    
    setTimeout(() => {
        messegeEl.style.visibility = 'hidden';
    }, 3000);

    turn -= 1;
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

//     const currentWordpot = currentWord.charAt(index)
//     const isLetterInSpot = (letter === letterSpot)

//     if (isLetterInSpot) {
//         return 'green'
//     }

//     return 'orange'
// }



    // currentWord.forEach((letter, i) => {
    //     const secretLetter = secretWordArr[i];
    //     const key = document.getElementById(`${currentWord[i]}`);

    // // if(currentWordLetterCount[currentWord[i]] > 1){
    // //     console.log(currentWordLetterCount[currentWord[i]] > 1)
    // //     return;
    // // }

    //     if (currentWord[i] === secretWordArr[i]) {
    //         row[i].style.backgroundColor = 'rgb(68, 125, 61)';
    //         key.style.backgroundColor = 'rgb(68, 125, 61)';
    //     } else if (secretWordArr.includes(currentWord[i])) {
    //         const amountOfLetter = secretWordArr.filter((curLetter) => curLetter === (currentWord[i]))
    //         if (amountOfLetter.length > 1){
    //             row[i].style.backgroundColor = 'rgb(44, 44, 46)';
    //             key.style.backgroundColor = 'rgb(44, 44, 46)';
    //         } else {
    //             row[i].style.backgroundColor = 'rgb(165, 143, 46)';
    //             key.style.backgroundColor = 'rgb(165, 143, 46)';
    //         }
    //     } else {
    //         row[i].style.backgroundColor = 'rgb(44, 44, 46)';
    //         key.style.backgroundColor = 'rgb(44, 44, 46)';
    //     }
    // })


//}

// else if (secretWordArr.includes(currentWord[i])) {
//     row[i].style.backgroundColor = 'rgb(165, 143, 46)';
//     key.style.backgroundColor = 'rgb(165, 143, 46)';



// let secretWordLetterCount = secretWordArr.reduce((acc, i) => {
//     !acc[i] ? acc[i] = 1 : acc[i]++
//     return acc
// }, {})

// let currentWordLetterCount = currentWord.reduce((acc, i) => {
//     !acc[i] ? acc[i] = 1 : acc[i]++
//     return acc
// }, {})

// console.log(secretWordLetterCount);
// console.log(currentWordLetterCount);
