// declare global variables to track game board size
const LINE_PIXEL_COUNT = 40;
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT ** 2;

// track scores and display it
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;

const gameContainer = document.querySelector('#game-container');

// generate game board
const createGameBoardPixels = () => {
  for(let i = 1; i < TOTAL_PIXEL_COUNT; i++) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class='gameBoardPixel' id='pixel${i}'></div>`;
  }
}

// shorten reference to game pixels
const gameBoardPixels = document.querySelector('.gameBoardPixel');

let currentFoodPosition = 0;

// create the randomly generated food items in the game board
const createFood = () => {
  gameBoardPixels[currentFoodPosition].classlist.remove('food');
  currentFoodPosition = Math.floor(Math.random() * TOTAL_PIXEL_COUNT);
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
  } else if(newDirectionCode === rightDir && snakeCurrentDirection !== leftDir) {
    snakeCurrentDirection = newDirectionCode;
  } else if(newDirectionCode === downDir && snakeCurrentDirection !== upDir) {
    snakeCurrentDirection = newDirectionCode;
  }
}

// set starting point for snake on load
let currentHeadPosition = TOTAL_PIXEL_COUNT / 2;

// set initial length
let snakeLength = 200;

// start moving snake, wrap around to other side of screen if needed
const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case leftDir:
      --currentHeadPosition;
      const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT === LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0;
      if(isHeadAtLeft) {
        currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT;
      }
      break;
    case righttDir:
      ++currentHeadPosition;
      const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT === 0;
      if(isHeadAtRight) {
        currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT;
      }
      break;
    case upDir:
      currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT;
      const isHeadAtTop = currentHeadPosition < 0;
      if(isHeadAtTop) {
        currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT;
      }
      break;
    case downDir:
      currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT;
      const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT - 1;
      if(isHeadAtBottom) {
        currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT;
      }
      break;
    default:
      break;
  }

  // accessed correct pixel within HTML collection
  let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition];

  // if snake interesects with its own body
  if(nextSnakeHeadPixel.classlist.contains('snakeBodyPixel')) {
    clearInterval(moveSnakeInterval);
    alert(`You have eaten ${totalFoodEaten} food(s) and traveled ${totalDistanceTraveled} blocks`);
    window.location.reload();
  }

  // add snake body styling assuming an empty pixel
  nextSnakeHeadPixel.classlist.add('snakeBodyPixel');

  // remove snake styling to keep snake appropriate length
  setTimeout(() => {
    nextSnakeHeadPixel.classlist.remove('snakeBodyPixel');
  }, snakeLength);

  // describes what to do when when snake eats food pixel
  if(currentHeadPosition === currentFoodPosition) {
    console.log('eat food');
    totalFoodEaten++;
    document.querySelector('#points-earned').innerText = totalFoodEaten;
  }

  // track distance traveled 
  totalDistanceTraveled++;
  document.querySelector('#blocks-traveled').innerText = totalDistanceTraveled;

}

// create board and start game
createGameBoardPixels();
createFood();

// animation speed
let moveSnakeInterval = setInterval(moveSnake, 100);
addEventListener(keydown, e => changeDirection(e.keyCode));

// variables for buttons
const leftButton = document.querySelector('#left-button');
const rightButton = document.querySelector('#right-button');
const upButton = document.querySelector('#up-button');
const downButton = document.querySelector('#down-button');

// listeners for buttons 
leftButton.onclick = () => changeDirection(leftDir);
rightButton.onclick = () => changeDirection(rightDir);
upButton.onclick = () => changeDirection(upDir);
downButton.onclick = () => changeDirection(downDir);








