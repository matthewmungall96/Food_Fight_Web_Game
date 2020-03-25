
let loadScene = new Phaser.Scene('Load');

var player = null;
var healthpoints = null;
var reticle = null;
var moveKeys = null;
var playerBullets = null;
var enemyBullets = null;
var time = 0;

loadScene.preload = function () {
    this.load.image("title_bg", "./dist/assets/images/background.jpg");
    this.load.image("logo", "./dist/assets/images/foodFight.png");
    this.load.image("singleplayer_button", "./dist/assets/images/single.png")
    this.load.image("multiplayer_button", "./dist/assets/images/multi.png")
    this.load.image("returntomenu", "./dist/assets/images/returntomenu.png");

    //this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png',
    //{ frameWidth: 66, frameHeight: 60 }
    //); 
    //this.load.image('bullet', 'assets/sprites/bullets/bullet6.png');
    //this.load.image('target', 'assets/demoscene/ball.png');
    //this.load.image('background', 'assets/skies/underwater1.png');
}

loadScene.create = function () {
    this.scene.start('Menu');
    this.scene.stop('Load');
}
