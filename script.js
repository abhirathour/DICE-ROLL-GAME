'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const curr0El = document.querySelector('#current--0');
const curr1El = document.querySelector('#current--1');

//starting condition
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');
let currScore = 0;
let activePlayer = 0;
let scores = [0, 0]; //total score
let playing = true; // used to terminate the game

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.rolling the dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // //3.check for rolled 1:if true switch player
    if (dice !== 1) {
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //switching the player
      currScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      diceEl.classList.add('hidden');
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//Holding button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //adding current score to total score & displaying
    console.log(activePlayer);
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      //Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    } else {
      //switch the player
      currScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      diceEl.classList.add('hidden');
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//Adding New button functionality
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score1El.textContent = 0;
  score2El.textContent = 0;
  diceEl.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  currScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
});
