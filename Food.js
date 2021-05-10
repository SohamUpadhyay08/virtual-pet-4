class Food{
    constructor(){}


    display(){
        fill("red")
     
      var button=createButton("Feed the Dog");
      button.position(360,105);

      if(button.mousePressed(function(){
          if(foodS > 0){
         foodS=foodS-1; }
         GameState=1;
         database.ref('/').update({'GameState':GameState});
      }));
      
      var addFood=createButton("get food from market");
      addFood.position(360,135);

      if(addFood.mousePressed(function(){
        foodS=foodS+1; 
        GameState=2;
        database.ref('/').update({'GameState':GameState});
     }));

     var BulkFood=createButton("get crate of FOODS from market");
      BulkFood.position(360,165);

      if(BulkFood.mousePressed(function(){
        foodS=foodS+10; 
        GameState=2;
        database.ref('/').update({'GameState':GameState});
     }));

     var stock=createButton("Out of STOCK");
      stock.position(360,195);

      if(stock.mousePressed(function(){
        foodS=0; 
        GameState=2;
        database.ref('/').update({'GameState':GameState});
     }));

     
    }
}