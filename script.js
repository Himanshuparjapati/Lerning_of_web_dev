document.addEventListener("DOMContentLoaded",()=>{
const gameArena=document.querySelector(".game-arena");
// console.log(gamearena);
const arenaSize=600;
const cellSize=20;
let score = 0;
let gamestart = false ;
let food = {x:300,y:200}
let snake = [{x:160, y:200},{x:140 , y:200},{x:120,y:200}]
let dx=cellSize; // Displacement in x-axis 
let dy=0; // Displacement in y-axis 
let gameSpeed = 200;

function drawScoreBoard() {
    const scoreBoard= document.getElementById("score-board");
  scoreBoard.textContent=` Score: ${score}`;
}

function drawDiv(x,y,className){
const div = document.createElement("div");
div.classList.add(className);
div.style.top = `${y}px`;
div.style.left = `${x}px`;
return div;

}

function drawFoodSnake() {
    gameArena.innerHTML = "";// if previously something drawn remove it 
    // wipe out everything and redraw with new co-odinate  when snake move 
   
    snake.forEach((snakeCell)=>{
        const element = drawDiv(snakeCell.x,snakeCell.y,"snake");
        gameArena.appendChild(element);
    })

    const foodElement = drawDiv(food.x,food.y,"food");
    gameArena.appendChild(foodElement);

}

function moveFood() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
        newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
    } while (snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

    food = { x: newX, y: newY };
}

function upDateSnake() {
    // 1 calculate new co-odinate the snake head will go to 
    const newHead = {x:snake[0].x + dx, y:snake[0].y + dy};
    snake.unshift(newHead);// add the new head to the snake array
    if (newHead.x===food.x && newHead.y===food.y){
        // collision with food
        score+=1;
        if(gameSpeed > 30){
        gameSpeed -= 10;
        }

        // don't remove the last element of the snake array
        moveFood();
        // move the food

    }else{
        snake.pop();// remove the last element of the snake array

    }
}

function isGameOver() {
    // check snakebody 
    for(let i =1;i<snake.length;i++){
       if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
           return true;  // Game Over
       }
    }

    // check wall collision 
    let isHittingLeftWall = snake[0].x<0;
    let isHittingTopWall = snake[0].y<0;
    let isHittingRightWall = snake[0].x>=arenaSize;
    let isHittingBottomWall = snake[0].y>=arenaSize;

    return isHittingLeftWall || isHittingTopWall || isHittingRightWall || isHittingBottomWall; // game over 
}

function gameLoop() {
    setInterval(()=>{
        if(!gamestart){
            return;
        }
        // check if the snake has collided with the wall
         if(isGameOver()){
            gamestart=false;
            alert(`Game Over! Your Score is ${score}`);
            window.location.reload();
            return;
         }
        upDateSnake();
       drawScoreBoard();
       drawFoodSnake();
    },gameSpeed);
}

function changeDirection(event) {
    console.log(event.keyCode);
    
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40; 

    const keyPressed = event.keyCode;
    const goingUp = dy===-cellSize;
    const goingDown = dy===cellSize;
    const goingRight = dx===cellSize;
    const goingLeft = dx===-cellSize;

    if(keyPressed==LEFT_KEY && !goingRight){
        dx=-cellSize;
        dy=0;
    }
    
    if(keyPressed==RIGHT_KEY && !goingLeft){
        dx=cellSize;
        dy=0;
    }
        
    if(keyPressed==UP_KEY && !goingDown){
        dx=0;
        dy=-cellSize
    }
        
    if(keyPressed==DOWN_KEY && !goingUp){
        dx=0;
        dy=cellSize;
    }
}

function runGame(){
    if(!gamestart){
        gamestart=true;
        gameLoop();
        document.addEventListener("keydown",changeDirection)
    }
   

}


function initiateGame(){
 const scoreBoard = document.createElement("div");
 scoreBoard.id = "score-board";
//  scoreBoard.textContent = 10;
 document.body.insertBefore(scoreBoard,gameArena);

 const startButton = document.createElement("button");
 startButton.textContent = "startGame";
 startButton.classList.add("start-button");
 document.body.appendChild(startButton);




startButton.addEventListener("click",()=>{
    startButton.style.display="none";
    runGame()
});

}

initiateGame()  // This is the first function to be excuted first so that we prepare thee ui 


});
