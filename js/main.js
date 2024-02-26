/*----- constants -----*/
const WORDS_LIST = ['CODER', 'LOSER'];
const MAX_GUESSES = 6;

/*----- state variables -----*/

let board = [];
let secretWord = WORDS_LIST[0];

let winner;
let loser;

//an array of arrays that contain the guessed letters from each line
// let guessedWords = [[]];
let nextSpace = 1;
let turn;



/*----- cached elements  -----*/
const messegeEl = document.querySelector('h2');
const playAgainBtn = document.getElementById('play-again-btn');

/*----- event listeners -----*/
const letters = document.querySelectorAll('button.key');
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/

init();


function init() {
    board = document.querySelectorAll('#board > div')
    console.log(board);
    winner = 0;
    loser = 0;
    guessedWords = [[]];
    turn = 1;
    //first word is at index 0 here.
    render();
}

function render() {
    renderKeyboard();
    renderMessage();
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
    if(currentWord.length !== 5){
        return;
    } else if(currentWord === secretWord) {
        console.log('you win!');
        winner = 1;
    
    }
    
   
    highlightLetters();

    if(guessedWords.length === 6) {
        loser = 1;
        console.log('you lose');
    }

    guessedWords.push([]);
    render();
}

function highlightLetters() {
    let row = document.querySelectorAll('.row' + turn);
    console.log(row);
    const currentWord = getCurrentWordArr();
    console.log(`current word: ${currentWord}`);
    const secretWordArr = secretWord.split('');
    console.log(`secret word: ${secretWordArr}`);


    currentWord.forEach((letter, i) => {
        const secretLetter = secretWordArr[i];
        if (currentWord[i] === secretWordArr[i]) {
            //console.log('match')
            //console.log(i);
            row[i].style.backgroundColor = 'green';
        } else if (secretWordArr.includes(currentWord[i])) {
            console.log('close match')
            row[i].style.backgroundColor = 'goldenrod';
        }
    })
}

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


function handleDelete() {
    
    let currentWordArr = getCurrentWordArr();
    const deletedLetter = currentWordArr.pop();
    console.log(currentWordArr)

    currentWordArr = guessedWords[guessedWords.length - 1]
    const lastLetterEl = document.getElementById((nextSpace - 1))
console.log(guessedWords[guessedWords.length - 1])
console.log(guessedWords)
    lastLetterEl.textContent = '';
    nextSpace = nextSpace - 1;

    console.log(currentWordArr)
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
