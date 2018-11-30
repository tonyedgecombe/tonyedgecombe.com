(function() {
    const radius = 10;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const brickWidth = 100;
    const brickMargin = 22;
    const brickHeight = 25;

    const paddleWidth = 80;
    const paddleHeight = 10;

    const rowCount = 3;
    const columnCount = 5;

    const topMargin = 100;

    const brickCount = rowCount * columnCount;

    let x, y;

    let dX, dY;

    let paddlePosition;
    let paddleDirection;

    let bricks;

    let score;

    let lives;

    window.onkeydown = function (event) {
        if (event.keyCode === 39) {
            paddleDirection = 2;
        } else if (event.keyCode === 37) {
            paddleDirection = -2;
        }
    };

    window.onkeyup = function () {
        paddleDirection = 0;
    };

    initialiseGame();

    function initialiseGame() {
        bricks = createBricks();

        initialiseBall();

        paddlePosition = 100;
        paddleDirection = 0;

        score = 0;
        lives = 3;

        move();
        draw();
    }

    function createBricks() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 5; j++) {
                row.push({
                    x: j * (brickWidth + brickMargin) + brickMargin,
                    y: i * (brickHeight + brickMargin) + topMargin,
                    visible: true
                });
            }
            rows.push(row);
        }

        return rows;
    }

    function initialiseBall() {
        x = Math.floor(Math.random() * (canvas.width - brickWidth) + brickWidth / 2);
        y = canvas.height - radius - brickHeight;

        dX = Math.random() > 0.5 ? -1 : 1;
        dY = -1;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'grey';

        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();

        if (lives <= 0) {
            drawEndOfGameMessage();
            return;
        }

        if (score === brickCount) {
            drawYouHaveWonMessage();
            return;
        }

        if (y >= canvas.height - radius) {
            drawEndOfLifeMessage();
            return;
        }

        window.requestAnimationFrame(draw);
    }

    function drawYouHaveWonMessage() {
        ctx.font = '36px Helvetica Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('You have won!', canvas.width / 2, 300);
        ctx.fillText('Press the space key to start again', canvas.width / 2, 360)
    }

    function drawEndOfLifeMessage() {
        ctx.font = '36px Helvetica Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Press the space key to continue', canvas.width / 2, 300)
    }

    function drawEndOfGameMessage() {
        ctx.font = '36px Helvetica Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Game over', canvas.width / 2, 300);
        ctx.fillText('Press the space key to start again', canvas.width / 2, 360)
    }

    function drawBall() {
        if (lives !== 0) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddlePosition, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fill();
    }

    function drawBricks() {
        for (let row of bricks) {
            for (let brick of row) {
                if (brick.visible) {
                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
                    ctx.fill();
                }
            }
        }
    }

    function drawScore() {
        ctx.font = '36px Helvetica Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${score}`, 10, 40);

        ctx.textAlign = 'right';
        ctx.fillText(`Lives: ${lives}`, canvas.width - 10, 40);
    }

    function move() {
        if (score === brickCount) {
            window.onkeypress = newGameOnSpaceKey;
            return;
        }

        if (y >= canvas.height - radius) {
            lives--;

            if (lives === 0) {
                window.onkeypress = newGameOnSpaceKey;
            } else {
                window.onkeypress = restartOnSpaceKey;
            }

            return;
        }


        moveBall();
        movePaddle();
        checkForBrickHit();

        if (lives !== 0) {
            window.setTimeout(move, 5);
        }
    }

    function newGameOnSpaceKey(event) {
        if (event.keyCode === 32) {
            initialiseGame();
        }
    }

    function restartOnSpaceKey(event) {
        if (event.keyCode === 32) {
            initialiseBall();
            move();
            draw();
        }

        window.onkeypress = null;
    }

    function moveBall() {
        x += dX;
        y += dY;

        if (paddleHit()) {
            dY = -dY;
        }
        else if (y <= topMargin - radius) {
            dY = -dY;
        }

        if (x <= radius || x >= canvas.width - radius) {
            dX = -dX;
        }
    }

    function movePaddle() {
        paddlePosition += paddleDirection;

        if (paddlePosition < 0) {
            paddlePosition = 0;
        }

        if (paddlePosition + paddleWidth > canvas.width) {
            paddlePosition = canvas.width - paddleWidth;
        }
    }

    function checkForBrickHit() {
        for (let row of bricks) {
            for (let brick of row) {
                if (brick.visible && x >= brick.x && x <= brick.x + brickWidth && y >= brick.y && y <= brick.y + brickHeight) {
                    brick.visible = false;
                    dY = -dY;
                    score++;
                }
            }
        }
    }

    function paddleHit() {
        let paddleTop = canvas.height - paddleHeight;
        let ballBottom = y + radius;

        return x + radius >= paddlePosition && x - radius <= paddlePosition + paddleWidth && ballBottom === paddleTop;
    }
})();