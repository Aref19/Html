
var gameOver=false;
var firstgame=true;
var vorfrei=true;
var contoll=true;
var win = window;
var score = 0;
var scoreText;
var acron;
var game = new Phaser.Game(5000, 1000, Phaser.AUTO,' ' , { preload: preload, create: create, update: update });

//var camera= new Phaser.Camera(game, 1, 32,  10, 20, 20);
var postionRghit=0;

function preload ()
{    
game.load.image('sky', 'phots/sky.png');
game.load.image('ground', 'phots/platform.png');
game.load.image('tree', 'phots/tree1.png');
game.load.image('box', 'phots/box.png');

game.load.image('acorn', 'phots/acorn.png');
game.load.spritesheet('plyer', 'phots/snjab.png', 48, 48,35);
game.load.spritesheet('cat', 'phots/cat.png', 48, 48,35);
}

function create ()
{      
    scoreText = game.add.text(20,  1000/3, 'score: 0', { fontSize: '32px', fill: '#000' });
//game    
game.stage.backgroundColor = "#4488AA";
game.physics.startSystem(Phaser.Physics.ARCADE);
game.world.setBounds(0, 0, 6000 , 1000);
//
acron = game.add.group();
acron.enableBody = true;
dropacron();

//platform
platforms = game.add.group();
platforms.enableBody = true;
platforms.create(-250, game.world.height -500, 'tree');
creatBox(platforms);
var ground = platforms.create(0, game.world.height -30, 'ground');
ground.scale.setTo(150, 150);
ground.body.immovable = true;

//plyer1
player = game.add.sprite(200, game.world.height - 150, 'plyer',20);
game.physics.arcade.enable(player);
player.body.bounce.y = 0.2;
player.body.gravity.y = 300;
player.body.collideWorldBounds = true;


//cat
cat = game.add.sprite(20, game.world.height-200, 'cat',1);
game.physics.arcade.enable(cat);
cat.body.bounce.y = 0.2;
cat.body.gravity.y = 300;
cat.body.collideWorldBounds = true;


player.animations.add('right', [27, 28, 29], 10, true);
//cat
cat.animations.add('right', [27, 28, 29], 10, true);
cursors = game.input.keyboard.createCursorKeys();

//camera
game.camera.height=1000;
game.camera.width=1500;


}

function update ()
{ 
    
     
    
    if(!gameOver){
       
    
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

    
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hitPlatform = game.physics.arcade.collide(cat, platforms);
    player.body.velocity.x = 0;
    cat.body.velocity.x = 0;
    
     if (cursors.right.isDown)
    {   
    
        //  Move to the right
        player.body.velocity.x = 100;
        player.animations.play('right');  
         scoreText.x=player.body.x;
        postionRghit=2+postionRghit;
        contoll=false;

    }
    else
    {
    
           //  Stand still
        player.animations.stop();
        player.frame = 4;  
        

    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -250;  
       
        contoll=false;
        
    }
   if((window. innerWidth-postionRghit)<300){

        game.camera.follow(player);
     
        postionRghit=0;
        
    }
    if(parseInt(player.position.x)-50== parseInt(cat.position.x)){
        if(!player.body.touching.down){
            cat.body.velocity.y = -250;  
        }
    }
     
    if( parseInt(player.position.x)== parseInt(cat.position.x)){
        
   
        player.body.bounce.y = 1;
        player.body.collideWorldBounds = false;
        gameOver=true;        
        
    }
 

    if(parseInt(cat.position.x)==629){
        console.log("dsa");
        vorfrei=false;
    }else if(parseInt(cat.position.x)==1148){
     
        vorfrei=false;
    }
    if (contoll)
    {   
    
        //  Move to the right
        player.body.velocity.x = 100;
        player.animations.play('right');    
        postionRghit=2+postionRghit;
     
        vorfrei=true;

    }
  catMove();

}else{
    cat.animations.stop();
    cat.frame = 4;
    cat.body.velocity.x = 0;
    cat.body.collideWorldBounds = true;
}



}

function catMove(){
  
    if(vorfrei){
    cat.body.velocity.x = 100;
    cat.animations.play('right'); 
    console.log("ground :"+parseInt(cat.position.x))

  }else if(!vorfrei ){

    console.log("Jumop");
   cat.body.velocity.y = -250;
   cat.body.velocity.x = 100;
   vorfrei=true;
  }
   
  
 
  
}

function creatBox(platform){
   box= platform.create(game.world.height-300, game.world.height -100, 'box');
   box2= platform.create(game.world.height+200, game.world.height -100, 'box');
   box3= platform.create(game.world.height+2000, game.world.height -100, 'box');
   box4= platform.create(game.world.height+1500, game.world.height -100, 'box');
   box.body.immovable = true;
   box2.body.immovable = true;
   box3.body.immovable = true;
   box4.body.immovable = true;
   
}
function createat(platform){
    box= platform.create(game.world.height-300, game.world.height -100, 'box');
    box2= platform.create(game.world.height+200, game.world.height -100, 'box');
    box.body.immovable = true;
    box2.body.immovable = true;
 }

 function dropacron(){

    var acorns3 ;
  
        //  Create a star inside of the 'stars' group
        for (let step = 0; step < 20; step++) {
        //    var acorns = acron.create(game.world.height+((Math.random()*1000) *step), game.world.height -(Math.random()*100), 'acorn');
         //   var acorns2 = acron.create(game.world.height+(350*step), game.world.height - 100, 'acorn');
             acorns3 = acron.create(step*400, game.world.height - (150-(step*5)), 'acorn');
         //   acorns.body.immovable = true;
           // acorns.body.collideWorldBounds = true;
           // acorns2.body.immovable = true;
           // acorns2.body.collideWorldBounds = true;
           
           
          }
          acorns3.body.immovable = true;
    
        //  Let gravity do its thing
        //acorns.body.gravity.y = 200;

        //  This just gives each star a slightly random bounce value
       // acorns.body.bounce.y = 0.7 + Math.random() * 0.2;
    


 }







