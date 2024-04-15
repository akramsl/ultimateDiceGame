let activePlayer = 0; // Le joueur 1 commence
let currentScore = document.querySelector('.current_nb' + (activePlayer === 0 ? ' ' : '2 ') + 'h2').textContent = 0;
let totalScores = [0, 0];
let gamePlaying = true;
let dice;

function changeNamePlayer() {
    let player1Name = prompt("Nom du joueur 1 (5 caractères maximum)");
    if (!player1Name) {
        player1Name = "Joueur 1";
    } else {
        player1Name = player1Name.substring(0, 5) // limite de 5 caratères
    }

    let player2Name = prompt("Nom du joueur 2 (5 caractères maximum)");
    if (!player2Name) {
        player2Name = "Joueur 2";
    } else {
        player2Name = player2Name.substring(0, 5) // limite de 5 caratères
    }

    document.querySelector('.player_1 h2').textContent = player1Name;
    document.querySelector('.player_2 h2').textContent = player2Name;

};

function init() {
    document.querySelector('.current_nb h2').textContent = "0";
    document.querySelector('.current_nb2 h2').textContent = "0";
    document.querySelector('.total_nb h2').textContent = "0";
    document.querySelector('.total_nb2 h2').textContent = "0";
    totalScores = [0, 0];

    changeNamePlayer(); // Appele de la fonction pour afficher le nom des joueur 

}


init(); // Initailisation des points

document.querySelector('.new_game').addEventListener('click', () => {

    let newGameSound = new Audio("Sound/new_game.wav");
    newGameSound.play();

    init();
});

// Fonction qui permet de passer au prochain joueur
function nextPlayer() {
    document.querySelector('.current_nb' + (activePlayer === 0 ? ' ' : '2 ') + 'h2').textContent = 0
    currentScore = 0

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

// Fonction pour simuler le lancé de dé
function rollDice() {
    if (gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1; // Chiffre aleatoir entre 1 et 6

        let diceImage = document.getElementById('dice-img');
        diceImage.src = 'Dice/dice-' + dice + '.png';

        if (dice !== 1) {
            let addScore = currentScore += dice;
            document.querySelector('.current_nb' + (activePlayer === 0 ? ' ' : '2 ') + 'h2').textContent = addScore;
        } else {
            nextPlayer();
        }
    }
};

function holdScore() {
    totalScores[activePlayer] += currentScore;
    document.querySelector('.total_nb' + (activePlayer === 0 ? '' : '2') + ' h2').textContent = totalScores[activePlayer];
    // Lorsque le joueur atteint 100 points
    if (totalScores[activePlayer] >= 100) {
        // Rediriger vers la page winner.html
        const winnerName = document.querySelector('.player_' + (activePlayer === 0 ? '' : '2') + ' h2').textContent;

        window.location.href = `winner.html?winner=${encodeURIComponent(winnerName)}`;

        gamePlaying = false; // Modification de la variable pour arreter le jeu apres la victoire

    } else {
        nextPlayer();
    }
    let activePlayerName;
    if (activePlayer === 0) {
        activePlayerName = document.querySelector('.player_1 h2').textContent;
        rollDiceButton.classList.add('player_1_button');
        rollDiceButton.classList.remove('player_2_button');
    } else {
        activePlayerName = document.querySelector('.player_2 h2').textContent;
        rollDiceButton.classList.add('player_2_button');
        rollDiceButton.classList.remove('player_1_button');
    }
    let buttonLabel = `${activePlayerName} lance le dé`;
    rollDiceButton.textContent = buttonLabel;
}


document.querySelector('.hold').addEventListener('click', () => {

    let holdSound = new Audio("Sound/hold_sound.wav");
    holdSound.play();

    holdScore();

});

let rollDiceButton = document.querySelector('.roll_dice');

rollDiceButton.addEventListener('click', () => {

    rollDice();
    // ajout d'une class css sur le bouton de lancé en fonction du joueur 
    let activePlayerName;
    if (activePlayer === 0) {
        activePlayerName = document.querySelector('.player_1 h2').textContent;
        rollDiceButton.classList.add('player_1_button');
        rollDiceButton.classList.remove('player_2_button');
    } else {
        activePlayerName = document.querySelector('.player_2 h2').textContent;
        rollDiceButton.classList.add('player_2_button');
        rollDiceButton.classList.remove('player_1_button');
    }
    let buttonLabel = `${activePlayerName} lance le dé`;
    rollDiceButton.textContent = buttonLabel;

    let diceSound;
    if (dice == 1) {
        diceSound = new Audio("Sound/oups1.wav");
    } else {
        diceSound = new Audio("Sound/current_sound.wav");
    };
    diceSound.play();
});