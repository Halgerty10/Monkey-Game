var monkey,monkeyRunning,jungle,jungleImg,banana,
    bananaImg,stone,stoneImg,invisibleGround;

var obstaclesGroup,foodGroup;

var score = 1;

function preload(){
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png",
                      "Monkey_03.png","Monkey_04.png","Monkey_05.png",
                            "Monkey_06.png","Monkey_07.png","Monkey_08.png",
                            "Monkey_09.png","Monkey_10.png");
  
  jungleImg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
  
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);
  
  jungle = createSprite(700,200);
  jungle.addImage("background",jungleImg);
  jungle.x = jungle.width/2;
  jungle.velocityX = -4;
  
  
  //monkey = createSprite (50,345,40,40);
  
  monkey = createSprite (50,364,40,40);
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale = 0.08; 
  
  invisibleGround = createSprite(19,370,1165,10);
  invisibleGround.visible = false; 
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  //console.log(monkey.y);
  spawnFood();
  spawnObstacles(); 
  
  if(jungle.x < 100){
     jungle.x = jungle.width/2;
     }
  
  if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 2;
  }
  
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
  }
  
  if(keyDown("space")) {
     monkey.velocityY = -12;
     }
  
  if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);
  //monkey.collide(edges);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  text("Score: " + score,450,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 130 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 250 === 0) {
    stone = createSprite(800,350,10,40);
    stone.velocityX = -6;
    stone.addImage(stoneImg);
    
    //assign scale and lifetime to the obstacle     
    stone.scale = 0.2;
    stone.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(stone);
  }
}