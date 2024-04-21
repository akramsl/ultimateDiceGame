//confetti pour le vainceur
window.addEventListener("load", () => {
  var end = Date.now() + (15 * 1000);

  var colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
})

// Récuperer le nom du gagnant

document.addEventListener('DOMContentLoaded', function () {
  let winnerSound = new Audio("Sound/winner_is.wav");
  winnerSound.play();

  const urlParam = new URLSearchParams(window.location.search);
  const winnerName = urlParam.get('winner');

  const winnerSelect = document.querySelector('.winner h1');
  winnerSelect.textContent = `${winnerName} a gagner le UDG`;
})

//rejouer une partie
function replayGame() {
  window.location = "index.html";
}

btnReplayGame = document.querySelector('.replay');
btnReplayGame.addEventListener('click', replayGame);
