const character = document.getElementById("character");
const net = document.getElementById("net");
const moveSpeed = 20;
let characterleftPosition = 60;
const screenWidth = (window.innerWidth) / 2.15;
const characterWidth = character.clientWidth;
let player1Score = 0;
let player2Score = 0;

const winningScore = 10; // Adjust as needed

let player1Name = prompt("Enter Player 1's Name:") || "Player 1"
let player2Name = prompt("Enter Player 2's Name:") || "Player 2";







const collisionsound = document.getElementById("collisionSound");
const jumpsound = document.getElementById("jump");
const pointersound = document.getElementById("point");
const headhitsound = document.getElementById("headsound");
const gameoverSound = document.getElementById("gameOver");
const gameSound = document.getElementById("fullgameSound");


function playjumpsound() {
    jumpsound.currentTime = 0;
    jumpsound.play();
}
function playcollisionsound() {
    collisionsound.currentTime = 0;
    collisionsound.play();
}
function playpointersound() {
    pointersound.currentTime = 0;
    pointersound.play();
}
function headsounds() {
    headhitsound.currentTime = 0;
    headhitsound.play();
}
function gameoversound() {
    gameoverSound.currentTime = 0;
    gameoverSound.play();
}


function moveCharacterForward() {
    if (characterleftPosition + characterWidth + moveSpeed <= screenWidth) {
        characterleftPosition += moveSpeed;
        character.style.left = characterleftPosition + "px";
    }
}

function moveCharacterBackward() {
    if (characterleftPosition - moveSpeed >= 0) {
        characterleftPosition -= moveSpeed;
        character.style.left = characterleftPosition + "px";
    }
}

let jumpHeight = 0;
let isJumping = false;

function movecharacterjump() {
    isJumping = true;

    const jumpInterval = setInterval(() => {
        character.style.bottom = jumpHeight + "px";
        jumpHeight += 5;

        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                character.style.bottom = jumpHeight + "px";
                jumpHeight -= 5;
                if (jumpHeight <= 0) {
                    character.style.bottom = "0px";
                    isJumping = false;
                    clearInterval(fallInterval);
                }
            }, 5);
        }
    }, 5);
}
document.addEventListener("keyup", function (event) {
    if (event.key === "w") {
        playjumpsound();
        movecharacterjump();

    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "d") {
        moveCharacterForward();
    } else if (event.key === "a") {
        moveCharacterBackward();
    }
});

const character1 = document.getElementById("character1");
let character1rightPosition = 60;
function moveCharacter1Forward() {
    if (character1rightPosition + characterWidth + moveSpeed <= screenWidth) {
        character1rightPosition += moveSpeed;
        character1.style.right = character1rightPosition + "px";
    }
}

function moveCharacter1Backward() {
    if (character1rightPosition - moveSpeed >= 0) {
        character1rightPosition -= moveSpeed;
        character1.style.right = character1rightPosition + "px";
    }
}
let jumpHeight1 = 0;
let isJumping1 = false;
function movecharacter1jump() {
    isJumping1 = true;

    const jumpInterval1 = setInterval(() => {
        character1.style.bottom = jumpHeight1 + "px";
        jumpHeight1 += 5;

        if (jumpHeight1 >= 100) {
            clearInterval(jumpInterval1);
            const fallInterval1 = setInterval(() => {
                character1.style.bottom = jumpHeight1 + "px";
                jumpHeight1 -= 5;
                if (jumpHeight1 <= 0) {
                    character1.style.bottom = "0px";
                    isJumping1 = false;
                    clearInterval(fallInterval1);
                }
            }, 5);
        }
    }, 5);
}



document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        moveCharacter1Forward();
    }
    else if (event.key === "ArrowRight") {
        moveCharacter1Backward();
    }

});
document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp") {
        playjumpsound();
        movecharacter1jump();
    }
});

const ball = document.getElementById("ball");
const initialBallSpeedX = 4;
const initialBallSpeedY = 4;
let ballSpeedX = 4; // Horizontal speed of the ball
let ballSpeedY = 4; // Vertical speed of the ball

// Define the screen width and height
const screenWidth1 = window.innerWidth-20;
const screenHeight = window.innerHeight;

// Define the initial ball speed
// const initialBallSpeedX = 3;
// const initialBallSpeedY = 3;
const minPositionX = 10;
const maxPositionX = screenWidth1;
let randomPositionX = Math.random() * (maxPositionX - minPositionX) + minPositionX;


