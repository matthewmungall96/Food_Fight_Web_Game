var game;

window.onload=function(){
    var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [loadScene, menuScene, singleScene, multiScene]
    };
game = new Phaser.Game(config); 
}