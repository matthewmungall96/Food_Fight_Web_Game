let loadScene = new Phaser.Scene('Load');

var player = null;
var healthpoints = null;
var reticle = null;
var moveKeys = null;
var playerBullets = null;
var zombieBullets = null;
var time = 0;

loadScene.preload = function () {
    //Loading Main Menu Files
    this.load.image("title_bg", "./dist/assets/images/bground.jpg");
    this.load.image("logo", "./dist/assets/images/foodFight.png");
    this.load.image("singleplayer_button", "./dist/assets/images/G.U.I/single.png");
    this.load.image("multiplayer_button", "./dist/assets/images/G.U.I./multi.png");
    this.load.image("narrative_button", "./dist/assets/images/G.U.I./narrative.png");
    this.load.image("returntomenu", "./dist/assets/images/returntomenu.png");

    //Loading Setup Files
    this.load.image("singlesetup", "./dist/assets/images/G.U.I/singlesetup.png");
    this.load.image("multisetup", "./dist/assets/images/G.U.I/multisetup.png");
    this.load.image("start_game", "./dist/assets/images/G.U.I/startgame.png");
    this.load.image("return", "./dist/assets/images/G.U.I/return.png");

    //Loading Controller Check
    this.load.image("controller_1", "./dist/assets/images/G.U.I/cont1.png");
    this.load.image("controller_2", "./dist/assets/images/G.U.I/cont2.png");
    this.load.image("controller_3", "./dist/assets/images/G.U.I/cont3.png");
    this.load.image("controller_4", "./dist/assets/images/G.U.I/cont4.png");
    this.load.image("controller_inactive", "./dist/assets/images/G.U.I/inactive.png")
    this.load.image("controller_active", "./dist/assets/images/G.U.I/active.png")

    //Loading Game Music Files
    this.load.audio("mainMenu", "./dist/assets/music/Main_Menu.wav");
    this.load.audio("singlePlayerMusic", "./dist/assets/music/Single_Player_Music.wav");

    //Loading Game SFX Files
    this.load.audio("pressButton","./dist/assets/sfx/button_press.wav");
    this.load.audio("zombieHitNoise", "./dist/assets/sfx/zombie_Splat.wav");
    this.load.audio("zombieDeath", "./dist/assets/sfx/zombie_death.wav");
    this.load.audio("pistolSwooshNoise", "./dist/assets/sfx/pistolSwish.mp3");
    this.load.audio("emptyGun", "./dist/assets/sfx/gun_empty.wav")

    //Loading Player Files
    this.load.image('player1', './dist/assets/characters/Survivor 1/survivor1_gun.png');
    this.load.image('player2', './dist/assets/characters/Man Blue/manBlue_gun.png');
    this.load.image('player3', './dist/assets/characters/Man Brown/manBrown_gun.png');
    this.load.image('player4', './dist/assets/characters/Man Old/manOld_gun.png');

    //Loading Player U.I.
    this.load.image('playerTable', './dist/assets/images/U.I./table.png');
    this.load.image('emptyBurger', './dist/assets/images/U.I./burgerG.png');
    this.load.image('fullBurger', './dist/assets/images/U.I./burgerC.png');
    this.load.image('bullet0', './dist/assets/images/U.I./beer0.png');
    this.load.image('bullet1', './dist/assets/images/U.I./beer1.png');
    this.load.image('bullet2', './dist/assets/images/U.I./beer2.png');
    this.load.image('bullet3', './dist/assets/images/U.I./beer3.png');
    this.load.image('bullet4', './dist/assets/images/U.I./beer4.png');
    this.load.image('bullet5', './dist/assets/images/U.I./beer5.png');
    this.load.image('bullet6', './dist/assets/images/U.I./beer6.png');
    this.load.image('bullet7', './dist/assets/images/U.I./beer7.png');
    this.load.image('bullet8', './dist/assets/images/U.I./beer8.png');   
    this.load.image('bullet9', './dist/assets/images/U.I./beer9.png');
    this.load.image('bullet10', './dist/assets/images/U.I./beer10.png');

    //Loading Controller Button Detection
    this.load.image('pizzaBullet', './dist/assets/images/food/bulletPizza.png');
    this.load.image('chickenBullet', './dist/assets/images/food/bulletChicken.png');

    this.load.image('enemy', './dist/assets/characters/Zombie 1/zombie.png');
    this.load.image('target', './dist/assets/images/U.I/cHairWhite.png');
    //this.load.image('background', 'assets/skies/underwater1.png');

    //loads spritesheet for animations
    this.load.spritesheet('explosion','./dist/assets/images/explosion.png', {
        frameWidth: 16,
        frameHeight: 16
    });
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
        this.setSize(66, 60);
        this.setDisplaySize(66,60);
        this.health = 5;
     
    },
    go: function (startx, starty) {
        this.health = 5;
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

var pizzaBullets = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        // Bullet Constructor
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pizzaBullet');
            this.speed = 1;
            this.born = 0;
            this.direction = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.setSize(30, 30, true);
            this.setDisplaySize(30,30);
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

var chickenBullets = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        // Bullet Constructor
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'chickenBullet');
            this.speed = 1;
            this.born = 0;
            this.direction = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.setSize(30, 30, true);
            this.setDisplaySize(30,30);
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
