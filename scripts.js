//Declaring the global variables;
document.getElementById('game').style.display = 'none';
document.getElementById('selectDificulty').style.display = 'none';
document.getElementById('startGame').addEventListener('click', chooseDificulty);

function chooseDificulty() {
    document.getElementById('startGamePlace').remove();
    document.getElementById('selectDificulty').style.display = 'initial';
    let selectDificultyButton = document.getElementById('selectDificultyButton');
    selectDificultyButton.addEventListener('click', selectedOption);
}

/* const beginnerWords=['subway', 'clothes', 'funny', 'word', 'water' ];
const advancedWords=['syndrome', 'jogging', 'microwave', 'flapjack', 'megahertz']; */
//Sa lucrez la asta
function selectedOption() {
    if (document.getElementById('inputGroupSelect').value === 'Choose the dificulty') {

    } else {
        document.getElementById('selectDificulty').style.display = 'none';
        let lifes = document.createElement('h6')
        lifes.innerText=7 + ' lifes' ;
        document.getElementById('totalLifes').appendChild(lifes);
        document.getElementById('game').style.display = 'flex';
        generateTheWords(document.getElementById('inputGroupSelect').value);

    }
}


function generateTheWords(theKey) {
    const randomWordGenerator = theKey + Math.floor(Math.random() * 5);
    const randomWord = localStorage.getItem(randomWordGenerator);
    const letters = new Array();
    console.log(randomWord, randomWord.length)
    for (let i = 0; i < randomWord.length; i++) {
        letters[i] = document.createElement('input');
        letters[i].type = 'text';
        letters[i].maxLength = '1';
        letters[i].setAttribute('size', '2')
        letters[i].id = 'theLetters';
        document.getElementById('putTheLetters').appendChild(letters[i]);
    }
}

