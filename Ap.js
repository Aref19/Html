var config = {

    type: Phaser.AUTO,
    width: 1800,
    height: 600,
    physics: {
        default: 'arcade',
    
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

    backgroundColor:'#049cd8',
    
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
    
};

var player;
var stars;
var bombs;
var platform;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{   
this.load.image('s', 'phots/tree.png');

this.load.image('ground', 'phots/platform.png');


this.load.spritesheet('plyer', 'phots/snjab.png', { frameWidth: 48, frameHeight: 48 });

}

function create ()
{



player = this.physics.add.sprite(100, 450, 'plyer');

player.setBounce(0.5);
player.setCollideWorldBounds(true);
animate(this);
cursors = this.input.keyboard.createCursorKeys();

var s=this.physics.add.collider(player,platforms(this,platform));



}



function update ()
{  
if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
    if (cursors.up.isDown&& player.body.touching.down)
    {
        player.setVelocityY(-155);
    }

}

function collectStar (player, star)
{

}

function hitBomb (player, bomb)
{

}

function animate(c){
c.anims.create({
        key: 'left',
        frames: c.anims.generateFrameNumbers('plyer', { start:62, end: 68 }),
        frameRate:15,
        repeat: -1
    });

    c.anims.create({
        key: 'right',
        frames: c.anims.generateFrameNumbers('plyer', { start: 72, end: 78 }),
        frameRate: 15,
        repeat: -1
    });

    c.anims.create({
        key: 'turn',
        frames: [ { key: 'plyer', frame: 52 } ],
        frameRate: 20
    });
}


function   platforms(c,platform){
platform = c.physics.add.staticGroup();
platform.create(400, 568, 'ground').setScale(2).refreshBody();
platform.create(60, 410, 's').setScale(0.5);

return platform;
}
