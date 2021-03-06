//Declaring the global variables
let goodWord = 0;
let theWord;
document.getElementById('game').style.display = 'none';
document.getElementById('selectDificulty').style.display = 'none';
showMode("", 'none');
//Adding Events to the submit Buttons
document.getElementById('Player1').addEventListener('click', chooseDificulty);
document.getElementById('Player2').addEventListener('click', insertWord);

//Function for choosing the beginner/advanced levels of the game(1 Player only!)
function chooseDificulty() {
    if (document.getElementById('startGamePlace')) {
        document.getElementById('startGamePlace').remove();
    }
    document.getElementById('selectDificulty').style.display = 'initial';
    showMode("Single Player Mode", 'flex');
    document.getElementById('selectDificultyButton').addEventListener('click', selectedOption);
}

//The Event-function for the select dificulty button
function selectedOption() {
    if (document.getElementById('inputGroupSelect').value === 'Choose the dificulty') {
    } else {
        document.getElementById('selectDificulty').style.display = 'none';
        generateTheGame();
    }
}

//Function for inserting the word(2 Players only!)
function insertWord() {
    if (document.getElementById('startGamePlace')) {
        document.getElementById('startGamePlace').remove();
    }
    showMode("Player vs Player Mode", 'flex');
    const yourWord = document.createElement('input');
    yourWord.type = 'text';
    yourWord.id = 'yourWord';
    yourWord.maxLength = '20';
    yourWord.minLength = '4';
    yourWord.placeholder = "Min 4 characters...Max 20 characters";
    document.getElementById('insertWord').appendChild(yourWord);
    const submitWord = document.createElement('button');
    submitWord.disabled = true;
    submitWord.innerText = "I choose this word";
    submitWord.className = 'btn btn-dark btn-lg';
    submitWord.id = "submitWord";
    document.getElementById('insertWord').appendChild(submitWord);
    //Fixing the minimum word length
    yourWord.addEventListener('keyup', () => {
        if (yourWord.value.length > 3 && yourWord.value != 0) {
            submitWord.disabled = false;
        } else {
            submitWord.disabled = true;
        }
    })
    submitWord.addEventListener('click', generateTheGame);
}

