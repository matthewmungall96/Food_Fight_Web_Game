
//Creation of the scene object
let loadScene = new Phaser.Scene('Load');

//Variable that stores all the players position through time
var playersPos = [];

/**
 * Preload function
 * 
 * Will import all the items used through the game, all sprites, musics and tile maps
 */

 loadScene.preload = function () {
    //Loading Main Menu Files
    this.load.image("title_bg", "./dist/assets/images/bground.jpg");
    this.load.image("logo", "./dist/assets/images/foodFight.png");
    this.load.image("singleplayer_button", "./dist/assets/images/G.U.I/single.png");
    this.load.image("multiplayer_button", "./dist/assets/images/G.U.I./multi.png");
    this.load.image("narrative_button", "./dist/assets/images/G.U.I./narrative.png");
    this.load.image("backstory_button", "./dist/assets/images/G.U.I./backstory.png");
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

    this.load.image('pizzaBullet', './dist/assets/images/food/bulletPizza.png');
    this.load.image('chickenBullet', './dist/assets/images/food/bulletChicken.png');
    this.load.image('friesBullet', './dist/assets/images/food/bulletFried.png');
    this.load.image('cheeseBullet', './dist/assets/images/food/bulletCheese.png')

    this.load.image('enemy', './dist/assets/characters/Zombie 1/zombie.png');
     this.load.image('target1', './dist/assets/images/U.I/cHairWhite.png');
     this.load.image('target2', './dist/assets/images/U.I/cHairOrange.png');
     this.load.image('target3', './dist/assets/images/U.I/cHairGreen.png');
     this.load.image('target4', './dist/assets/images/U.I/cHairBlue.png');

    //loading images for narrative scene
    this.load.image('Ron', './dist/assets/images/cha_sprites/chaSpriteRon.png');
    this.load.image('Dom', './dist/assets/images/cha_sprites/chaSpriteDom.png');
    this.load.image('Fred', './dist/assets/images/cha_sprites/chaSpriteFred.png');
    this.load.image('Rod', './dist/assets/images/cha_sprites/chaSpriteRod.png');
    this.load.image('narBground','./dist/assets/images/bios.png');
    this.load.image('ronButton','./dist/assets/images/G.U.I/ronan.png');
    this.load.image('rodButton','./dist/assets/images/G.U.I/rod.png');
    this.load.image('domButton','./dist/assets/images/G.U.I/dom.png');
    this.load.image('fredButton','./dist/assets/images/G.U.I/fred.png');
    this.load.image('ronBackstory','./dist/assets/images/G.U.I/ronBackstory.png');
    this.load.image('rodBackstory','./dist/assets/images/G.U.I/rodBackstory.png');
    this.load.image('domBackstory','./dist/assets/images/G.U.I/domBackstory.png');
    this.load.image('fredBackstory','./dist/assets/images/G.U.I/fredBackstory.png');
    this.load.image('plot','./dist/assets/images/G.U.I/plot.png');

    //loads spritesheet for animations
    this.load.spritesheet('explosion','./dist/assets/images/explosion.png', {
        frameWidth: 16,
        frameHeight: 16
    });
}

/**
 * Create funtion
 * 
 * Starts when the scene has finished loading all the assets from the preload function.
 * Starts the game by sending the Menu scene to the player, then shuts itself down.
 */
 loadScene.create = function () {
    this.scene.start('Menu');
    this.scene.stop('Load');
}


