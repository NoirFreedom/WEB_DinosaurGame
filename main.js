var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


var dinoImg = new Image();
dinoImg.src = './dinosaur/dinosaur.png'

var obstacleImg = new Image();
obstacleImg.src = './dinosaur/cactus.png'


var dino = {
    x : 10,
    y : 200,
    width : 10,
    height : 10,
    draw(){
        ctx.fillStyle = 'green';
        ctx.drawImage(dinoImg, this.x, this.y, 50, 50);
    }
}


class Obstacle {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'black';
        ctx.drawImage(obstacleImg, this.x, this.y);
    }
}

var obstacle = new Obstacle();
obstacle.draw();

var timer = 0;
var obstacles = [];
var jumpTimer = 0;
var animation;

function runByFrame(){
    animation = requestAnimationFrame(runByFrame);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (timer % 200 === 0){
        var obstacle = new Obstacle();
        obstacles.push(obstacle)
    }
    obstacles.forEach((a, i, o) => {
        if (a.x < 0){
            o.splice(i, 1)
        }
        a.x--;
        collision(dino, a);
        a.draw();
    });


    if (jumping == true){
        dino.y--;
        jumpTimer++;
    }
    if (jumping == false){
        if (dino.y < 200){
            dino.y++;
        }
    }
    if (jumpTimer > 100){
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}

runByFrame();


// to check collision
function collision(dino, obstacle){
    var xDifference = obstacle.x - (dino.x + dino.width)
    var yDifference = obstacle.y - (dino.y + dino.height)
    if (xDifference < 0 && yDifference < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}


var jumping = false;

document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})