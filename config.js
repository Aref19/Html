export var config = {

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
