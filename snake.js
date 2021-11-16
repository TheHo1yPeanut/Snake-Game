const board = document.getElementById("snakeCanvas");
const board_ctx = board.getContext("2d");

var dx = 10;
var dy = 0;

var previousCordsX = 200;
var previousCordsY = 200;

let start = document.getElementById("startBtn");

let defaultDifficulty = 300;
let difficulty = defaultDifficulty;

let easyBtn = document.getElementById("easy");
let mediumBtn = document.getElementById("medium");
let hardBtn = document.getElementById("hard");
let insaneBtn = document.getElementById("insane");

easyBtn.disabled = true;

let score = 0;
let scoreP = document.getElementById("score");
let highScore = document.getElementById("highScore");
let highScoreVal = 0;

var appleCordsX;
var appleCordsY;

let snake = [
    {x: 200, y: 200}, {x: 190, y:200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}
]

function drawSnake(){
    snake.forEach((part) => {
        board_ctx.fillStyle = "green";
        board_ctx.fillStroke = "lightgrey";
        board_ctx.fillRect(part.x, part.y, 10, 10);
        board_ctx.strokeRect(part.x, part.y, 10, 10);
    });
}

function moveSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy}
    snake.unshift(head);

    if(snake[0].x == appleCordsX && snake[0].y == appleCordsY){
        applePlacement();
        score += 1;
        scoreP.innerHTML = `Score: ${score}`;
    } else {
        snake.pop();
    }
}

function clearCanvas(){
    board_ctx.fillStyle = "white";
    board_ctx.strokeStyle = "black";
    board_ctx.fillRect(0, 0, 400, 400);
}

function drawGrid(){
    board_ctx.fillStyle = "white";
    board_ctx.fillStroke = "black";

    for(let x = 0; x < 400; x += 10){
        for(let y = 0; y < 400; y += 10){
            board_ctx.strokeRect(x, y, 10, 10);  
            board_ctx.fillRect(x, y, 10, 10); 
        }
    }
}

function appleSpawn(x, y){
    appleCordsX = x;
    appleCordsY = y;

    board_ctx.fillStyle = "red";
    board_ctx.fillStroke = "lightgrey";
    board_ctx.fillRect(x, y, 10, 10);
    board_ctx.strokeRect(x, y, 10, 10);
}

function applePlacement(){
    var cordsx = Math.round(Math.random() * 39) * 10;
    var cordsy = Math.round(Math.random() * 39) * 10;

    for(let i = 0; i < snake.length; i++){
        if(cordsx == snake[i].x && cordsy == snake[i].y){
            applePlacement();
        } else {
            appleSpawn(cordsx, cordsy);
            return
        }
    }

}

function checkForWin(){

    let num;

    if(difficulty == 300){
        num = 20;
    } else if(difficulty == 100){
        num = 35;
    } else if(difficulty == 40){
        num = 30;
    } else if(difficulty == 25){
        num = 95;
    }

    return snake.length == num; 
}

function gameHasEnded(){
    
    for(let i = 4; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true
        }
    }

    return snake[0].x < 0 || snake[0].x > board.width - 10|| snake[0].y < 0 || snake[0].y > board.height - 10;

    
}

function changeDifficulty(event){
    
    if(event.key == "1"){

        difficulty = 300;
        easyBtn.disabled = true;
        mediumBtn.disabled = false;
        hardBtn.disabled = false;
        insaneBtn.disabled = false;

    } else if(event.key == "2"){

        difficulty = 100;
        easyBtn.disabled = false;
        mediumBtn.disabled = true;
        hardBtn.disabled = false;
        insaneBtn.disabled = false;

    } else if(event.key == "3"){

        difficulty = 40;
        easyBtn.disabled = false;
        mediumBtn.disabled = false;
        hardBtn.disabled = true;
        insaneBtn.disabled = false;

    } else if(event.key == "4"){

        difficulty = 25;
        easyBtn.disabled = false;
        mediumBtn.disabled = false;
        hardBtn.disabled = false;
        insaneBtn.disabled = true;

    } else if(event.key == "Enter"){
        start.disabled = true;
        main();
        document.removeEventListener("keydown", changeDifficulty);
    }
}