//Function for generating the game interface(both Game modes)
function generateTheGame() {
    //for verifying the game mode
    if (document.getElementById('yourWord')) {
        document.getElementById('insertWord').style.display = 'none';
    }
    showMode("", 'none');
    document.getElementById('game').style.display = 'flex';
    generateTheHearts();
    generateTheWord();
    infoTextFunction("Your word has " + theWord.join('').length + " letters");
    generateTheKeyboard();
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
    //Making the theWord an array of words
    if (document.getElementById('yourWord')) {
        theWord = document.getElementById('yourWord').value.toUpperCase().split(' ');
    } else {
        theWord = [localStorage.getItem(document.getElementById('inputGroupSelect').value + Math.floor(Math.random() * 5))];
    }
    //Generates the text inputs
    const letters = new Array();
    for (let i = 0; i < theWord.length; ++i) {
        letters[i] = new Array();
        let setOfPlaces = document.createElement('div');
        setOfPlaces.id = "setOfPlaces" + i;
        setOfPlaces.className = 'setOfLetters';
        document.getElementById('putTheLetters').appendChild(setOfPlaces)
        for (let j = 0; j < theWord[i].length; ++j) {
            letters[i][j] = document.createElement('input');
            letters[i][j].type = 'text';
            letters[i][j].maxLength = '1';
            letters[i][j].setAttribute('size', '2')
            letters[i][j].id = 'theLetter' + i + j;
            letters[i][j].addEventListener('keyup', () => {
                if (letters[i][j].value != "") {
                    let letterValue = letters[i][j].value[0].toUpperCase();
                    letters[i][j].value = '';
                    checkTheWord(letterValue);
                }
            })
            setOfPlaces.appendChild(letters[i][j]);
        }
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
    //For showing the first/last letters of the Word
    for (let i = 0; i < theWord.length; ++i) {
        document.getElementById(theWord[i][0]).click()
        document.getElementById(theWord[i][theWord[i].length - 1]).click();
    }
}

//Function for analysing the key choosed by the player
function checkTheWord(letterPressed) {
    let check = false;
    //If a letter is pressed again to not remove one heart
    if (document.getElementById(letterPressed).disabled === true) {
        check = true;
    } else {
        for (let i = 0; i < theWord.length; ++i) {
            for (let j = 0; j < theWord[i].length; ++j) {
                if (letterPressed === theWord[i][j]) {
                    document.getElementById('theLetter' + i + j).value = letterPressed;
                    document.getElementById('theLetter' + i + j).disabled = true;
                    keyboardEdit(letterPressed, 'yellowgreen');
                    check = true;
                    ++goodWord;
                }
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
        setTimeout(function () { restartSwitchButtons() }, 1.0 * 2000);
    } else {
        if (goodWord === theWord.join('').length) {
            if (document.getElementById('totalLifes').childNodes.length === 7) {
                infoTextFunction("Congratulation! You've done a PERFECT SCORE by winning without losing a single heart!");
                showResults();
                setTimeout(function () { restartSwitchButtons() }, 1.0 * 2000);
            } else {
                infoTextFunction("Congratulation! You've won!");
                showResults();
                setTimeout(function () { restartSwitchButtons(); }, 1.0 * 2000);
            }
        } else {
            if (goodWord > parseInt(theWord.join('').length / 2)) {
                infoTextFunction("You have only " + (theWord.join('').length - goodWord) + " letters left");
            }
        }
    }
}

//Function for editing the virtual-keyboard
function keyboardEdit(letterPressed, color) {
    document.getElementById(letterPressed).disabled = true;
    document.getElementById(letterPressed).style.backgroundColor = color;
}

//Function for editing the info-text
function infoTextFunction(desiredText) {
    document.getElementById('infoText').innerText = desiredText;
}

//Function for editing the InfoText about the game mode
function showMode(gameMode, displayMode) {
    document.getElementById('GameModeTitle').innerText = gameMode;
    document.getElementById('GameModeTitle').style.display = displayMode;
}

//Function for revealing the results
function showResults() {
    document.getElementById('keyboard').style.visibility = 'hidden';
    document.getElementById('totalLifes').style.visibility = 'hidden';
    for (let i = 0; i < theWord.length; i++) {
        for (let j = 0; j < theWord[i].length; j++) {
            document.getElementById('theLetter' + i + j).value = theWord[i][j];
            document.getElementById('theLetter' + i + j).disabled = true;
        }
    }
}

//Creating the restart button
function restartSwitchButtons() {
    const resetButton = document.createElement('button');
    resetButton.innerText = "Restart Game";
    resetButton.className = 'btn btn-dark btn-lg';
    resetButton.id = 'resetButton';
    document.getElementById('resetSwitchPlace').appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    const switchButton = document.createElement('button');
    switchButton.innerText = "Switch Game Mode";
    switchButton.className = 'btn btn-dark btn-lg';
    switchButton.id = 'switchButton';
    document.getElementById('resetSwitchPlace').appendChild(switchButton);
    switchButton.addEventListener('click', switchMode);
}

//Event-function for restarting the game
function resetGame() {
    if (document.getElementById('yourWord')) {
        document.getElementById('insertWord').style.display = 'flex';
        document.getElementById('yourWord').value = '';
        showMode("Player vs Player Mode", 'flex');
    } else {
        document.getElementById('selectDificulty').style.display = 'initial';
        showMode("Single Player Mode", 'flex');
    }
    removeFeatures();
}

//Function for switching the game mode
function switchMode() {
    if (document.getElementById('yourWord')) {
        document.getElementById('yourWord').remove();
        document.getElementById('submitWord').remove();
        chooseDificulty()
    } else {
        document.getElementById('insertWord').style.display = 'flex';
        insertWord();
    }
    removeFeatures();
}

//Function for removing the inside features
function removeFeatures() {
    document.getElementById('resetButton').remove();
    document.getElementById('switchButton').remove();
    document.getElementById('game').style.display = 'none';
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
    for (let i = 0; i < theWord.length; ++i) {
        document.getElementById('setOfPlaces' + i).remove();
    }
}