document.addEventListener("DOMContentLoaded", function() {
    // Get canvas element
    const canvas = document.getElementById("pongCanvas");
    const ctx = canvas.getContext("2d");

    // Paddle properties
    const paddleWidth = 10;
    const paddleHeight = 100;
    const paddleSpeed = 10;
    let paddle1Y = (canvas.height - paddleHeight) / 2; // Initial position of paddle 1
    let paddle2Y = (canvas.height - paddleHeight) / 2; // Initial position of paddle 2

    // Ball properties
    const ballSize = 10;
    let ballX = canvas.width / 2; // Initial x-coordinate of the ball
    let ballY = canvas.height / 2; // Initial y-coordinate of the ball
    let ballSpeedX = 5; // Horizontal speed of the ball
    let ballSpeedY = 5; // Vertical speed of the ball

    // Key states for paddle 1
    let upPressed1 = false;
    let downPressed1 = false;

    // Key states for paddle 2
    let upPressed2 = false;
    let downPressed2 = false;

    // Scores
    let score1 = 0;
    let score2 = 0;

    // Event listeners for paddle 1 movement
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp") {
            upPressed1 = true;
        } else if (event.key === "ArrowDown") {
            downPressed1 = true;
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowUp") {
            upPressed1 = false;
        } else if (event.key === "ArrowDown") {
            downPressed1 = false;
        }
    });

    // Event listeners for paddle 2 movement
    document.addEventListener("keydown", function(event) {
        if (event.key === "w") {
            upPressed2 = true;
        } else if (event.key === "s") {
            downPressed2 = true;
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "w") {
            upPressed2 = false;
        } else if (event.key === "s") {
            downPressed2 = false;
        }
    });

    // Game loop
    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw game elements
        drawPaddle(0, paddle1Y); // Draw paddle 1
        drawPaddle(canvas.width - paddleWidth, paddle2Y); // Draw paddle 2
        drawBall(ballX, ballY); // Draw ball

        // Draw scores
        drawScores();

        // Update game logic
        movePaddle(); // Move paddles
        moveBall(); // Move ball
        checkCollision(); // Check for collisions

        // Request next frame
        requestAnimationFrame(gameLoop);
    }

    // Function to draw a paddle
    function drawPaddle(x, y) {
        ctx.fillStyle = "#000"; // Paddle color
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }

    // Function to draw the ball
    function drawBall(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, ballSize, 0, Math.PI * 2);
        ctx.fillStyle = "#000"; // Ball color
        ctx.fill();
        ctx.closePath();
    }

    // Function to draw the scores
    function drawScores() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(score1, canvas.width / 4, 50);
        ctx.fillText(score2, (3 * canvas.width) / 4, 50);
    }

    // Function to move the paddles
    function movePaddle() {
        // Move paddle 1
        if (upPressed1 && paddle1Y > 0) {
            paddle1Y -= paddleSpeed;
        } else if (downPressed1 && paddle1Y < canvas.height - paddleHeight) {
            paddle1Y += paddleSpeed;
        }

        // Move paddle 2
        if (upPressed2 && paddle2Y > 0) {
            paddle2Y -= paddleSpeed;
        } else if (downPressed2 && paddle2Y < canvas.height - paddleHeight) {
            paddle2Y += paddleSpeed;
        }
    }

    // Function to move the ball
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }

    // Function to check for collisions
    function checkCollision() {
        // Collision with top and bottom walls
        if (ballY - ballSize <= 0 || ballY + ballSize >= canvas.height) {
            ballSpeedY = -ballSpeedY; // Reverse vertical direction
        }

        // Collision with paddles
        if (ballX - ballSize <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Reverse horizontal direction
        } else if (ballX + ballSize >= canvas.width - paddleWidth && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Reverse horizontal direction
        }

        // Ball goes out of bounds (score)
        if (ballX - ballSize <= 0) {
            // Player 2 scores
            score2++;
            resetBall();
        } else if (ballX + ballSize >= canvas.width) {
            // Player 1 scores
            score1++;
            resetBall();
        }
    }

    // Function to reset the ball position
    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX; // Reverse horizontal direction
        ballSpeedY = -ballSpeedY; // Reverse vertical direction
    }

    // Start game loop
    gameLoop();
});
