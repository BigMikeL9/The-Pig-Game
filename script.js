'use strict';

/* Game Rules: 1. First player to collect a final score of 100 points wins. 
               2. Players need to hold, in order to add their cumulative rolled dice points to their final score.
               3. If a dice with 1 point is rolled, then its the other's player turn. And current cumulative rolled points are lost. */

// Selected elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let finalScore, currentScore, gameActive;
let currentPlayer = 0;

// Starting Conditions
const init = function () {
  finalScore = [0, 0];
  currentScore = 0;
  gameActive = true;

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
  diceElement.classList.add('hidden');
};

init();

const switchPlayer = function () {
  // Resets Current score of currentPlayer
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;

  // Sets current score to 0
  currentScore = 0;

  // Switches player accordingly
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  // Toggles the highlighted background, for both players
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Generates Random Dice
const randomDice = function () {
  const randomNum = Math.floor(Math.random() * 6 + 1);
  diceElement.classList.remove('hidden');

  diceElement.src = `dice-${randomNum}.png`;

  if (randomNum !== 1) {
    // Add score to current player
    currentScore += randomNum;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    // When randomNum is equal to 1
    switchPlayer();
  }
};

// Rolling Dice functionality
btnRollDice.addEventListener('click', function () {
  if (gameActive) {
    randomDice();
  }
});

// Hold score button functionality
btnHold.addEventListener('click', function () {
  if (gameActive) {
    // Add currentScore to current player's finalScore
    finalScore[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      finalScore[currentPlayer];

    if (finalScore[currentPlayer] >= 100) {
      // Finish the game
      gameActive = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      // else switch to next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);

// Modal Window
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  console.log(event.key);
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
