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

easyBtn.disabled = true;

let score = 0;
let scoreP = document.getElementById("score");

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
    for(let i = 0; i < board.width; i += 10){
        for(let y = 0; y < board.length; y += 10){
            for(let snk = 0; snk < snake.length; snk++){
                if(i == snake[snk].y && y == snake[snk].x){
                    return;
                }
            }
        }
    }

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

    score = 0;
    scoreP = `scoreP ${score}`;

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

    } else if(event.key == "2"){

        difficulty = 100;
        easyBtn.disabled = false;
        mediumBtn.disabled = true;
        hardBtn.disabled = false;

    } else if(event.key == "3"){

        difficulty = 40;
        easyBtn.disabled = false;
        mediumBtn.disabled = false;
        hardBtn.disabled = true;

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

        //checkForWin();
        
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
});
mediumBtn.addEventListener("click", () => {
    difficulty = 100;
    easyBtn.disabled = false;
    mediumBtn.disabled = true;
    hardBtn.disabled = false;
});
hardBtn.addEventListener("click", () => {
    difficulty = 40;
    easyBtn.disabled = false;
    mediumBtn.disabled = false;
    hardBtn.disabled = true;
});
start.addEventListener("click", main);
document.addEventListener("keydown", directionChange);
document.addEventListener("keydown", changeDifficulty);