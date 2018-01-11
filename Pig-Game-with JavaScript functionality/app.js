/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, winner;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
dice = 0;
winner = false;

function rollDice() {
  if (!winner) {
    dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice').innerHTML = '<img src="dice-' + dice + '.png" alt="Dice" class="dice">';
    getRoundScore();
  } else {
    newGame();
  }
}

function getRoundScore() {
  if (dice !== 1) {
    roundScore += dice;
    displayCurrentScores();
  } else {
    roundScore = 0;
    displayCurrentScores();
    changeActivePlayer();
  }
}

function changeActivePlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
    document.getElementById("player-0-active").className = "player-0-panel";
    document.getElementById("player-1-active").className = "player-1-panel active";
  } else {
    activePlayer = 0;
    document.getElementById("player-1-active").className = "player-1-panel";
    document.getElementById("player-0-active").className = "player-0-panel active";
  }
  roundScore = 0;
}

function holdScores() {
  scores[activePlayer] += roundScore;
  document.querySelector('#current-' + activePlayer).textContent = 0;
  displayTotalScore();
  if (!winner) {
    roundScores = 0;
    changeActivePlayer();
  }
}

function displayCurrentScores() {
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function displayTotalScore() {
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  checkWinner();
}

function checkWinner() {
  if (scores[activePlayer] >= 100) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
    document.querySelector('#name-' + activePlayer).classList.add("winner");
    winner = true;
  }
}

function newGame() {
  location.reload();
}
