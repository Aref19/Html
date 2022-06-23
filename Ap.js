


var game = new Phaser.Game(2000, 1000, Phaser.AUTO,' ' , { preload: preload, create: create, update: update });

//var camera= new Phaser.Camera(game, 1, 32,  10, 20, 20);
var postionRghit=0;

function preload ()
{    
game.load.image('sky', 'phots/sky.png');
game.load.image('ground', 'phots/platform.png');

game.load.spritesheet('plyer', 'phots/snjab.png', 48, 48,35);
game.load.spritesheet('cat', 'phots/cat.png', 48, 48,35);
}

function create ()
{      

//game    
game.stage.backgroundColor = "#4488AA";
game.physics.startSystem(Phaser.Physics.ARCADE);
game.world.setBounds(0, 0, 2000, 1000);

//platform
platforms = game.add.group();
platforms.enableBody = true;
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
cat = game.add.sprite(20, game.world.height-200, 'cat',20);
game.physics.arcade.enable(cat);
cat.body.bounce.y = 0.2;
cat.body.gravity.y = 300;
cat.body.collideWorldBounds = true;

 player.animations.add('left', [15, 16, 17], 10, true);
player.animations.add('right', [27, 28, 29], 10, true);
cursors = game.input.keyboard.createCursorKeys();

//camera

game.camera.height=1000;
game.camera.width=1500;

}

function update ()
{ 
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

    
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hitPlatform = game.physics.arcade.collide(cat, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    { 
        
        
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
        postionRghit-=2;
      
    }
    else if (cursors.right.isDown)
    {   
    
        //  Move to the right
        player.body.velocity.x = 100;
        player.animations.play('right');    
        postionRghit=2+postionRghit;

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
    }
   if((window. innerWidth-postionRghit)<300){

        game.camera.follow(player);
        postionRghit=0;
        
    }

function addtrees(){
  platformstree=game.add.group();

}
    

}








