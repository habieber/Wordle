/*----- constants -----*/
import {WORDS} from "./words.js"

/*----- state variables -----*/
let secretWord;
let winner;
let loser;
let nextSpace;
let turn;
let guessedWords;

let guessedWordCount;

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
    nextSpace = 1;
    guessedWordCount = 0;
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
        div.classList.remove('animate__flipInX')
    })
    document.querySelectorAll('.key').forEach((key) => {
        key.style.backgroundColor = 'rgb(128, 128, 128)';
    })
   messegeEl.style.visibility = 'hidden';
}

function renderKeyboard() {
//logic inspired by youtube tutorial: https://www.youtube.com/watch?v=j7OhcuZQ-q8
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
    


    // flawed spell checking, since not every word in the dictionary is in my library
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

    flipLetters();

    highlightLetters(); 
    
    if(guessedWords.length === 6) {
        loser = 1;
    }

    guessedWords.push([]);

    let row = document.querySelectorAll('.row' + turn);
    row.forEach((letter, i) => {
        letter.classList.add('locked')
    })

    render();
}

function flipLetters() {
    for (let i = 0; i < 5; i++) {
        const currentWordArr = getCurrentWordArr();
        const firstLetterId = guessedWordCount * 5 + 1
        const interval = 250 * i;

        setTimeout(() => {
            const letterId = firstLetterId + i;
            const letterEl = document.getElementById(`${letterId}`)

            letterEl.classList.add("animate__flipInX")
        }, interval)
    }

    guessedWordCount += 1;
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
        const interval = 250 * i

        if (currentWord[i] === secretWordArr[i]) {
            setTimeout (() => {
                row[i].style.backgroundColor = green;
                key.style.backgroundColor = green;
            }, interval)

            secretWordArr[i] = '';
            currentWord[i] = '';
        }
    }   

    for (let i = 0; i < 5; i++) {
        const key = document.getElementById(`${currentWord[i]}`);
        const interval = 250 * i

        if (!currentWord[i]) continue;
        
        const index = secretWordArr.indexOf(currentWord[i]);
        
        if (index !== -1) {
            setTimeout (() => {
                row[i].style.backgroundColor = yellow;
                key.style.backgroundColor = yellow;
            }, interval)
            
            secretWordArr[index] = '';
            
        } else {
            setTimeout (() => {
                row[i].style.backgroundColor = grey;
            }, interval)
            if (key.style.backgroundColor === 'rgb(128, 128, 128)') {
                setTimeout(() => {
                    key.style.backgroundColor = grey;
                }, interval)
            }
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
}

function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1]   
}

function renderMessage() {
    if(winner === 1) {
        setTimeout(() => {
            messegeEl.style.visibility = 'visible';
            messegeEl.innerText = `You got it!`;
            playAgainBtn.style.visibility = 'visible';
        }, 1600)  
    } else if(loser === 1) {
        setTimeout(() => {
            messegeEl.style.visibility = 'visible';
            messegeEl.innerText = `Nice try! The word was ${secretWord}`;
            playAgainBtn.style.visibility = 'visible';
        }, 1600)
    }
}