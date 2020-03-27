let loadScene = new Phaser.Scene('Load');

var player = null;
var healthpoints = null;
var reticle = null;
var moveKeys = null;
var playerBullets = null;
var zombieBullets = null;
var time = 0;

loadScene.preload = function () {
    this.load.image("title_bg", "./dist/assets/images/background.jpg");
    this.load.image("logo", "./dist/assets/images/foodFight.png");
    this.load.image("singleplayer_button", "./dist/assets/images/single.png")
    this.load.image("multiplayer_button", "./dist/assets/images/multi.png")
    this.load.image("returntomenu", "./dist/assets/images/returntomenu.png");
    this.load.audio("mainMenu", "./dist/assets/music/Game-Menu.mp3");
    this.load.image('player1', './dist/assets/characters/Survivor 1/survivor1_gun.png');
    this.load.image('player2', './dist/assets/characters/Man Blue/manBlue_gun.png');
    this.load.image('player3', './dist/assets/characters/Man Brown/manBrown_gun.png');
    this.load.image('player4', './dist/assets/characters/Man Old/manOld_gun.png');
    //this.load.image('bullet', 'assets/sprites/bullets/bullet6.png');
    this.load.image('enemy', './dist/assets/characters/Zombie 1/zombie.png');
    //this.load.image('target', 'assets/demoscene/ball.png');
    //this.load.image('background', 'assets/skies/underwater1.png');
}

loadScene.create = function () {
    this.scene.start('Menu');
    this.scene.stop('Load');
}

var Zombie = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function Zombie(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
        this.setDepth(1);
        this.speed = 0.1;
        this.direction = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.setPosition(100, 100);
        this.setDisplaySize(66, 60);
        this.health = 2;
    },
    go: function (startx, starty) {
        this.setPosition(startx, starty);
    },
    update: function (time, delta) {
        this.direction = Math.atan((globalX - this.x) / (globalY - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (globalY >= this.y) {
            this.speedX = this.speed * Math.sin(this.direction);
            this.speedY = this.speed * Math.cos(this.direction);
        }
        else {
            this.speedX = -this.speed * Math.sin(this.direction);
            this.speedY = -this.speed * Math.cos(this.direction);
        }
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, globalX, globalY);
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;

    }
});

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        // Bullet Constructor
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
            this.speed = 1;
            this.born = 0;
            this.direction = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.setSize(12, 12, true);
        },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target) {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta) {

        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 5000) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});