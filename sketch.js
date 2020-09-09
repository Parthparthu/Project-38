//Global Variables
var bananaImage, obstacleImage;
var obstacleGroup, bananaGroup;
var backImage, backgroundi;
var count;
var playerRuning, player, playerWon, playerLo;
var ground;

var life = 3;

var gameState = "play";

function preload() {

  backImage = loadImage("jungle.jpg");

  playerRuning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");

  playerWon = loadImage("monkeW.png");
  playerLo = loadImage("monkeL.png");

}


function setup() {

  createCanvas(displayWidth-120, displayHeight-200);
  
  backgroundi = createSprite(200, 1, 1, 1);
  backgroundi.addImage("backgroud", backImage);
  backgroundi.x = backgroundi.width / 2;
  backgroundi.velocityX = -4;
  backgroundi.scale = 2;
  
  ground = createSprite(width/2, height/2+300, displayWidth-120, 10);
  //ground.visible = false;
  
  player = createSprite(width/2-600, height/2+200, 1, 1);
  player.addAnimation("monkey", playerRuning);
  player.addAnimation("playerLOnf", playerLo);
  player.addAnimation("playerWOnf", playerWon);
  player.scale = 0.20;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  count = 0;

}


function draw() {
  
  edges = createEdgeSprites();

  background(225);

  //camera.position.x = player.x;
  //camera.position.y = player.y;
  
  player.bounceOff(edges[2]);
  
  player.collide(ground);
  
  food();
  
  obstacles();
  
  if(gameState === "play")
  {

    if (backgroundi.x < 320){
      backgroundi.x = backgroundi.width / 2;
    }
    
    if (keyDown("space")) {
              
        player.velocityY = -10;
              
    }
    
    player.velocityY = player.velocityY + 2;
    
    if (player.isTouching(bananaGroup)) {
      
     count = count + 2;
     bananaGroup.destroyEach();
      
    }

    switch(count){
      
      case 10 : player.scale = 0.22;
        break;
        case 20 : player.scale = 0.24;
        break;
        case 30 : player.scale = 0.26;
        break;
        case 40 : player.scale = 0.28;
        break;
        case 50 : player.scale = 0.30;
        break;
        default : break;
        
    }
    
    if (obstacleGroup.isTouching(player)) {
   
      player.scale = 0.20;
      life = life - 1;
      obstacleGroup.destroyEach();
      
    }

    if(life === 0)
    {

      gameState = "end";

    }

    if(count === 60)
    {

      gameState = "won";

    }
  } else if(gameState === "won")
  {

    backgroundi.velocityX = 0;
    player.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    player.x = width/2;
    player.y = height/2;
    player.scale = 0.34;
    player.changeAnimation("playerWOnf", playerWon);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

  } else if(gameState === "end")
  {

    backgroundi.velocityX = 0;
    player.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    player.x = width/2;
    player.y = height/2;
    player.scale = 0.40;
    player.changeAnimation("playerLOnf", playerLo);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

  }
  
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: " + count, 500, 50);

}

function food() {
      
      //printing banana after 80 frame count
      if (frameCount % 80 === 0) {
            
            //creating banana and printing at random position
            var banana = createSprite(650, 190, 1, 1);
            banana.y = random(90, 190);
             
            
            //add image of banana
            banana.addImage("banana", bananaImage);
            banana.scale = 0.05;
            
            //seting velocity and lifetime
            banana.velocityX = -5;
            banana.lifetime = 120;
            
            //adding to banana group
            bananaGroup.add(banana);
            
      }
  
}

function obstacles() {
      
      //printing obstacles after 300 frame count
      if (frameCount % 300 === 0) {
            
            //creating obstacle 
            var obstacle = createSprite(width+50, height/2+250, 1, 1);
            
            //colliding with ground
            obstacle.collide(ground);
            
            //add image of obstacle
            obstacle.addImage("stone", obstacleImage);
            obstacle.scale = 0.15;
            
            //setting velocity and lifetime
            obstacle.velocityX = -4;
            obstacle.lifetime = 150;
            
            //adding to obstacles group
            obstacleGroup.add(obstacle);
            
      }
      
}