/**
 * Zombie class
 * 
 * Uses a base of Phaser.GameObject.Image class to act like a sprite with customized routines and variables
 * 
 */
 var Zombie = new Phaser.Class({

    //Calling of the Phaser.GameObject.Image class to inherit of its sprite properties
    Extends: Phaser.GameObjects.Image,
    
    /**
     * Initialise function
     * 
     * Constructor of the object, gives all its initial settings to the object when summoned.
     * 
     * @param {Phaser.Scene} scene  Scene to attach the Zombie to when created
     */
     initialize: function Zombie(scene) {
        
        //Calls the Enemy sprite and assigns it to itself, placed on the scene at coordinates x: 0 and y: 0
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
        
        //Sets the layer at which the sprite is to 1 in order to appear on top of the background
        this.setDepth(1);

        //Sets various variables to make sure no remaining data can interfere with the Zombie when it is created
        this.speed = 0.3;
        this.direction = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.health = 2;

        //Graphically forces the Zombie to have a set size and make his hitbox follow
        this.setSize(66, 60);
        this.setDisplaySize(66,60);
        
    },
    /**
     * Go Function
     * 
     * Sets the first location from which the Zombie will appear from.
     * 
     * @param {number} startx   Starting location on X
     * @param {number} starty   Starting location on Y
     */
     go: function (startx, starty) {

        //Applies the input positions to the object, forcing its location to shift.
        this.setPosition(startx, starty);
    },

    /**
     * Update function
     * 
     * Called with the Scene's update function.
     * Dictates how the sprite will move towards a certain location passed with the global variables globalX and globalY, holder of the player's positions.
     * 
     * @param {number} time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
     * @param {number} delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
     */
     update: function (time, delta) {
        //Security check to ensure that a player is alive
        if (playersPos.length <= 0) return;

        var closestPlayer = 0;
        //If the distance between the last saved closest player and the currently calculated one is lesser, replaces the saved player id with the current and moves on
        for (let i = 0; i < playersPos.length; i++) {
            var dist = distance(playersPos[i][0], playersPos[i][1], this.x, this.y);
            if (dist < distance(playersPos[closestPlayer][0], playersPos[closestPlayer][1], this.x, this.y))
                closestPlayer = i;
        }

        //Sets the direction the zombie has to move towards towards the closest player
        this.direction = Math.atan((playersPos[closestPlayer][0] - this.x) / (playersPos[closestPlayer][1] - this.y));

        // Calculate X and y velocity of the zombie to make them move towards their target at fixed speed
        if (playersPos[closestPlayer][1] >= this.y) {
            this.speedX = this.speed * Math.sin(this.direction);
            this.speedY = this.speed * Math.cos(this.direction);
        }
        else {
            this.speedX = -this.speed * Math.sin(this.direction);
            this.speedY = -this.speed * Math.cos(this.direction);
        }
        
        //Angles the sprites to make it face its target
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, playersPos[closestPlayer][0], playersPos[closestPlayer][1]);
        
        //Updates the zombie's position on the canvas
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;
        
    }
});


/**
 * Pizza bullet class
 * 
 * Uses a base of Phaser.GameObject.Image class to act like a sprite with customized routines and variables
 */
 var pizzaBullets = new Phaser.Class({
    
    //Calling of the Phaser.GameObject.Image class to inherit of its sprite properties
    Extends: Phaser.GameObjects.Image,
    
    /**
     * Initialise function
     *
     * Constructor of the object, gives all its initial settings to the object when summoned.
     *
     * @param {Phaser.Scene} scene  Scene to attach the bullet to when created
     */
     initialize: function Bullet(scene) {

        //Calls the pizza sprite and assigns it to itself, placed on the scene at coordinates x: 0 and y: 0
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pizzaBullet');
        
        //Sets the layer at which the sprite is to 1 in order to appear on top of the background
        this.setDepth(1);

        //Sets various variables to make sure no remaining data can interfere with the Zombie when it is created
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;

        //Graphically forces the Zombie to have a set size and make his hitbox follow
        this.setSize(30, 30, true);
        this.setDisplaySize(30,30);
    },

    /**
     * Fire Function
     * 
     * Sets the position and direction of a bullet to go from an object to another when the function if called.
     * The bullet keeps its direction and goes straight without change.
     * 
     * @param {Phaser.GameObjects} shooter Game Object that shot the bullet, determines starting position
     * @param {Phaser.GameObjects} target Game Object that was targetted by the shooter, determines line of propagation of the bullet
     */
     fire: function (shooter, target) {

        //Sets starting position
        this.setPosition(shooter.x, shooter.y); 

        //Sets direction in which the bullet has to go to
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
        //Angle bullet with shooters rotation
        this.rotation = shooter.rotation; 
        
        //Time since new bullet spawned
        this.born = 0; 
    },

    /**
     * Update function
     * 
     * Called with the Scene's update, determines the position of the bullet over time.
     * 
     * @param {number} time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
     * @param {number} delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
     */
     update: function (time, delta) {

        //Updates the position of the bullet with a set speed
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;

        //Logs how long the bullet has been 'alive' for
        this.born += delta;

        //If the bullet existed for more than 5 seconds, destroys it
        if (this.born > 5000) {
            this.destroy();
        }
    }
});

