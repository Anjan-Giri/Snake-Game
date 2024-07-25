const board = document.querySelector("#board");
const context = board.getContext("2d");
const scoreElement = document.querySelector("#scoreElement");
const againButton = document.querySelector("#againButton");

const gWidth = board.width;
const gHeight = board.height;

const boardBG = "black";
const snakeColor = "white";
const snakeBorder = "cyan";
const foodColor = "white";

const uSize = 25;
let run = false;
let xVel = uSize;
let yVel = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: uSize * 4, y: 0 },
  { x: uSize * 3, y: 0 },
  { x: uSize * 2, y: 0 },
  { x: uSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);

againButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  run = true;
  scoreElement.textContent = score;
  createFood();
  drawFood();
  next();
}

function next() {
  if (run) {
    setTimeout(() => {
      clear();
      drawFood();
      moveSnake();
      drawSnake();
      checkOver();
      next();
    }, 75);
  } else {
    displayOver();
  }
}

function clear() {
  context.fillStyle = boardBG;
  context.fillRect(0, 0, gWidth, gHeight);
}

function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / uSize) * uSize;
    return randNum;
  }
  foodX = randomFood(0, gWidth - uSize);
  foodY = randomFood(0, gWidth - uSize);
}

function drawFood() {
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, uSize, uSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreElement.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, uSize, uSize);
    context.strokeRect(snakePart.x, snakePart.y, uSize, uSize);
  });
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;

  const goingUp = yVel == -uSize;
  const goingDown = yVel == uSize;
  const goingRight = xVel == uSize;
  const goingLeft = xVel == -uSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVel = -uSize;
      yVel = 0;
      break;

    case keyPressed == UP && !goingDown:
      xVel = 0;
      yVel = -uSize;
      break;

    case keyPressed == RIGHT && !goingLeft:
      xVel = uSize;
      yVel = 0;
      break;

    case keyPressed == DOWN && !goingUp:
      xVel = 0;
      yVel = uSize;
      break;
  }
}

function checkOver() {
  switch (true) {
    case snake[0].x < 0:
      run = false;
      break;

    case snake[0].x >= gWidth:
      run = false;
      break;

    case snake[0].y < 0:
      run = false;
      break;

    case snake[0].y >= gHeight:
      run = false;
      break;
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      run = false;
    }
  }
}

function displayOver() {
  context.font = "50px, MV Boli";
  context.fillstyle = "white";
  context.textAlign = "center";
  context.fillText("GAME OVER!", gWidth / 2, gHeight / 2);
  run = false;
}

function resetGame() {
  score = 0;
  xVel = uSize;
  yVel = 0;

  snake = [
    { x: uSize * 4, y: 0 },
    { x: uSize * 3, y: 0 },
    { x: uSize * 2, y: 0 },
    { x: uSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
