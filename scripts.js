//Declaring the global variables
let goodWord = 0;
let theWord;
document.getElementById('game').style.display = 'none';
document.getElementById('selectDificulty').style.display = 'none';
//Adding Events to the submit Buttons
document.getElementById('Player1').addEventListener('click', chooseDificulty);
document.getElementById('Player2').addEventListener('click', insertWord);

//Function for choosing the beginner/advanced levels of the game(1 Player only!)
function chooseDificulty() {
    document.getElementById('startGamePlace').remove();
    document.getElementById('selectDificulty').style.display = 'initial';
    document.getElementById('selectDificultyButton').addEventListener('click', selectedOption);
}

//The Event-function for the select dificulty button
function selectedOption() {
    if (document.getElementById('inputGroupSelect').value === 'Choose the dificulty') {
    } else {
        document.getElementById('selectDificulty').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
        generateTheGame1Player();
    }
}

//Function for generating the game interface(1 Player only!)
function generateTheGame1Player() {
    generateTheHearts();
    generateTheWord();
    generateTheKeyboard();
    infoTextFunction("Your word has " + theWord.length + " letters");
}

//Function for inserting the word(2 Players only!)
function insertWord() {
    document.getElementById('startGamePlace').remove();
    document.getElementById('game').style.display = 'flex';
    const yourWord = document.createElement('input');
    yourWord.type = 'text';
    yourWord.id = 'yourWord';
    yourWord.maxLength = '20';
    document.getElementById('insertWord').appendChild(yourWord);
    const submitWord = document.createElement('button');
    submitWord.innerText = "I choose this word";
    submitWord.className = 'btn btn-dark btn-lg';
    document.getElementById('insertWord').appendChild(submitWord);
    submitWord.addEventListener('click', generateTheGame2Players);
}

//Funnction for generating the game interface(2 Players only!)
function generateTheGame2Players() {
    document.getElementById('insertWord').style.display = 'none';
    generateTheHearts();
    generateTheWord();
    generateTheKeyboard();
    infoTextFunction("Your word has " + theWord.length + " letters");
}

//Function for generating the player's chances(lifes)
function generateTheHearts() {
    document.getElementById('totalLifes').style.visibility = 'visible';
    const hearts = new Array();
    for (let i = 0; i < 7; i++) {
        hearts[i] = document.createElement('img');
        hearts[i].src = 'images/heart.png';
        hearts[i].id = "heart" + i;
        document.getElementById('totalLifes').appendChild(hearts[i]);
    }
}

//Function for generating the word
function generateTheWord() {
    if (document.getElementById('yourWord')) {
        theWord = document.getElementById('yourWord').value.toUpperCase();
    } else {
        theWord = localStorage.getItem(document.getElementById('inputGroupSelect').value + Math.floor(Math.random() * 5));
    }
    //Generates the text inputs
    const letters = new Array();
    for (let i = 0; i < theWord.length; i++) {
        letters[i] = document.createElement('input');
        letters[i].type = 'text';
        letters[i].maxLength = '1';
        letters[i].setAttribute('size', '2')
        letters[i].id = 'theLetter' + i;
        letters[i].addEventListener('keyup', () => {
            if (letters[i].value != "") {
                let letterValue = letters[i].value[0].toUpperCase();
                letters[i].value = '';
                checkTheWord(letterValue);
            }
        })
        document.getElementById('putTheLetters').appendChild(letters[i]);
    }
}

//Function for generating the virtual Keyboard(A-Z)
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

//Function for analysing the key choosed by the player
function checkTheWord(letterPressed) {
    let check = false;
    if (document.getElementById(letterPressed).disabled === true) {
        check = true;
    } else {
        for (let i = 0; i < theWord.length; i++) {
            if (letterPressed === theWord[i]) {
                document.getElementById('theLetter' + i).value = letterPressed;
                document.getElementById('theLetter' + i).disabled = true;
                keyboardEdit(letterPressed, 'yellowgreen');
                check = true;
                ++goodWord;
            }
        }
    }
    if (check === false) {
        document.getElementById('totalLifes').removeChild(document.getElementById('totalLifes').lastChild);
        keyboardEdit(letterPressed, 'crimson');
    }
    analyseTheSituation();
}

//Function for analysing the virtual-keyboard's key pressed/key inserted
function analyseTheSituation() {
    if (document.getElementById('totalLifes').childNodes.length === 0) {
        infoTextFunction("Saddly, You've lost!\n\n" + "You're word was:");
        showResults();
        setTimeout(function () { restartButton() }, 1.0 * 2000);
    } else {
        if (goodWord === theWord.length) {
            if (document.getElementById('totalLifes').childNodes.length === 7) {
                infoTextFunction("Congratulation! You've done a PERFECT SCORE by winning without losing a single heart!");
                showResults();
                setTimeout(function () { restartButton() }, 1.0 * 2000);
            } else {
                infoTextFunction("Congratulation! You've won!");
                showResults();
                setTimeout(function () { restartButton() }, 1.0 * 2000);
            }
        } else {
            if (goodWord > parseInt(theWord.length / 2)) {
                infoTextFunction("You have only " + (theWord.length - goodWord) + " letters left");
            }
        }
    }
}

//Function for editing the virtual-keyboard
function keyboardEdit(letterPressed, color) {
    document.getElementById(letterPressed).disabled = true;
    document.getElementById(letterPressed).style.backgroundColor = color;
}

//Fucntion for editing the info-text
function infoTextFunction(desiredText) {
    document.getElementById('infoText').innerText = desiredText;
}

//Function for revealing the results
function showResults() {
    document.getElementById('keyboard').style.visibility = 'hidden';
    document.getElementById('totalLifes').style.visibility = 'hidden';
    for (let i = 0; i < theWord.length; i++) {
        document.getElementById('theLetter' + i).value = theWord[i];
        document.getElementById('theLetter' + i).disabled = true;
    }
}

//Creating the restart button
function restartButton() {
    const resetButton = document.createElement('button');
    resetButton.innerText = "Restart Game";
    resetButton.className = 'btn btn-dark btn-lg';
    resetButton.id = 'resetButton';
    document.getElementById('resetButtonPlace').appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

//Event-function for restarting the game
function resetGame() {
    document.getElementById('resetButton').remove();
    if (document.getElementById('yourWord')) {
        document.getElementById('insertWord').style.display = 'flex';
        document.getElementById('yourWord').value = '';
    } else {
        document.getElementById('selectDificulty').style.display = 'initial';
    }
    document.getElementById('keyboard').style.visibility = 'visible';
    const keyboardLetters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    for (let i = 0; i < keyboardLetters.length; i++) {
        document.getElementById(keyboardLetters[i]).remove();
    }
    goodWord = document.getElementById('totalLifes').childElementCount;
    for (let i = 0; i < goodWord; i++) {
        document.getElementById('totalLifes').removeChild(document.getElementById('totalLifes').lastChild);
    }
    goodWord = 0;
    infoTextFunction('');
    for (let i = 0; i < theWord.length; i++) {
        document.getElementById('theLetter' + i).remove();
    }
}