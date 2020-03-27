var game;

window.onload=function(){
    var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
    },
    backgroundColor: '#888888',
    parent: 'phaser-example',
    scene: [loadScene, menuScene, singleScene, multiScene]
    };
game = new Phaser.Game(config); 
}