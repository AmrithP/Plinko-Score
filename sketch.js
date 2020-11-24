//All variables and constants being declared

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

//Arrays being declared

var divisions = [];
var particles = [];
var plinkos = [];
var particle;

var divisionHeight = 300;

//Score and the amount of balls you can use (5 particles)

var score = 0;
var count = 0;

//Game state is play

var gameState = "PLAY";

function setup() {

  //Canvas is being formed

  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  //Ground gets created

  ground = new Ground(width/2,height,width,20);
  
  //Divisions for loop

  for (var d = 0; d <=width; d = d + 80) {

    divisions.push(new Divisions(d, height-divisionHeight/2, 10, divisionHeight));

  }

  //Plinko for loops
  
  for (var j = 75; j <=width; j=j+50){
      
    plinkos.push(new Plinko(j,75));
      
  }
  
  for (var j = 50; j <=width-10; j=j+50){
      
    plinkos.push(new Plinko(j,175));
    
  }
  
  for (var j = 75; j <=width; j=j+50){
      
    plinkos.push(new Plinko(j,275));
      
  }
  
  for (var j = 50; j <=width-10; j=j+50){
      
    plinkos.push(new Plinko(j,375));
      
  }

}

function draw(){

  //Background

  background(0);

  //Engine Updates

  Engine.update(engine);

  //Text are created

  fill("red")
  textSize(30)
  text("Score: " + score, 20, 40);

  fill("red");
  textSize(30)
  text("500", 15, 550);
  text("500", 90, 550);
  text("500", 170, 550);
  text("500", 250, 550);
  text("100", 330, 550);
  text("100", 410, 550);
  text("100", 490, 550);
  text("200", 570, 550);
  text("200", 650, 550);
  text("200", 730, 550);

  //Ground is being displayed

  ground.display();

  //If condition for when the game state ends and game over text

  if (gameState ==="END"){

    fill("red");
    textSize(30);
    text("Game Over!", 335, 40);
    text("Press R to restart!",300, 135)
    score.visible = false;

  } 

  if(gameState === "END" && keyCode === 114){

    gameState = "START"
    score = 0;
    count = 0;

  }

  //Plinkos array and display
      
  for(var p = 0; p < plinkos.length; p++){

    plinkos[p].display();
  
  }

  //Particle crossing the line logic

  if(particle!=null){
       
      particle.display();
          
      if (particle.body.position.y>760){

        if (particle.body.position.x < 300){
                      
          score=score+500;      
          particle=null;
                        
          if ( count>= 5) gameState ="END";  

        }

        else if (particle.body.position.x < 600 && particle.body.position.x > 301){
            
          score = score + 100;
          particle=null;
          if ( count>= 5) gameState ="END";

        }
          
        else if (particle.body.position.x < 900 && particle.body.position.x > 601){

          score = score + 200;
          particle=null;
          if ( count>= 5) gameState ="END";

        }      
                
      }

    }

 //Divisions array   
  
 for (var i = 0; i < divisions.length; i++){
     
    divisions[i].display();

  }
  
}

//Mouse pressed function for the particles to be summoned by click

function mousePressed(){

    if(gameState !== "END"){

      count++;
      particle = new Particle(mouseX, 50, 10, 10);

    }

}