// Define the initial ball position
let initialBallPositionX = randomPositionX;
const initialBallPositionY = 0;
let ballPositionX = initialBallPositionX; // Initial X position of the ball
let ballPositionY = initialBallPositionY;

//main game function
function updateBallPosition() {
    if (isGamePaused ) {
        return; // Don't update position if the game is paused
    }
    
    const maxBallSpeed = 12;
    if (Math.abs(ballSpeedX) > maxBallSpeed) {
        ballSpeedX = maxBallSpeed * Math.sign(ballSpeedX);
    }
    if (Math.abs(ballSpeedY) > maxBallSpeed) {
        ballSpeedY = maxBallSpeed * Math.sign(ballSpeedY);
    }
    // Update ball's position
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;

    if (ballPositionX + ball.offsetWidth >= screenWidth1) {
        // If the ball hits the right edge, reverse its horizontal speed
        ballSpeedX = -ballSpeedX;
        
        ballPositionX = ballPositionX-30;
    } else if (ballPositionX <= 0) {
        // If the ball hits the left edge, reverse its horizontal speed
        ballSpeedX = -ballSpeedX;
        ballPositionX = ballPositionX+30;
    }

    

    // Bounce the ball off the left and right edges of the screen
    if (ballPositionX + ball.clientWidth >= screenWidth1 || ballPositionX <= 0) {
        ballSpeedX = -ballSpeedX ;}
   
    
    if (ballPositionY + ball.offsetHeight >= screenHeight || ballPositionY <= 0) {
        ballSpeedY = -ballSpeedY ;
    }
    // Collision detection for character
    if (
        ballPositionY + ball.offsetHeight >= character.offsetTop &&
        ballPositionY <= character.offsetTop + character.clientHeight &&
        ballPositionX + ball.offsetWidth >= character.offsetLeft &&
        ballPositionX <= character.offsetLeft + character.clientWidth
    ) {

        const ballCenterX = ballPositionX + ball.offsetWidth / 2;
        const characterCenterX = character.offsetLeft + character.clientWidth / 2;
        const direction = ballCenterX > characterCenterX ? 1 : -1;

        const characterTopHalf = character.offsetTop + character.clientHeight / 3;

        // Check if the collision point is in the upper or lower half of the character
        if (ballPositionY + ball.offsetHeight <= characterTopHalf) {

            ballSpeedY = -Math.abs(ballSpeedY);
            ballPositionY = character.offsetTop - ball.offsetHeight;
            headsounds();

        } else {
            // Ball is in the lower half, so it should go down
            const collisionPoint = character.offsetTop + character.clientHeight - ballPositionY;
            // Move the ball just below the character
            ballSpeedY = Math.abs(ballSpeedY) * 2 // Make the ball go down
        }

        ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.3); // Increase ball speed
    }

    // Collision detection for character1
    else if (
        ballPositionY + ball.offsetHeight >= character1.offsetTop &&
        ballPositionY <= character1.offsetTop + character1.clientHeight &&
        ballPositionX + ball.offsetWidth >= character1.offsetLeft &&
        ballPositionX <= character1.offsetLeft + character1.clientWidth
    ) {
        // playcollisionsound();
        // Check if the ball's center is to the left or right of the character1's center
        const ballCenterX = ballPositionX + ball.offsetWidth / 2;
        const character1CenterX = character1.offsetLeft + character1.clientWidth / 2;
        const direction = ballCenterX > character1CenterX ? 1 : -1;

        const character1TopHalf = character1.offsetTop + character1.clientHeight / 3;

        // Check if the collision point is in the upper or lower half of the net
        if (ballPositionY + ball.offsetHeight <= character1TopHalf) {
            // Ball is in the upper half, so it should go up
            const collisionPoint = ballPositionY + ball.offsetHeight - character1.offsetTop;
            // Move the ball just above the character
            ballSpeedY = -Math.abs(ballSpeedY);
            ballPositionY = character1.offsetTop - ball.offsetHeight+1;
            headsounds();
            // Make the ball go up
        } else {
            // Ball is in the lower half, so it should go down
            const collisionPoint = character1.offsetTop + character1.clientHeight - ballPositionY;
            // Move the ball just below the character
            ballSpeedY = Math.abs(ballSpeedY) * 1.2; // Make the ball go down
        }

        ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.3); // Increase ball speed
    }
    // Collision detection for net
    else if (
        ballPositionY + ball.offsetHeight >= net.offsetTop &&
        ballPositionY <= net.offsetTop + net.clientHeight &&
        ballPositionX + ball.offsetWidth >= net.offsetLeft &&
        ballPositionX <= net.offsetLeft + net.clientWidth
    ) {
        //  playcollisionsound();
        // Check if the ball's center is to the left or right of the character1's center
        const ballCenterX = ballPositionX + ball.offsetWidth / 2;
        const netCenterX = net.offsetLeft + net.clientWidth / 2;
        const direction = ballCenterX > netCenterX ? 1 : -1;

        const netTopHalf = net.offsetTop + net.clientHeight / 4;

        // Check if the collision point is in the upper or lower half of the net
        if (ballPositionY + ball.offsetHeight <= netTopHalf) {
            // Ball is in the upper half, so it should go up
            //   const collisionPoint = ballPositionY + ball.offsetHeight - net.offsetTop;
            // Move the ball just above the character
            playcollisionsound();
            ballSpeedY = -Math.abs(ballSpeedY) * 1.5; // Make the ball go up


        } else {
            // Ball is in the lower half, so it should go down
            // Move the ball just below the character
            playcollisionsound();
            ballSpeedY = Math.abs(ballSpeedY) * 1.5; // Make the ball go down
            

        }
        //   playcollisionsound();


        ballSpeedX = direction * (Math.abs(ballSpeedX) + 0.2); // Increase ball speed
    }





    // Inside your collision detection code
    function resetballposition() {
        randomPositionX = Math.random() * (maxPositionX - minPositionX) + minPositionX;
        
        initialBallPositionX = randomPositionX;
        ballPositionX = initialBallPositionX;
        ballPositionY = initialBallPositionY;
        ballSpeedX = initialBallSpeedX;
        ballSpeedY = initialBallSpeedY;

    }
    function resetgame() {
        player1Score = 0;
        player2Score = 0;
        
        resetballposition();
    }


    if (ballPositionY + ball.offsetHeight >= screenHeight) {

        // Ball touches the ground, opponent gains one point
        if (ballPositionX < screenWidth1 / 2) {
            // Ball on player 1's side
            playpointersound();
            player2Score++;
            document.getElementById("player2Score").textContent = `${player2Name}: ${player2Score}`;
        } else {
            // Ball on player 2's side
            playpointersound();
            player1Score++;
            document.getElementById("player1Score").textContent = `${player1Name}: ${player1Score}`;
        }

        // Check if either player has reached the winning score
        
            // One of the players has won, reset the game
            if (player1Score >= winningScore || player2Score >= winningScore) {
                gameoversound();
                let winner = "";
                if (player1Score > player2Score) {
                    winner = $(player1Name);
                } else {
                    winner = $(player2Name);
                }
                const playAgain = confirm(`${winner} wins! Do you want to play again?`);
                if (playAgain) {
                    resetgame(); // Reset the game if the user wants to play again
                } else {
                    resetgame();
                    // You can perform any other action here or end the game
                }
            

        } else {
             // Set to true to pause the game
            // After 2 seconds, set to false to resume the game
                resetballposition(); // Reset the game if the user wants to play again
           
            
        }
    }
    ball.style.left = ballPositionX + "px";
    ball.style.top = ballPositionY + "px";
    requestAnimationFrame(updateBallPosition);
}
// updateBallPosition();

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
let isGamePaused = true;

function toggleGameState() {
    isGamePaused = !isGamePaused;
    if (isGamePaused) {
        pauseButton.textContent = "Resume";
        gameSound.pause();
        document.getElementById('character').hidden = true
        document.getElementById('character1').hidden = true
    } else {
        pauseButton.textContent = "Pause";
        updateBallPosition();
        gameSound.play();
        document.getElementById('character').hidden = false
        document.getElementById('character1').hidden = false
    }
}

startButton.addEventListener("click", () => {
    if (isGamePaused) {
        toggleGameState();
        gameoversound();
        gameSound.play();
        
        
    }
});


function resetgames() {
    player1Score = 0;
    player2Score = 0;
    randomPositionX = Math.random() * (maxPositionX - minPositionX) + minPositionX ;
    initialBallPositionX = randomPositionX;
    ballPositionX = initialBallPositionX;
    ballPositionY = initialBallPositionY;
    ballSpeedX = initialBallSpeedX;
    ballSpeedY = initialBallSpeedY;
    gameoversound();
    updatePlayerNames();
  

    
}
resetButton.addEventListener("click", resetgames);

pauseButton.addEventListener("click", toggleGameState);

//  Initialize the game in a paused state

resetgames();