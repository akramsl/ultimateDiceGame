// Fonction pour simuler le lancé de dé

function rollDice() {
    let dice = Math.floor(Math.random() * 6) + 1;

    let diceImage = document.getElementById('dice-img');

    diceImage.src = 'Dice/dice-' + dice + '.png'
    

    console.log(dice);
};

let rollDiceButton = document.querySelector('.roll_dice');

rollDiceButton.addEventListener('click', rollDice)