let blockSize = 30;
let totalRow = 17;
let totalCol = 17;
let board;
let context;
let score = document.querySelector('p')
let reset = document.querySelector('button')
let count = 0;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
    board = document.querySelector('#board');
    board.height = totalRow * blockSize;
    board.width = totalCol * blockSize;
    context = board.getContext("2d");
    console.log(context);

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10)
}

function placeFood() {
    foodX = Math.floor(Math.random() * totalCol) * blockSize;
    foodY = Math.floor(Math.random() * totalRow) * blockSize
}

function update() {
    if (gameOver) {
        return;
    }

    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        count++;
        score.innerHTML = count;
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || (snakeX > (totalCol * blockSize)) || snakeY < 0 || (snakeY > (totalRow * blockSize))) {
        console.log(
            "hi"
        );
        // Out of bound condition
        gameOver = true;
        document.querySelector('.overgame').style.display = "block"
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {

            // Snake eats own body
            gameOver = true;
            document.querySelector('.overgame').style.display = "block"
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
}

reset.addEventListener('click', () => {
    location.reload()
})

