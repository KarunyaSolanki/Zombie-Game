var bg, bgImg;
var hunterShooting, hunterShootingImg;
var hunterStanding, hunterStandingImg;
var zombie, zombieImg;
var bullet, bulletImg;
var bulletGroup, zombieGroup;
var gameState;
var score = 0;

function preload() {

bgImg = loadImage("images/bg.jpeg");
hunterShootingImg = loadImage("images/hunter_shooting.png");
hunterStandingImg = loadImage("images/hunter_standing.png");
zombieImg = loadImage("images/zombie.png");
bulletImg = loadImage("images/bullet.png");

}

function setup() {
  createCanvas(1200,600);
  bg=createSprite(600,340);
  bg.addImage(bgImg);
  bg.scale=1;
  
  hunterStanding=createSprite(200,400);
  hunterStanding.addImage(hunterStandingImg);
  hunterStanding.scale=0.4;

  bulletGroup = new Group()
  zombieGroup = new Group()

}

function draw() {
  background(0);  

  

  if(keyDown("UP_ARROW")){

  hunterStanding.y=hunterStanding.y-10;   

  }

  if(keyDown("DOWN_ARROW")){

    hunterStanding.y=hunterStanding.y+10;

  }

  if(keyDown("LEFT_ARROW")){

    hunterStanding.x=hunterStanding.x-10;

  }

  if(keyDown("RIGHT_ARROW")){

    hunterStanding.x=hunterStanding.x+10;

  }

  if(keyWentDown("SPACE")){

    hunterStanding.addImage(hunterShootingImg)
    bullet=createSprite(hunterStanding.x+90,hunterStanding.y-30);
    bullet.addImage(bulletImg)
    bullet.scale=0.15;
    bullet.velocityX=2;
    bulletGroup.add(bullet)

  }
  if(keyWentUp("SPACE")){

    hunterStanding.addImage(hunterStandingImg)
   
  }
  Zombie()

  if(zombieGroup.isTouching(bulletGroup)){

    for(var i = 0;i<zombieGroup.length;i++){

      if(zombieGroup[i].isTouching(bulletGroup)){

        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score=score+5

      }

    }

  }

  if(zombieGroup.isTouching(hunterStanding)){

    gameState="End"

  }

  if(gameState==="End"){

    textSize(100)
    fill("Yellow")
    text("Game Over",400,300)
    zombieGroup.destroyEach()
    hunterStanding.destroy()
    bulletGroup.destroyEach()
    bg.destroy()

  }

  drawSprites();
  textSize(30)
  fill("orange")
  text("Score = " + score, 1000,50)
}

function Zombie(){

  if(frameCount%100===0){


    zombie=createSprite(random(500,1100),random(100,500));
    zombie.addImage(zombieImg);
    zombie.scale=0.3;
    zombie.velocityX=-2;
    zombieGroup.add(zombie)

  }
  
}