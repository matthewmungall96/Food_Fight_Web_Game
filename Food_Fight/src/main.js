var game;

window.onload=function(){
    var config = {
    type: Phaser.AUTO,
    width: 800,
      height: 600, input: {
        gamepad: true
      },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
    },
    backgroundColor: '#888888',
    parent: 'phaser-example',
    input: {
        gamepad: true
    },
    scene: [loadScene, menuScene, singleScene, multiSetupScene, multiScene, narrativeScene]
    };
    
game = new Phaser.Game(config); 
}