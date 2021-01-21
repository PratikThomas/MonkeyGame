var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score;
var Ground;
var obstacle, obstacleImage;
var survivalTime = 0;

function preload(){
 monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png"); 
}

function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  Ground = createSprite(400,350,900,10);
  Ground.velocityX = -4;
  Ground.x = Ground.width/2;
  console.log(Ground.x);
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = true;
}

function draw() {
  background(180);
  
  if (keyDown("space") && monkey.y >= 300) {
     monkey.velocityY = -15;
  }
  
  if (Ground.x < 0) {
     Ground.x = Ground.width / 2;
  }
  
  if (obstaclesGroup.isTouching(monkey)) {
    Ground.velocityX = 0;
    monkey.velocityY = 0
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(Ground);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("score : "+survivalTime, 150, 20);
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
}

function spawnBananas() {
   if (frameCount % 80 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 260));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -(6 + survivalTime / 100);

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,320, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + survivalTime / 100);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}