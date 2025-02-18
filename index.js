// Game constants and variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('eating sound effect.mp3');
const gameOverSound = new Audio('gameover sound.mp3');
const moveSound = new Audio('movesound.mp3');
const musicSound = new Audio('bg_music snake game.mp3');
let speed = 5;
let score=0;
let lastPaintTime = 0;
let SnakeArr = [{x: 13, y: 15}];
let food = {x: 10, y: 15};
const board = document.getElementById('board');

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //bump into yourself
    for(let i=1; i<SnakeArr.length;i++){
        if(snake[i].x=== snake[0].x && snake[i].y=== snake[0].y){
            return true;
        }}

    //if you bump into wall
        if(snake[0].x>=18|| snake[0].x<=0 || snake[0].y>=18|| snake[0].y<=0){
            return true;
        }

        return false;
    }


function gameEngine() {
    // Part 1: Updating the snake array (logic to be added later)

    if(isCollide(SnakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game over, press any key to play again")
        SnakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score=0;
    }
    // if food is eaten then increment the food and regenerate the food
    if(SnakeArr[0].y=== food.y && SnakeArr[0].x=== food.x ){
        foodSound.play();
        score+=1
        // if (score>hiscoreval){
        //     hiscoreval= score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     hisoreBox.innerHTML="Hi score"+ hiscoreval;
        // }
        scoreBox.innerHTML= "Score:"+score;
        SnakeArr.unshift({x:SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y});
        let a=2; 
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }
    // moving the snake
    for(let i=SnakeArr.length-2; i>=0 ;i--){
        SnakeArr[i+1]= {...SnakeArr[i]};
    }

    SnakeArr[0].x+= inputDir.x;
    SnakeArr[0].y+= inputDir.y;


    // Part 2: Display the snake and food
    board.innerHTML = ""; // Clear the board

    // Display the snake
    SnakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add('head'); // Add head class for the first segment
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here

let hiscore= localStorage.getItem("hiscore");
// if(hiscore=== null){
//     hiscoreval=0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))

// }
// else{

//     hiscoreval= JSON.parse(hiscore);
//     hisoreBox.innerHTML="Hi score"+ hiscore;
// }
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir ={x:0,y:1}// start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0 ;
            inputDir.y=1 ;
            break;

        case "ArrowLeft":
                console.log("ArrowLeft")
                inputDir.x=-1 ;
                inputDir.y= 0;
                break;

        case "ArrowRight":
                    console.log("ArrowRight")
                    inputDir.x= 1;
                    inputDir.y= 0;
                    break;
        default: 
            break;
    }
})
