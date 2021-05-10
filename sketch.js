//Create variables here


var dog,dogImg,happyDog,database,foodS,foodStock
var timetable
var foodObj
var tshedule
var GameState 
var milk,milkImg,milk2Img
var garden,washroom,bedroom,livingroom


function preload()
{
  //load images here
  dogImg = loadImage("dog.png")
  happyDog = loadImage("happydog.png")
  garden=loadImage("gardern.png");
  washroom=loadImage("Wash Room.png");
  bedroom=loadImage("Bed Room.png");
  milkImg = loadImage("food.png")
  milk2Img = loadImage("dogFood.png")
  livingroom = loadImage("living.png");
   timetable = loadImage("timetable.png");
   tshedule = loadImage("shedule.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,600);

  foodObj = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  
  dog = createSprite(291,500,20,60)
  dog.addImage(dogImg)
  dog.scale = 0.20

  milkBottle1 = createSprite(60,435,10,10);
  milkBottle1.addImage(milkImg);
  milkBottle1.scale = 0.1;

  milkBottle2 = createSprite(195,274,10,10);
  milkBottle2.addImage(milk2Img);
  milkBottle2.scale = 0.066;
  milkBottle2.visible = false;



  
}

function draw() { 
  background("aquamarine") 
  foodObj.display();
  //writeStock(foodS);

  if(foodS == 0 ){
    dog.addImage(happyDog);
    milkBottle2.visible = false;
  }else{
    dog.addImage(dogImg)
    milkBottle2.visible = true;
  }

  var gameStateRef=database.ref('GameState');
  gameStateRef.on('value',function(data){
    GameState = data.val();
  });


  if(GameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }
  if(GameState===2){
    dog.addImage(dogImg);
    dog.scale=0.175;
    milkBottle2.visible=false;
    milkBottle1.visible = true;
    dog.y=250;
  }
  
  var Bath=createButton("I want to take bath");
  Bath.position(600,105);
  if(Bath.mousePressed(function(){
    GameState=3;
    database.ref('/').update({'GameState':GameState});
  }));
  if(GameState===3){
    dog.addImage(washroom);
    dog.scale=1.25;
    milkBottle2.visible=false;
    milkBottle1.visible=false
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(730,105);
  if(Sleep.mousePressed(function(){
    GameState=4;
    database.ref('/').update({'GameState':GameState});
  }));
  if(GameState===4){
    dog.addImage(bedroom);
    dog.scale=1.25;
    milkBottle2.visible=false;
    milkBottle1.visible=false
  }

  var Play=createButton("do you want to play!");
  Play.position(589,135);
  if(Play.mousePressed(function(){
    GameState=5;
    database.ref('/').update({'GameState':GameState});
  }));
  if(GameState===5){
    dog.addImage(livingroom);
    dog.scale=1.2;
    milkBottle2.visible=false;
    milkBottle1.visible=false
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(731,135);
  if(PlayInGarden.mousePressed(function(){
    GameState=6;
    database.ref('/').update({'GameState':GameState});
  }));
  if(GameState===6){
    dog.y=285;
    dog.x = 245
    dog.addImage(garden);
    dog.scale=1.6;
    milkBottle2.visible=false;
    milkBottle1.visible=false
  }

  var table=createButton("Time Table");
  table.position(730,165);
  if(table.mousePressed(function(){
    GameState=7;
    database.ref('/').update({'GameState':GameState});
  }));
  if(GameState===7){
    dog.y = 340
    dog.x = 250
    dog.addImage(timetable);
    dog.scale=2.4;
    milkBottle2.visible=false;
    milkBottle1.visible=false
  }

  var shedule=createButton("food SHEDULE");
  shedule.position(613,165);
  if(shedule.mousePressed(function(){
    GameState=8;
    database.ref('/').update({'GameState':GameState});
  }));
  if(GameState===8){
    dog.y = 340
    dog.x = 250
    dog.addImage(tshedule);
    dog.scale=1.5;
    milkBottle2.visible=false;
    milkBottle1.visible=false
  }



  textSize(21)
  fill("red")
  text("caution: our dog likes park and always ready to go",5,565)
  fill("red")
  text("his favourite food is biscuits",5,590)
  textSize(21);
  fill("black");
  text("biscuits Remaining: "+foodS,90,440);
  textSize(21);
  fill("black");
  text("For FOOD:",10,30);
  textSize(21);
  fill("black");
  text("ACTIVITIES:",330,30);

  drawSprites();
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}