/**
 * Chicken bullet class
 * 
 * Uses a base of Phaser.GameObject.Image class to act like a sprite with customized routines and variables
 * 
 */
 var chickenBullets = new Phaser.Class({

    //Calling of the Phaser.GameObject.Image class to inherit of its sprite properties
    Extends: Phaser.GameObjects.Image,

    /**
    * Initialise function
    *
    * Constructor of the object, gives all its initial settings to the object when summoned.
    *
    * @param {Phaser.Scene} scene  Scene to attach the bullet to when created
    */
    initialize: function Bullet(scene) {

            //Calls the chicken sprite and assigns it to itself, placed on the scene at coordinates x: 0 and y: 0
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'chickenBullet');
            
            //Sets the layer at which the sprite is to 1 in order to appear on top of the background
            this.setDepth(1);

            //Sets various variables to make sure no remaining data can interfere with the Zombie when it is created
            this.speed = 1;
            this.born = 0;
            this.direction = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            
            //Graphically forces the Zombie to have a set size and make his hitbox follow
            this.setSize(30, 30, true);
            this.setDisplaySize(30,30);
        },

     /**
      * Fire Function
      * 
      * Sets the position and direction of a bullet to go from an object to another when the function if called.
      * The bullet keeps its direction and goes straight without change.
      * 
      * @param {Phaser.GameObjects} shooter Game Object that shot the bullet, determines starting position
      * @param {Phaser.GameObjects} target Game Object that was targetted by the shooter, determines line of propagation of the bullet
      */
      fire: function (shooter, target) {

         //Sets starting position
         this.setPosition(shooter.x, shooter.y);

         //Sets direction in which the bullet has to go to
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
         //Angle bullet with shooters rotation
         this.rotation = shooter.rotation;

         //Time since new bullet spawned
         this.born = 0;
     },

     /**
      * Update function
      * 
      * Called with the Scene's update, determines the position of the bullet over time.
      * 
      * @param {number} time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
      * @param {number} delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
      */
      update: function (time, delta) {

         //Updates the position of the bullet with a set speed
         this.x += this.xSpeed * delta;
         this.y += this.ySpeed * delta;

         //Logs how long the bullet has been 'alive' for
         this.born += delta;

         //If the bullet existed for more than 5 seconds, destroys it
         if (this.born > 5000) {
           this.destroy();
       }
   }
});

/**
 * Cheese bullet class
 *
 * Uses a base of Phaser.GameObject.Image class to act like a sprite with customized routines and variables
 *
 */
var cheeseBullets = new Phaser.Class({
    
    //Calling of the Phaser.GameObject.Image class to inherit of its sprite properties
    Extends: Phaser.GameObjects.Image,
    
    /**
     * Initialise function
     *
     * Constructor of the object, gives all its initial settings to the object when summoned.
     *
     * @param {Phaser.Scene} scene  Scene to attach the bullet to when created
     */
     initialize: function Bullet(scene) {

        //Calls the pizza sprite and assigns it to itself, placed on the scene at coordinates x: 0 and y: 0
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'cheeseBullet');
        
        //Sets the layer at which the sprite is to 1 in order to appear on top of the background
        this.setDepth(1);
        
        //Sets various variables to make sure no remaining data can interfere with the Zombie when it is created
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;

        //Graphically forces the Zombie to have a set size and make his hitbox follow
        this.setSize(30, 30, true);
        this.setDisplaySize(30,30);
    },

    /**
     * Fire Function
     * 
     * Sets the position and direction of a bullet to go from an object to another when the function if called.
     * The bullet keeps its direction and goes straight without change.
     * 
     * @param {Phaser.GameObjects} shooter Game Object that shot the bullet, determines starting position
     * @param {Phaser.GameObjects} target Game Object that was targetted by the shooter, determines line of propagation of the bullet
     */
     fire: function (shooter, target) {

        //Sets starting position
        this.setPosition(shooter.x, shooter.y); 

        //Sets direction in which the bullet has to go to
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
        //Angle bullet with shooters rotation
        this.rotation = shooter.rotation; 
        
        //Time since new bullet spawned
        this.born = 0; 
    },

    /**
     * Update function
     * 
     * Called with the Scene's update, determines the position of the bullet over time.
     * 
     * @param {number} time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
     * @param {number} delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
     */
     update: function (time, delta) {

        //Updates the position of the bullet with a set speed
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;

        //Logs how long the bullet has been 'alive' for
        this.born += delta;

        //If the bullet existed for more than 5 seconds, destroys it
        if (this.born > 5000) {
            this.destroy();
        }
    }
});

/**
 * Distance Function
 * 
 * Calculates the distance between two points
 * 
 * @param {number} p1X Position on X of the 1st point
 * @param {number} p1Y Position on Y of the 1st point
 * @param {number} p2X Position on X of the 2nd point
 * @param {number} p2Y Position on Y of the 2nd point
 * 
 * @returns {number} Distance between the two points
 */
 function distance(p1X, p1Y, p2X, p2Y){
    return Math.sqrt(Math.pow((p1X - p2X), 2) + Math.pow((p1Y - p2Y), 2));
}