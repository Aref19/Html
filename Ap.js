
    var gameOver=false;
    var firstgame=true;
    var vorfrei=true;
    var contoll=true;
    var win = window;
    var score = 0;
    var scoreText;
    var acrons;
    var bomben;
    var acronsschiss;
    var hintersound;
    var  trem;
    var  rightorlink=false ;
    var gewonnen=false;
    var time=0; 
    var schiss=0;
    var player;
    var phlanze;
    var catgeschossen=false;
    var catsound;
    var bombesound;
    var game = new Phaser.Game(1800, 1000, Phaser.AUTO,' ' , { preload: preload, create: create, update: update });

    //var camera= new Phaser.Camera(game, 1, 32,  10, 20, 20);
    var postionRghit=0;

    function preload ()
    {    
    game.load.image('sky', 'phots/sky.png');
    game.load.image('ground', 'phots/platform.png');
    game.load.image('tree', 'phots/tree1.png');
    game.load.image('box', 'phots/box.png');
    game.load.image('term', 'phots/term.jpg');
    game.load.image('phlanz', 'phots/blume.png');
    game.load.image('acorn', 'phots/acorn.png');
    game.load.image('schiss', 'phots/schiss.png');
    game.load.image('bombe', 'phots/bombe.png');
    game.load.image('save', 'phots/platform.png');
    game.load.spritesheet('plyer', 'phots/snjab.png', 48, 48,35);
    game.load.spritesheet('cat', 'phots/cat.png', 48, 48,35);
    game.load.image('wolk', 'phots/wolk.png');
    game.load.audio('hinterground', ['sound/hinterground1.mp3']);
    game.load.audio('catsound', ['sound/soundcatwean.wav']);
    game.load.audio('bombesound', ['sound/bombe.wav']);
    bombe.wav
    }

    function create ()

    {    
        
        
    //text
    scoreText = game.add.text(16, 16, 'score: 0/10', { fontSize: '32px', fill: '#000' });
 
    //game    
    game.stage.backgroundColor = "#4488AA";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 6150 , 1000);

   
    

    //platform
    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.create(-250, game.world.height -500, 'tree');
    wolks(platforms);
   var save= platforms.create(6000, game.world.height -200, 'save');
    save.body.immovable = true;
    creatBox(platforms);
    
    trem= platforms.create(game.world.height+2350, game.world.height -150, 'term');
    trem.body.immovable = true;
    
   
    
    var ground = platforms.create(0, game.world.height -30, 'ground');
    ground.scale.setTo(150, 150);
    ground.body.immovable = true;
   
    //plyer1
    player = game.add.sprite(200, game.world.height - 150, 'plyer',20);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
   


    //cat
    cat = game.add.sprite(20, game.world.height-200, 'cat',1);
    game.physics.arcade.enable(cat);
    cat.body.bounce.y = 0.2;
    cat.body.gravity.y = 300;
    cat.body.collideWorldBounds = true;


    player.animations.add('right', [27, 28, 29], 10, true);
    player.animations.add('left', [15], 10, true);
    //cat
    cat.animations.add('right', [27, 28, 29], 10, true);
    cat.animations.add('left', [13, 14, 15], 10, true);
    cursors = game.input.keyboard.createCursorKeys();

    //camera
    game.camera.height=1000;
    game.camera.width=1500;

    //sound
    hintersound=game.sound.add("hinterground", 10);
    catsound=game.sound.add("catsound", 10);
    hintersound.play();
    
    acrons = game.add.group();
    phlanze=game.add.group();
    phlanze.enableBody=true;
    creatPhlanz();
     //Bombe
    bomben=game.add.group();
    bomben.enableBody=true;
    creatBobe();
    acronsschiss = game.add.group();
    //  We will enable physics for any star that is created in this group
    acronsschiss.enableBody=true;
    acrons.enableBody = true;
    dropacron();
    //
    bombesound = game.sound.add("bombesound", 10);
    
  
 
    }

    function update ()
    { 
      
   
    
        
        if(!gameOver){
            game.physics.arcade.collide(acrons, platforms);
            game.physics.arcade.collide(phlanze, platforms);
            //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
            game.physics.arcade.overlap(player, acrons,collectStar, null, this);
            game.physics.arcade.overlap(player, phlanze,takeblum, null, this);
            game.physics.arcade.overlap(player, bomben,plyerBombe, null, this);
            
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
            scoreText.x=player.body.x+20;
            postionRghit=2+postionRghit;
            contoll=false;

        }
        else
        {
        
            //  Stand still
            player.animations.stop();
            player.frame = 4;  
            

        }
        if (cursors.left.isDown&&schiss!=0)
        {   
        
            //  Move to the right
            bombesound.play();
           player.animations.play('left');  
           scoreText.x=player.body.x;
           scoreText.x=player.body.x+20;
           postionRghit=2+postionRghit;
           contoll=false;
           var schossenFeuer=acronsschiss.create(player.position.x-20, player.position.y+20, 'schiss');
         
           schossenFeuer.body.gravity.x = -80 ;
           schiss=schiss-1;


            
            
      //    cronschiss.body.bounce.x = 0.7 + Math.random() * 0.2;

        }
      
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            if(score>9){
                player.body.velocity.y = -500; 
                player.body.collideWorldBounds = false;
                catzurck();
            }else{
            player.body.velocity.y = -250;  
        
            contoll=false; 
            }
            
            
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
        
    
       

        if(parseInt(cat.position.x)==629){
           
            vorfrei=false;
        }else if(parseInt(cat.position.x)==1148){
        
            vorfrei=false;
        }else if(parseInt(cat.position.x)==2951){
            vorfrei=false;
        }else if(parseInt(cat.position.x)==3951){
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
        if(catgeschossen==false){
            catMove(); 
        }else{
            catgeschossen=false;
        }
   
    game.physics.arcade.overlap(player,cat,catTakeMaus, null, this);
    game.physics.arcade.overlap(acronsschiss,cat,schiisCat, null, this);
    movetrem();

    }else{
        cat.animations.stop();
        cat.frame = 4;
        cat.body.velocity.x = 0;
        cat.body.collideWorldBounds = true;
    }



    }

    function catMove(){
        if(gewonnen==false){

       
    
    if(vorfrei){
    cat.body.velocity.x = 100;
    cat.animations.play('right'); 
      

    }else if(!vorfrei ){
    cat.body.velocity.y = -250;
    cat.body.velocity.x = 100;
    vorfrei=true;
    }
    
     }else{

     }
    
    
    }

    function creatBox(platform){

    box= platform.create(game.world.height-300, game.world.height -100, 'box');
    box2= platform.create(game.world.height+200, game.world.height -100, 'box');
    box3= platform.create(game.world.height+2000, game.world.height -100, 'box');
    box4= platform.create(game.world.height+3000, game.world.height -100, 'box');
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

           
          var  acorn = acrons.create(500, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(1000, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(1500, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(2500, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(2800, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(2900, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(3500, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(4200, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(4500, game.world.height - (200-(5)), 'acorn');
          var  acorn = acrons.create(4700, game.world.height - (200-(5)), 'acorn');
      
          
            acorn.body.immovable = true;
        
    }

    function creatPhlanz(){
   var p1= phlanze.create(2000, game.world.height -75, 'phlanz');
   var p2= phlanze.create(3500, game.world.height -75, 'phlanz');
  
   p1.body.immovable=true;
   p2.body.immovable=true;
    }



    function changeVolume(pointer) {

        if (pointer.y < 100)
        {
            hintersound.mute = false;
        }
        else if (pointer.y < 300)
        {
            hintersound.volume += 0.1;
        }
        else
        {
            hintersound.volume -= 0.1;
        }

    }
    function render() {
        game.debug.soundInfo(hinterground, 20, 32);
    }
function movetrem(){
    if(parseInt(player.position.x)>game.world.height+2300){
        trem.body.gravity.x = 100   
      
        if( trem.position.x>3900  ){
            trem.body.gravity.y = 100  
        }
        
    }
}

function bombe(platForm){

}


function collectStar (player, acron) {

    // Removes the star from the screen
   // Removes the star from the screen
   acron.kill();

    //  Add and update the score
    score += 1;
    if(score==13){
        scoreText.text = 'Jump to your wife';
    }else{
        scoreText.text = 'Score: ' + score+"/10"; 
    }
   

}

function catTakeMaus (player, cat) {

    // Removes the star from the screen
   // Removes the star from the screen

   
   player.body.bounce.y = 1;
   player.body.collideWorldBounds = false;
   gameOver=true;

}

function catzurck(){
    cat.animations.stop();
            cat.frame = 4; 
            cat.body.collideWorldBounds = false;
    gewonnen=true;
}

function schiisCat(){
    cat.animations.stop();
    cat.body.collideWorldBounds = false;
    catgeschossen=true;
    catsound.play();

}

function wolks(plat){
    var wolk=plat.create(16, 16, 'wolk');
    var wolk1=plat.create(game.world.height+600, 50, 'wolk');
    var wolk2=plat.create(game.world.height+1900, 16, 'wolk');
    var wolk4=plat.create(game.world.height+1500, 16, 'wolk');
    var wolk6=plat.create(game.world.height+4000, 20, 'wolk');
    wolk.body.immovable = true;
    wolk1.body.immovable = true;
    wolk2.body.immovable = true;

    wolk4.body.immovable = true;
  
    wolk6.body.immovable = true;

}

function takeblum(p,c){
    c.kill();
   var schiistext= game.add.text(player.body.position.x, 500, ' left drucken Schiss', { fontSize: '32px', fill: '#FF0000' });
   schiss=1;

  
}

function creatBobe(){
    
    var b1=bomben.create(game.world.height+2350, 940, 'bombe');
   var b2=bomben.create(2500,940, 'bombe');
   var b3=bomben.create(game.world.height+2800, 940, 'bombe');

   b1.body.immovable=true;
   b2.body.immovable=true;
   b3.body.immovable=true;
}

function plyerBombe(p,b){
    b.kill();
    cat.animations.stop();
    bombesound.play();
    player.animations.stop();
    gameOver=true;
   console.log("bombe");
}