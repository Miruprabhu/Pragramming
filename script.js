let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 7;
let dy = 7;

let paddleHeight = 15;
let paddleWidth = 230;

let paddleX = (canvas.width-paddleWidth)/2;

let rightPressed=false;
let leftPressed=false;

let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;

let score = 0;


let bricks = [];
let count = [];
for (c =0; c<brickColumnCount; c++){
    bricks[c] = [];
    count[c] = [];
    for(r=0; r<brickRowCount; r++){

        bricks[c][r] = { x: 0, y: 0, status: 1};
        count[c][r] = 4-r;
    }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if (e.keyCode === 37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if (e.keyCode === 37){
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2); 
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight); 
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}
//Create a function to draw the bricks
function drawBricks(){
    for(c=0; c < brickColumnCount; c++){
        for(r=0; r < brickRowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = (c* (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r* (brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                brickcolor(r);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function brickcolor(x){
    if(x===0){
        ctx.fillStyle = 'purple';
    }
    if(x===1){
        ctx.fillStyle = 'lightgreen';
    }
    if(x===2){
        ctx.fillStyle = 'skyblue';
    }
    if(x===3){
        ctx.fillStyle = 'white';
    }
}

function drawScore(){
    ctx.font = '18px Arial';
    ctx.fillStyle = 'brown';
    ctx.fillText('score: '+ score, 8, 20); 
}

function collisionDetection(){
    for(c=0; c<brickColumnCount;c++){
        for(r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    count[c][r] = count[c][r]-1
                    // brickcolor(count[c][r]);
                    b.fillStyle='red';
                   
                    console.log("c and r",c," ",r);
                    if(count[c][r]===0){
                        b.status = 0;
                        score++;
                    }

                    if(score >= 14){
                        //setInterval(draw, 9)
                        dy = -4
                    }
                       
                    if (score >= 10){
                        dx = 3
                        paddleWidth = 72;
                        drawPaddle()
                    }
                    if (score === brickRowCount*brickColumnCount){
                        alert('Congratulations!! You\'ve won!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function draw(){

    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        console.log("Side wall")
    }
    //top walls
    if(y + dy < ballRadius){
        dy = -dy;
        console.log("Top wall")
    }
    else if (y + dy > canvas.height-ballRadius){

        if(x > paddleX && x < paddleX + paddleWidth){
            dy=-dy;
            console.log("Paddle hit")
        }
        
        else {
            alert('GAME OVER!!');
            document.location.reload();
        }
    }
    //bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    //Make paddle move
    if(rightPressed && paddleX <canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    //Making the ball move
    x +=dx; //update x movement every frame
    y +=dy; //update y movement every frame
}

//Create an infinite loop that creates the ball
//paints the ball on the canvas every 10 milliseconds.
setInterval(draw, 10)
