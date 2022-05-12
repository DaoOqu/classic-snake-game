// declare global variables to track game board size
const linePixelCount = 40;
const totalPixelCount = linePixelCount ** 2;

// track scores and display it
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;

const gameContainer = document.querySelector('#game-container');

// generate game board
const createGameBoardPixels = () => {
  for(let i = 1; i < totalPixelCount; i++) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class='gameBoardPixel' id='pixel${i}'></div>`;
  }
}


// shorten reference to game pixels
const gameBoardPixels = document.querySelector('.gameBoardPixel');

let currentFoodPosition = 0;

// create the randomly generated food items in the game board
const createFood = () => {
  gameBoardPixels[currentFoodPosition].classlist.remove('food');
  currentFoodPosition = Math.floor(Math.random() * totalPixelCount);
  gameBoardPixels[currentFoodPosition].classlist.add('food');
}

// start setting up snake behavior
const leftDir = 37;
const upDir = 38;
const rightDir = 39;
const downDir = 40;

let snakeCurrentDirection = rightDir;

// make sure that user input is valid and change snake direction variable
const changeDirection = newDirectionCode => {
  if(newDirectionCode === snakeCurrentDirection) return;

  if(newDirectionCode === leftDir && snakeCurrentDirection !== rightDir) {
    snakeCurrentDirection = newDirectionCode;
  }else if(newDirectionCode === upDir && snakeCurrentDirection !== downDir) {
    snakeCurrentDirection = newDirectionCode;
  }else if(newDirectionCode === rightDir && snakeCurrentDirection !== leftDir) {
    snakeCurrentDirection = newDirectionCode;
  }else if(newDirectionCode === downDir && snakeCurrentDirection !== upDir) {
    snakeCurrentDirection = newDirectionCode;
  }
}

// set starting point for snake on load
let currentHeadPosition = totalPixelCount / 2;

// set initial length
let snakeLength = 200;

// start moving snake, wrap around to other side of screen if needed







