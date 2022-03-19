//Declaring the global variables;
document.getElementById('game').style.display = 'none';
document.getElementById('selectDificulty').style.display = 'none';
document.getElementById('startGame').addEventListener('click', chooseDificulty);

//Function for choosing the beginner/advanced levels of the game
function chooseDificulty() {
    document.getElementById('startGamePlace').remove();
    document.getElementById('selectDificulty').style.display = 'initial';
    let selectDificultyButton = document.getElementById('selectDificultyButton');
    selectDificultyButton.addEventListener('click', selectedOption);
}

/* const beginnerWords=['SUBWAY', 'CLOTHES', 'FUNNY', 'WORD', 'WATER' ];
const advancedWords=['SYNDROME', 'JOGGING', 'MICROWAVE', 'FLAPJACK', 'MEGAHERTZ']; 
for (let i = 0 ; i < advancedWords.length ; i++) {
    let beginner = "advanced" + i;
    localStorage.setItem(beginner,advancedWords[i]);
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


function generateTheGame() {
    const hearts = new Array();
    for (let i = 0; i < 7; i++) {
        hearts[i] = document.createElement('img');
        hearts[i].src = 'images/heart.png';
        //Poate sa fac un id la fieacare pt a da remove!
        document.getElementById('totalLifes').appendChild(hearts[i]);
    }
    const letters = new Array();
    const theWord = generateTheWord(letters);
    generateTheKeyboard(letters, theWord);
    document.getElementById('infoText').innerText = "Your word has " + letters.length + " letters";
}

//Function for generating the word
function generateTheWord(letters) {
    const randomWordGenerator = document.getElementById('inputGroupSelect').value + Math.floor(Math.random() * 5);
    const randomWord = localStorage.getItem(randomWordGenerator);
    for (let i = 0; i < randomWord.length; i++) {
        letters[i] = document.createElement('input');
        letters[i].type = 'text';
        letters[i].maxLength = '1';
        letters[i].setAttribute('size', '2')
        letters[i].id = 'theLetter' + i;
        document.getElementById('putTheLetters').appendChild(letters[i]);
    }
    console.log(randomWord)
    return randomWord;
}

function generateTheKeyboard(letters, theWord) {
    const keyboardLetters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    const keyboard = new Array();
    for (let i = 0; i < keyboardLetters.length; i++) {
        keyboard[i] = document.createElement('button');
        keyboard[i].innerText = keyboardLetters[i];
        keyboard[i].id = "keyboardLetter";
        keyboard[i].addEventListener('click', () => {
            checkTheWord(keyboard[i].innerText, letters, theWord)
        });
        document.getElementById('keyboard').appendChild(keyboard[i]);
    }
}


//Sa fac sa numar cuvintele exemplu goodWord =1 goodWord++ si cand ajunge la limita sa bag functia de sfarsit joc
//Function for analysing the letter choosed by the player
function checkTheWord(letterPressed, letters, theWord) {
    let check=false;
    for (let i = 0; i < theWord.length; i++) {
        if (letterPressed === theWord[i]) {
            console.log(theWord[i])
            letters[i].value = letterPressed;
            letters[i].disabled = true;
            check=true;
        }
    }
    if(check===false) {
        document.getElementById('totalLifes').removeChild(document.getElementById('totalLifes').lastChild);
    }
}



//Sa fac jocul si partea in care scad inimile