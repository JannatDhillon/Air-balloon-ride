var ball;
var database
var pos
var ballImage,bg
function preload(){
    ballImage=loadImage("Hot Air Ballon-02.png")
    bg=loadImage("Hot Air Ballon-01.png")
}

function setup(){
    database=firebase.database();
    createCanvas(1200,800);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(ballImage)
    var ballref=database.ref("ball/position")
    ballref.on("value",readPosition,showError)
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
function readPosition(data){
    pos=data.val();
    ball.x=pos.x
    ball.y=pos.y
}

function showError(){
    console.log("unable to read the values from the database")
}

function changePosition(a,b){
   database.ref("ball/position").update({
       x:pos.x+a ,
       y:pos.y+b
   })
}
