//Declaring the global variables;
document.getElementById('selectDificulty').style.visibility='hidden';
document.getElementById('startGame').addEventListener('click', chooseDificulty);

function chooseDificulty() {
    document.getElementById('startGamePlace').remove();
    document.getElementById('selectDificulty').style.visibility='visible';
    
}