function directionChange(event){

    var keyName;

    switch(keyName = event.key){
        case "ArrowLeft":
            if(dx == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = -10;
                dy = 0;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;

        case "ArrowUp":
            if(dy == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = 0;
                dy = -10;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;

        case "ArrowRight":
            if(dx == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = 10;
                dy = 0;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;

        case "ArrowDown":
            if(dy == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = 0;
                dy = 10;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;







        case "a":
            if(dx == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = -10;
                dy = 0;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;

        case "w":
            if(dy == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = 0;
                dy = -10;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;

        case "d":
            if(dx == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = 10;
                dy = 0;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;

        case "s":
            if(dy == 0 && (previousCordsY != snake[0].y || previousCordsX != snake[0].x)){
                dx = 0;
                dy = 10;

                previousCordsX = snake[0].x;
                previousCordsY = snake[0].y;

                document.removeEventListener("keydown", directionChange);
            }
        break;
    }
}


function main(){

    this.disabled = true;

    setTimeout(function onTick(){
        easyBtn.disabled = true;
        mediumBtn.disabled = true;
        hardBtn.disabled = true;

        clearCanvas();
        drawGrid();
        moveSnake();
        drawSnake();

        appleSpawn(appleCordsX, appleCordsY);
    

        if(gameHasEnded()){
            alert("GAME OVER");
            document.addEventListener("keydown", changeDifficulty);

            start.disabled = false

            dx = 10;
            dy = 0;

            snake = [
                {x: 200, y: 200}, {x: 190, y:200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}
            ]

            clearCanvas();
            drawGrid();
            moveSnake();
            drawSnake();    

            if(score > highScoreVal){
                highScoreVal = score;
            }
        
            highScore.innerHTML = `High Score: ${highScoreVal}`;

            score = 0;
            scoreP.innerHTML = `Score: ${score}`;

            switch(difficulty){
                case 300:
                    mediumBtn.disabled = false;
                    hardBtn.disabled = false;
                break;

                case 100:
                    easyBtn.disabled = false;
                    hardBtn.disabled = false;
                break;

                case 40: 
                    easyBtn.disabled = false;
                    mediumBtn.disabled = false;
                break;
            }
            return
        }

        if(checkForWin()){
            alert("YOU'VE WON");
            document.addEventListener("keydown", changeDifficulty);

            start.disabled = false

            dx = 10;
            dy = 0;

            snake = [
                {x: 200, y: 200}, {x: 190, y:200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}
            ]

            clearCanvas();
            drawGrid();
            moveSnake();
            drawSnake();    

            if(score > highScoreVal){
                highScoreVal = score;
            }
        
            highScore.innerHTML = `High Score: ${highScoreVal}`;

            score = 0;
            scoreP.innerHTML = `Score: ${score}`;

            switch(difficulty){
                case 300:
                    mediumBtn.disabled = false;
                    hardBtn.disabled = false;
                break;

                case 100:
                    easyBtn.disabled = false;
                    hardBtn.disabled = false;
                break;

                case 40: 
                    easyBtn.disabled = false;
                    mediumBtn.disabled = false;
                break;
            }
            return
        }

        document.addEventListener("keydown", directionChange);

    main();
    }, difficulty);
}



drawGrid();
drawSnake();
applePlacement();

easyBtn.addEventListener("click", () => {
    difficulty = 300;
    easyBtn.disabled = true;
    mediumBtn.disabled = false;
    hardBtn.disabled = false;
    insaneBtn.disabled = false;
});
mediumBtn.addEventListener("click", () => {
    difficulty = 100;
    easyBtn.disabled = false;
    mediumBtn.disabled = true;
    hardBtn.disabled = false;
    insaneBtn.disabled = false;
});
hardBtn.addEventListener("click", () => {
    difficulty = 40;
    easyBtn.disabled = false;
    mediumBtn.disabled = false;
    hardBtn.disabled = true;
    insaneBtn.disabled = false;
});
insaneBtn.addEventListener("click", () => {
    difficulty = 25;
    easyBtn.disabled = false;
    mediumBtn.disabled = false;
    hardBtn.disabled = false;
    insaneBtn.disabled = true;
});

start.addEventListener("click", main);
document.addEventListener("keydown", directionChange);
document.addEventListener("keydown", changeDifficulty);