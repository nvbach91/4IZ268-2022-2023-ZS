$(document).ready(() => {
  // initialize app
  const gameContainer = $("#game");
  const ctx = gameContainer[0].getContext("2d");
  const scoreContainer = $("#score");
  const restartButton = $("#restartButton");
  const highScoreContainer = $("#high-score");

  //game customization
  const gameBoardColor = "#fff";
  const gameBoardBorderColor = "#27373F";
  const snakeColor = "white";
  const foodColor = "#4FC3F7";
  const cellSize = 25;
  const snakeSpeed = 75;

  let isGameRunning = false;

  let xVelocity = cellSize;
  let yVelocity = 0;
  let foodXCoordinates;
  let foodYCoordinates;

  let score = 0;

  let snake = [
    { x: cellSize * 3, y: 0 },
    { x: cellSize * 2, y: 0 },
    { x: cellSize, y: 0 },
    { x: 0, y: 0 },
  ];

  const checkLocalStorage = () => {
    if (localStorage.score == undefined) {
      localStorage.setItem("score", 0);
    }
    return localStorage.score;
  };

  let highScore = checkLocalStorage();
  highScoreContainer.text(highScore);


  const startGame = () => {
    isGameRunning = true;
    scoreContainer.text(score);
    highScore = checkLocalStorage();
    highScoreContainer.text(highScore);
    createFood();
    displayFood();
    nextTick();
  };

  const createFood = () => {
    do {
      foodCoordinates = {
        x: getFoodCoordinates(gameContainer.width(), cellSize),
        y: getFoodCoordinates(gameContainer.width(), cellSize),
      };
    } while (isSnakeNotThere(foodCoordinates));

    foodXCoordinates = foodCoordinates.x;
    foodYCoordinates = foodCoordinates.y;
  };

  const isSnakeNotThere = (coordinates) => {
    return snake.find((c) => c.x === coordinates.x && c.y === coordinates.y);
  };

  const getFoodCoordinates = (width, cellSize) => {
    coordinates =
      Math.round((Math.random() * (width - cellSize)) / cellSize) * cellSize;
    return coordinates;
  };

  const displayFood = () => {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodXCoordinates, foodYCoordinates, cellSize, cellSize);
  };

  const nextTick = () => {
    if (isGameRunning) {
      setTimeout(() => {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
      }, snakeSpeed);
    } else {
      diplayGameOver();
    }
  };

  const clearBoard = () => {
    ctx.clearRect(0, 0, gameContainer.width(), gameContainer.height());
    ctx.strokeStyle = gameBoardBorderColor;
    ctx.fillStyle = gameBoardColor;
    ctx.lineWidth = 1;
    for (var i = 0; i < 25; ++i) for (var j = 0; j < 25; ++j) drawCell(i, j);
  };

  const drawCell = (i, j) => {
    ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
  };

  const drawSnake = () => {
    ctx.fillStyle = snakeColor;
    snake.forEach((bodyPart) => {
      ctx.fillRect(bodyPart.x, bodyPart.y, cellSize, cellSize);
      ctx.strokeRect(bodyPart.x, bodyPart.y, cellSize, cellSize);
    });
  };

  const moveSnake = () => {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    if (snake[0].x == foodXCoordinates && snake[0].y == foodYCoordinates) {
      score += 1;
      scoreContainer.text(score);
      createFood();
    } else {
      snake.pop();
    }
  };

  const changeDirection = (event) => {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = yVelocity == -cellSize;
    const goingDown = yVelocity == cellSize;
    const goingRight = xVelocity == cellSize;
    const goingLeft = xVelocity == -cellSize;

    switch (true) {
      case keyPressed == LEFT && !goingRight:
        xVelocity = -cellSize;
        yVelocity = 0;
        break;
      case keyPressed == UP && !goingDown:
        xVelocity = 0;
        yVelocity = -cellSize;
        break;
      case keyPressed == RIGHT && !goingLeft:
        xVelocity = cellSize;
        yVelocity = 0;
        break;
      case keyPressed == DOWN && !goingUp:
        xVelocity = 0;
        yVelocity = cellSize;
        break;
    }
  };

  const checkGameOver = () => {
    switch (true) {
      case snake[0].x < 0:
        isGameRunning = false;
        break;
      case snake[0].x >= gameContainer.width():
        isGameRunning = false;
        break;
      case snake[0].y < 0:
        isGameRunning = false;
        break;
      case snake[0].y >= gameContainer.height():
        isGameRunning = false;
        break;
    }
    for (let i = 1; i < snake.length; i += 1) {
      if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
        isGameRunning = false;
      }
    }
  };

  const diplayGameOver = () => {
    isGameRunning = false;
    ctx.fillStyle = "#455a64";
    ctx.strokeStyle = "#FFA000";
    ctx.lineWidth = 5;
    ctx.font = "20px Varela Round";
    ctx.textAlign = "center";

    if (score > localStorage.score) {
      localStorage.score = score;
      ctx.fillRect(160, 220, 180, 80);
      ctx.strokeRect(160, 220, 180, 80);
      ctx.fillStyle = "white";
      ctx.fillText(`New high score: ${score}`, 250, 280);
    } else {
      ctx.fillRect(160, 220, 180, 50);
      ctx.strokeRect(160, 220, 180, 50);
    }
    ctx.fillStyle = "white";
    ctx.fillText(
      "GAME OVER!",
      gameContainer.width() / 2,
      gameContainer.height() / 2
    );
  };

  const restartGame = () => {
    score = 0;
    xVelocity = cellSize;
    console.log(xVelocity)
    console.log(snakeSpeed)
    yVelocity = 0;
    snake = [
      { x: cellSize * 3, y: 0 },
      { x: cellSize * 2, y: 0 },
      { x: cellSize, y: 0 },
      { x: 0, y: 0 },
    ];
    highScoreContainer.text(highScore);
    startGame();
  };

  const handleConnectDisconnect = (connected) => {
    const connectedContainer = $('#connected');
    const notConnectedContainer = $('#not-connected');
    ctx.clearRect(0, 0, gameContainer.width(), gameContainer.height());
    ctx.font = "20px Varela Round";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Click on touchpad to start the game.",
      gameContainer.width() / 2,
      gameContainer.height() / 2
    );
    if (connected) {
        notConnectedContainer.toggle();
        connectedContainer.toggle();
    } else {
        notConnectedContainer.toggle();
        connectedContainer.toggle();
    }
  };

  const handleButtonsEntries = () => {
    setTimeout(() => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads.find((gamepad) => gamepad !== null);

    const touchPad = gamepad.buttons[17].pressed;
    if (touchPad && !isGameRunning) {
        restartGame();
    }

    const upPressed = gamepad.buttons[12].pressed;
    const downPressed = gamepad.buttons[13].pressed;
    const leftPressed = gamepad.buttons[14].pressed;
    const rightPressed = gamepad.buttons[15].pressed;

    const LJoystick_LR = gamepad.axes[0];
    const LJoystick_UD = gamepad.axes[1];
    const RJoystick_LR = gamepad.axes[2];
    const RJoystick_UD = gamepad.axes[3];

    const goingUp = yVelocity == -cellSize;
    const goingDown = yVelocity == cellSize;
    const goingRight = xVelocity == cellSize;
    const goingLeft = xVelocity == -cellSize;

    switch (true) {
      case (leftPressed || LJoystick_LR == -1 || RJoystick_LR == -1) &&
        !goingRight:
        xVelocity = -cellSize;
        yVelocity = 0;
        break;
      case (upPressed || LJoystick_UD == -1 || RJoystick_UD == -1) &&
        !goingDown:
        xVelocity = 0;
        yVelocity = -cellSize;
        break;
      case (rightPressed || LJoystick_LR == 1 || RJoystick_LR == 1) &&
        !goingLeft:
        xVelocity = cellSize;
        yVelocity = 0;
        break;
      case (downPressed || LJoystick_UD == 1 || RJoystick_UD == 1) && !goingUp:
        xVelocity = 0;
        yVelocity = cellSize;
        break;
    }
    requestAnimationFrame(handleButtonsEntries);
    }, 50);
  };

  $(window).on("keydown", changeDirection);

  $(window).on("gamepadconnected", (event) => {
    handleConnectDisconnect(true);
    handleButtonsEntries();
    // startGame()
  });

  $(window).on("gamepaddisconnected", (event) => {
    handleConnectDisconnect(true);
  });

  restartButton.click(() => {
    if (!isGameRunning) {
        restartGame();
    }
  });
});
