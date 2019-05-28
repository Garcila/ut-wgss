// Selectors
const winsSel = document.querySelector('.wins');
const lossesSel = document.querySelector('.losses');
const lettersGuessedSel = document.querySelector('.letters-guessed');
const guessedLetterSel = document.querySelector('.correct-letters');
const guessesLeftSel = document.querySelector('.guesses-left');
const messages = document.querySelector('figure');
const crystal = document.querySelector('img');

// Variables needed
const allAnimals = animals;
let wordToGuess = generateWordToGuess(allAnimals);
let wins = 0;
let losses = 0;
let lines = wordToLines(wordToGuess);
let guessesLeft = 10;
let lettersGuessed = [];
let correctLetters = [];
guessedLetterSel.textContent = lines.join(' ');
guessesLeftSel.textContent = `Guesses Left: ${guessesLeft}`;

// Functions
function generateWordToGuess(arr) {
  // Generate a random integer between 1 and the length of the characters string;
  return arr[
    Math.floor(Math.random() * Math.floor(arr.length))
  ].toLocaleLowerCase();
}

function alreadyPlayed(letter) {
  return lettersGuessed.includes(letter) ? true : false;
}

function wordToLines(word) {
  let lines = [];
  for (letter in word) {
    lines.push('_');
  }
  return lines;
}

function resetGame() {
  wordToGuess = generateWordToGuess(allAnimals);
  lines = wordToLines(wordToGuess);
  guessesLeft = 10;
  guessesLeftSel.textContent = `Guesses Left: ${guessesLeft}`;
  guessedLetterSel.textContent = lines.join(' ');
  lettersGuessed = [];
  lettersGuessedSel.textContent = lettersGuessed;
  correctLetters = [];
}

function replaceLines(letter) {
  [...wordToGuess].map((char, index) => {
    if (char === letter) {
      lines[index] = letter;
    }
  });
  return lines.join('');
}

function checkWin() {
  return lines.join('') === wordToGuess ? true : null;
}

function checkLetter(letter) {
  lettersGuessed.push(letter);
  lettersGuessedSel.textContent = lettersGuessed;
  if (wordToGuess.includes(letter)) {
    replaceLines(letter);
    correctLetters.push(letter);
    guessedLetterSel.textContent = lines.join(' ');
    if (checkWin()) {
      wins += 1;
      winsSel.textContent = `Wins: ${wins}`;
      resetGame();
      crystal.className = 'crystal jump';
    }
  } else {
    if (guessesLeft - 1 > 0) {
      guessesLeft -= 1;
      crystal.className = 'crystal shake';
      setTimeout(function() {
        crystal.className = 'crystal';
      }, 200);
      guessesLeftSel.textContent = `Guesses Left = ${guessesLeft}`;
    } else {
      losses += 1;
      lossesSel.textContent = `Losses: ${losses}`;
      resetGame();
    }
  }
}

function play(wordToGuess) {
  window.addEventListener('keypress', function(e) {
    let pressedKey = e.key.toLocaleLowerCase();
    if (alreadyPlayed(pressedKey)) {
      messages.className += ' already-guessed';
    } else {
      messages.className = 'figure';
      checkLetter(pressedKey);
    }
  });
}

play();
