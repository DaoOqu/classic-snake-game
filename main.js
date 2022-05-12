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






