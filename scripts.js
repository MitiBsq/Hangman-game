//Declaring the global variables;
document.getElementById('game').style.display = 'none';
document.getElementById('selectDificulty').style.display = 'none';
document.getElementById('startGame').addEventListener('click', chooseDificulty);
let goodWord=0;
let theWord;
//Function for choosing the beginner/advanced levels of the game
function chooseDificulty() {
    document.getElementById('startGamePlace').remove();
    document.getElementById('selectDificulty').style.display = 'initial';
    document.getElementById('selectDificultyButton').addEventListener('click', selectedOption);
}

/* const beginnerWords=['SUBWAY', 'CLOTHES', 'FUNNY', 'WORD', 'WATER' ];
const advancedWords=['SYNDROME', 'JOGGING', 'MICROWAVE', 'FLAPJACK', 'MEGAHERTZ']; 
for (let i = 0 ; i < advancedWords.length ; i++) {
    let beginner = "beginner" + i;
    localStorage.setItem(beginner,beginnerWords[i]);
} 
for (let i = 0 ; i < advancedWords.length ; i++) {
    let advanced = "advanced" + i;
    localStorage.setItem(advancerd,advancedWords[i]);
} */

//Sa lucrez la asta
function selectedOption() {
    if (document.getElementById('inputGroupSelect').value === 'Choose the dificulty') {

    } else {
        document.getElementById('selectDificulty').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
        generateTheGame();
    }
}

//Function for generating the game interface
function generateTheGame() {
    const hearts = new Array();
    for (let i = 0; i < 7; i++) {
        hearts[i] = document.createElement('img');
        hearts[i].src = 'images/heart.png';
        document.getElementById('totalLifes').appendChild(hearts[i]);
    }
    generateTheWord();
    generateTheKeyboard();
    infoTextFunction("Your word has " + theWord.length + " letters");
}

//Function for generating the word
function generateTheWord() {
    theWord = localStorage.getItem(document.getElementById('inputGroupSelect').value + Math.floor(Math.random() * 5));
    const letters = new Array();
    for (let i = 0; i < theWord.length; i++) {
        letters[i] = document.createElement('input');
        letters[i].type = 'text';
        letters[i].maxLength = '1';
        letters[i].setAttribute('size', '2')
        letters[i].id = 'theLetter' + i;
        document.getElementById('putTheLetters').appendChild(letters[i]);
    }
}

function generateTheKeyboard() {
    const keyboardLetters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    const keyboard = new Array();
    for (let i = 0; i < keyboardLetters.length; i++) {
        keyboard[i] = document.createElement('button');
        keyboard[i].innerText = keyboardLetters[i];
        keyboard[i].className = "keyboardLetter";
        keyboard[i].id = keyboardLetters[i];
        keyboard[i].addEventListener('click', () => {
            checkTheWord(keyboard[i].innerText)
        });
        document.getElementById('keyboard').appendChild(keyboard[i]);
    }
}

//Function for analysing the letter choosed by the player
function checkTheWord(letterPressed) {
    let check=false;
    for (let i = 0; i < theWord.length; i++) {
        if (letterPressed === theWord[i]) {
            document.getElementById('theLetter' + i).value=letterPressed;
            document.getElementById('theLetter' + i).disabled=true;
            keyPressedEdit(letterPressed, 'yellowgreen');
            check=true;
            ++goodWord;
        }
    }
    if(check===false) {
        document.getElementById('totalLifes').removeChild(document.getElementById('totalLifes').lastChild);
        keyPressedEdit(letterPressed, 'crimson');
    }
    analyseTheSituation();
}

function analyseTheSituation() {
    if (document.getElementById('totalLifes').childNodes.length===0) {
        infoTextFunction("Saddly, You've lost!\n\n" + "You're word was:");
        showResults();
        setTimeout(function () { restartButton() }, 1.0*2000);
    } else {
        if (goodWord === theWord.length) {
            if (document.getElementById('totalLifes').childNodes.length===7) {
                infoTextFunction("Congratulation! You've done a PERFECT SCORE by winning without losing a single heart!");
                showResults();
                setTimeout(function () { restartButton() }, 1.0*2000);
            } else {
                infoTextFunction("Congratulation! You've won!");
                showResults();
                setTimeout(function () { restartButton() }, 1.0*2000);
            }
        } else {
            if (goodWord > parseInt(theWord.length/2 )) {
                infoTextFunction("You have only " + (theWord.length - goodWord)+ " letters left");
            }
        }
    }
}

function keyPressedEdit(letterPressed, color) {
    document.getElementById(letterPressed).disabled=true;
    document.getElementById(letterPressed).style.backgroundColor=color;
}

function infoTextFunction(desiredText) {
    document.getElementById('infoText').innerText = desiredText;
}

 function showResults() {
    document.getElementById('keyboard').style.visibility='hidden';
    document.getElementById('totalLifes').style.visibility='hidden';
    for (let i = 0; i < theWord.length; i++) {
        document.getElementById('theLetter' + i).value=theWord[i];
        document.getElementById('theLetter' + i).disabled=true;
    }
} 

function restartButton() {
    const resetButton=document.createElement('button');
    resetButton.innerText="Restart Game";
    resetButton.className='btn btn-dark btn-lg';
    resetButton.id='resetButton';
    document.getElementById('resetButtonPlace').appendChild(resetButton);
    resetButton.addEventListener('click', resetGame );
}

function resetGame() {
    document.getElementById('resetButton').remove();
    document.getElementById('selectDificulty').style.display = 'initial';
    document.getElementById('totalLifes').style.visibility='visible';
    document.getElementById('keyboard').style.visibility='visible';
    const keyboardLetters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    for (let i = 0; i < keyboardLetters.length; i++) {
        document.getElementById( keyboardLetters[i]).remove();
    }
    infoTextFunction('');
    for (let i = 0; i < theWord.length; i++) {
        document.getElementById('theLetter' + i).remove();
    }  
    document.getElementById('selectDificultyButton').addEventListener('click', selectedOption);
}

//Sa vad de partea de joc in 2 playeri 
//Sa fac chestia daca scrii manual litera in input