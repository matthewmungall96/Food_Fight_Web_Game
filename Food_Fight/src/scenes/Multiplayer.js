//Creation of the scene object
let multiScene = new Phaser.Scene('Multi');

//global variables that hold an array of the different controllers and eadh player individually
var controllers =[];
var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;

/**
 * Preload Funtion
 * 
 * Imports the tilesheet and map objects to the scene to display the scene's own level
 */
 multiScene.preload = function(){
   
   this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
   this.load.tilemapTiledJSON("map2", "./dist/assets/map/map2.json");
 }

/**
 * Create function
 * 
 * Starts when the scene's preloads are finished, sets up all the content of the scene and the listeners for events associated with this scene.
 */
 multiScene.create = function(){
   
   //Defines the limits of the canvas where the objects can be brough at
   this.physics.world.setBounds(0, 0, 800*2, 600*2);

   //Creates a group that will hold the zombies and resets the value that shows when has the last zombie spawned at
   zombies = this.physics.add.group({ classType: Zombie, runChildUpdate: true});
   zombies.lastSpawned = 0;

   //Creates a group to hold each player's bullets individually
   player1Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
   player2Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
   player3Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
   player4Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
   
   //Adds the four groups to the physics rules, making their collisions with the zombies trigger the zombieHitCallback function associated with the corresponding player
   this.physics.add.collider(zombies,player1Bullets, zombieHitCallback1);
   this.physics.add.collider(zombies,player2Bullets, zombieHitCallback2);
   this.physics.add.collider(zombies,player3Bullets, zombieHitCallback3);
   this.physics.add.collider(zombies,player4Bullets, zombieHitCallback4);

   //Resets the value that shows when has the last bullet been shot at for each player
   player1Bullets.lastFired = 0;
   player2Bullets.lastFired = 0;
   player3Bullets.lastFired = 0;
   player4Bullets.lastFired = 0;

   //Initialises the value that printes the scores 
   scoreText = this.add.text(640, 100, 'Scores  ', { font: '32px Courier', fill: '#00ff00' }).setDepth(3);

   //Generates an animation stored in the scene for the explosion tileset 
   this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('explosion'),
    frameRate: 20,
    repeat: 0,
    hiddenOnComplete: true
  })

   //Creates an animated sprite using the previously generated animation and hides it
   explosion = this.physics.add.sprite(400, 300, 'explosion').setDepth(3).setScale(4).setVisible(false);

   //Initializes all the sounds of the scene
   zombieSplatNoise = this.sound.add('zombieHitNoise');
   zombieDeathNoise = this.sound.add('zombieDeath');
   pistolSwoosh = this.sound.add('pistolSwooshNoise');
   emptyGun = this.sound.add('emptyGun');

   //Sets the volume of all the sounds to 30% of their track's volume
   zombieSplatNoise.volume = 0.3;
   zombieDeathNoise.volume = 0.3;
   pistolSwoosh.volume = 0.3;
   emptyGun.volume = 0.3;

   //Adds the four reticles controlled by the different players into the scene
   reticle1 = this.physics.add.sprite(800, 700, 'target1');
   reticle2 = this.physics.add.sprite(800, 700, 'target2');
   reticle3 = this.physics.add.sprite(800, 700, 'target3');
   reticle4 = this.physics.add.sprite(800, 700, 'target4');

   //Sets the size, position, position point and layer at which the reticles should be at and hides them
   reticle1.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(3).setVisible(false);
   reticle2.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(3).setVisible(false);
   reticle3.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(3).setVisible(false);
   reticle4.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(3).setVisible(false);

   //Registers the different locations at which the zombies can be made spawning at
   spawnpoints = [
   { x: 76, y: 404 },
   { x: 464, y: 145 },
   { x: 1155, y: 145 },
   { x: 1503, y: 404 }
   ];

   //Set camera properties
   this.cameras.main.zoom = 0.5;
   this.cameras.main.setBounds(0, 60, 800, 600).setName('main');

   //Adds the ability for the player to pause the current scene
   this.input.keyboard.on('keydown_P', function (event) {
     goOnPause(null, this.scene.sys.config);
   });

   //Pointer lock will only work after mousedown
   game.canvas.addEventListener('mousedown', function () {
   	game.input.mouse.requestPointerLock();
   });

   // Exit pointer lock when Q or escape (by default) is pressed.
   this.input.keyboard.on('keydown_Q', function (event) {
   	if (game.input.mouse.locked)
   		game.input.mouse.releasePointerLock();
   }, 0, this);

//When a gamepad has a key pressed, reacts with some code
this.input.gamepad.on('down', function (pad, button, index) {

   //If the gamepad has no instances logged into the controllers array and if the array contains less than 4 controllers
   if (!controllers.find(c => c.pad.index == pad.pad.index) && controllers.length <= 4) {
      //Adds the triggering controller to the array
      controllers.push(pad);
    }
   //Updates the scene notifying the scene and the controllers object
   addPlayer(controllers, this.scene);
 });

   //Creates the map object using the tilesheet
   var map = this.make.tilemap({key: 'map2'});
   var tiles = map.addTilesetImage('tilesheet_complete');
   map.setBaseTileSize(32, 32);

   //Sets the tifferent layers of the map using the tilesheet and map created above
   var top = map.createStaticLayer('top', tiles, 0, 0).setDepth(2).setScale(1.8);
   var mid = map.createStaticLayer('mid', tiles, 0, 0).setDepth(1).setScale(1.8);
   var bot = map.createStaticLayer('bot', tiles, 0, 0).setScale(1.8);
 }

/**
 * Spawn Zombies Multiplayer variant
 * 
 * Makes a zombie spawn at set interval of time as long as a player still is alive (simulated by the size of the playerPos object)
 * 
 * @param {Phaser.Group} zombiesGroup Group in which the new zombie has to be stored in
 * @param {Array} spawnpoints List of points at which the zombies can appear at on the map
 * @param {number} time Variable from the update function, used to time the appearing of the new zombie
 */
 function spawnZombiesMulti(zombiesGroup, spawnpoints, time) {
   //If the last zombie has been spawned more than half a second ago and if there is still a player alive
   if ((time - zombiesGroup.lastSpawned) > 500 && playersPos.length > 0){

      //Resets the timer at which the last zombie spawned to current time
      zombiesGroup.lastSpawned = time;

      //Creation of a zombie
      var zzz = zombiesGroup.get().setActive(true).setVisible(true).setDepth(2);

      //If the zombie has successfully been created
      if (zzz) {

     //Selects a random index fitting in the spawnpoint list and sends the new zombie to that location
     point = Math.floor(Math.random() * spawnpoints.length);
     zzz.go(spawnpoints[point].x, spawnpoints[point].y);

   }
 }
}

/**
 * Update funtion
 * 
 * Called on each new frame calculated
 * 
 * @param {number} time Time of the computer
 * @param {number} delta Time that passed since previous frame
 */
 multiScene.update = function(time, delta){

   //If the matching player exists on the scene (if a controller has been connected to control it), logs its coordinates, updates its rotation to his reticle and updates it's 'beer'
   if (player1 && player1.active) {
    playersPos[0] = [player1.x, player1.y];
    player1.rotation = Phaser.Math.Angle.Between(player1.x, player1.y, reticle1.x, reticle1.y);
    updateBeers(player1);
  }
  if (player2 && player2.active) {
    playersPos[1] = [player2.x, player2.y];
    player2.rotation = Phaser.Math.Angle.Between(player2.x, player2.y, reticle2.x, reticle2.y);
    updateBeers(player2);
  }
  if (player3 && player3.active) {
    playersPos[2] = [player3.x, player3.y];
    player3.rotation = Phaser.Math.Angle.Between(player3.x, player3.y, reticle3.x, reticle3.y);
    updateBeers(player3);
  }
  if (player4 && player4.active) {
    playersPos[3] = [player4.x, player4.y];
    player4.rotation = Phaser.Math.Angle.Between(player4.x, player4.y, reticle4.x, reticle4.y);
    updateBeers(player4);
  }
  
//Controller #1
  if(controllers.length >= 1){
      //If the controller's left stick is out of the set dead zone (set at 20% of the total range), moves the player's reticle in this direction
      if (controllers[0].axes[0].value >= 0.2 || controllers[0].axes[0].value <= -0.2){
        reticle1.x += ( controllers[0].axes[0].value * delta);
      }
      if (controllers[0].axes[1].value >= 0.2 || controllers[0].axes[1].value <= -0.2) {
       reticle1.y += (controllers[0].axes[1].value * delta);
     }

     //If the controller's A button is pressed, shoots a bullet

     //Verifies that the player still exists and that it's not too soon to fire again
     if (controllers[0].A){
       if (player1 && player1.active && ((time - player1Bullets.lastFired) > 100)){//Resets the timer for the player to shoot to current time

         player1Bullets.lastFired = time;
     // Get bullet from bullets group
     var bullet = player1Bullets.get().setActive(true).setVisible(true);
      //If the bullet has successfully been created and if the player still has pellets to shoot
     
     if (bullet && player1.currentBullets > 0)
     //Decrements 1 to the player's loader and plays sound
     player1.currentBullets = player1.currentBullets - 1;
     pistolSwoosh.play();

     //Calls the fire function of the bullet's class to move toward the point at which the reticle was
     bullet.fire(player1, reticle1);
   }
      //If the player has no more pellets to shoot, plays an empty gun sound
     if (bullet && player1.currentBullets == 0) {
       emptyGun.play();
       bullet.destroy();
     }
   }

//If the controller's X button is pressed
if(controllers[0].X){
   //If the player didn't have his max ammount of bullets left
   if(player1.currentBullets<15){
   //Refills available bullet count
     player1.currentBullets = 15;
   }
 }
  }
//Controller #2
if(controllers.length >= 2){
     //If the controller's left stick is out of the set dead zone (set at 20% of the total range), moves the player's reticle in this direction
     if (controllers[1].axes[0].value >= 0.2 || controllers[1].axes[0].value <= -0.2){
      reticle2.x += ( controllers[1].axes[0].value * delta);
    }
    if (controllers[1].axes[1].value >= 0.2 || controllers[1].axes[1].value <= -0.2) {
     reticle2.y += (controllers[1].axes[1].value * delta);
   }

   //If the controller's A button is pressed, shoots a bullet
   if (controllers[1].A){
      //Verifies that the player still exists and that it's not too soon to fire again
     if (player2 && player2.active && ((time - player2Bullets.lastFired) > 100)){
       //Resets the timer for the player to shoot to current time
       player2Bullets.lastFired = time;

     // Get bullet from bullets group
     var bullet = player2Bullets.get().setActive(true).setVisible(true);
     
     //If the bullet has successfully been created and if the player still has pellets to shoot
     if (bullet && player2.currentBullets > 0) {
     
      //Decrements 1 to the player's loader and plays sound
     player2.currentBullets = player2.currentBullets - 1;
     pistolSwoosh.play();

     //Calls the fire function of the bullet's class to move toward the point at which the reticle was
     bullet.fire(player2, reticle2);
   }
   
     //If the player has no more pellets to shoot, plays an empty gun sound
     if (bullet && player2.currentBullets == 0) {
       emptyGun.play();
       bullet.destroy();
     }
   }
 }
 //If the controller's X button is pressed
 if(controllers[1].X){
    //If the player didn't have his max ammount of bullets left
   if (player2.currentBullets < 15) {
      //Refills available bullet count
     player2.currentBullets = 15;
   }
 }
}
//Controller #3
if(controllers.length >= 3){
     //If the controller's left stick is out of the set dead zone (set at 20% of the total range), moves the player's reticle in this direction
     if (controllers[2].axes[0].value >= 0.2 || controllers[2].axes[0].value <= -0.2){
      reticle3.x += ( controllers[1].axes[0].value * delta);
    }
    if (controllers[2].axes[1].value >= 0.2 || controllers[2].axes[1].value <= -0.2) {
     reticle3.y += (controllers[1].axes[1].value * delta);
   }

   //If the controller's A button is pressed, shoots a bullet
   if (controllers[2].A){
      //Verifies that the player still exists and that it's not too soon to fire again
     if (player3 && player3.active && ((time - player3Bullets.lastFired) > 100)){
       //Resets the timer for the player to shoot to current time
       player3Bullets.lastFired = time;

     // Get bullet from bullets group
     var bullet = player3Bullets.get().setActive(true).setVisible(true);
     
     //If the bullet has successfully been created and if the player still has pellets to shoot
     if (bullet && player3.currentBullets > 0) {
     
      //Decrements 1 to the player's loader and plays sound
     player3.currentBullets = player3.currentBullets - 1;
     pistolSwoosh.play();

     //Calls the fire function of the bullet's class to move toward the point at which the reticle was
     bullet.fire(player3, reticle3);
   }
   
     //If the player has no more pellets to shoot, plays an empty gun sound
     if (bullet && player3.currentBullets == 0) {
       emptyGun.play();
       bullet.destroy();
     }
   }
 }
 //If the controller's X button is pressed
 if(controllers[2].X){
    //If the player didn't have his max ammount of bullets left
   if (player3.currentBullets < 15) {
      //Refills available bullet count
     player3.currentBullets = 15;
   }
 }
}
//Controller #4
if(controllers.length >= 4){
     //If the controller's left stick is out of the set dead zone (set at 20% of the total range), moves the player's reticle in this direction
     if (controllers[3].axes[0].value >= 0.2 || controllers[3].axes[0].value <= -0.2){
      reticle4.x += ( controllers[3].axes[0].value * delta);
    }
    if (controllers[3].axes[1].value >= 0.2 || controllers[3].axes[1].value <= -0.2) {
     reticle4.y += (controllers[3].axes[1].value * delta);
   }

   //If the controller's A button is pressed, shoots a bullet
   if (controllers[3].A){
      //Verifies that the player still exists and that it's not too soon to fire again
     if (player4 && player4.active && ((time - player4Bullets.lastFired) > 100)){
       //Resets the timer for the player to shoot to current time
       player4Bullets.lastFired = time;

     // Get bullet from bullets group
     var bullet = player4Bullets.get().setActive(true).setVisible(true);
     
     //If the bullet has successfully been created and if the player still has pellets to shoot
     if (bullet && player3.currentBullets > 0) {
     
      //Decrements 1 to the player's loader and plays sound
     player4.currentBullets = player4.currentBullets - 1;
     pistolSwoosh.play();

     //Calls the fire function of the bullet's class to move toward the point at which the reticle was
     bullet.fire(player4, reticle4);
   }
   
     //If the player has no more pellets to shoot, plays an empty gun sound
     if (bullet && player3.currentBullets == 0) {
       emptyGun.play();
       bullet.destroy();
     }
   }
 }
 //If the controller's X button is pressed
 if(controllers[3].X){
    //If the player didn't have his max ammount of bullets left
   if (player4.currentBullets < 15) {
      //Refills available bullet count
     player4.currentBullets = 15;
   }
 }
}

//If at least 2 players are connected and one is still alive, spawn zombies
if (playersPos.length > 0 && controllers.length >= 2)
   spawnZombiesMulti(zombies,spawnpoints,time);
 
}

/**
 * Update beers function
 * 
 * If given a player, will look into the 'loader' of the player and update the sprite visible to the matching beer sprite
 * 
 * @param {Phaser.GameObject} player Player who's beer is to update
 */
 function updateBeers(player){

   //Switch on the value of the currentBullets object, each case shows the correct level and hides the previous state
   switch (player.currentBullets) {
    case 0:
    player.beers[1].setVisible(false);
    player.beers[0].setVisible(true);
    break;

    case 1:
    player.beers[2].setVisible(false);
    player.beers[1].setVisible(true);
    break;
    
    case 2:
    player.beers[3].setVisible(false);
    player.beers[2].setVisible(true);
    break;
    
    case 3:
    player.beers[4].setVisible(false);
    player.beers[3].setVisible(true);
    break;
    
    case 4:
    player.beers[5].setVisible(false);
    player.beers[4].setVisible(true);
    break;
    
    case 5:
    player.beers[6].setVisible(false);
    player.beers[5].setVisible(true);
    break;
    
    case 7:
    player.beers[7].setVisible(false);
    player.beers[6].setVisible(true);
    break;
    
    case 9:
    player.beers[8].setVisible(false);
    player.beers[7].setVisible(true);
    break;
    
    case 11:
    player.beers[9].setVisible(false);
    player.beers[8].setVisible(true);
    break;
    
    case 13:
    player.beers[10].setVisible(false);
    player.beers[9].setVisible(true);
    break;
    
    case 15:
    player.beers[10].setVisible(true);
    player.beers[0].setVisible(false);
    break;


    default:
    break;

  }
}

/**
 * Zombie hit callback function for player 1
 * 
 * Handles what happens when a zombie is colliding with a bullet shot by the player 1
 * 
 * @param {Phaser.GameObject} zombieHit Zombie that has been touched
 * @param {Phaser.GameObject} bulletHit Bullet that hit the zombie
 */
 function zombieHitCallback1(zombieHit, bulletHit) {

   //If both the zombie and the bullet are still active
   if (bulletHit.active === true && zombieHit.active === true) {
      //Reduces the zombie's health by 1
      zombieHit.health = zombieHit.health - 1;

      //If the zombie runs out of health
      if (zombieHit.health <= 0) {
         //Award Player 1 with 10 points
         player1.score += 10;

         //Plays a death sound
         zombieDeathNoise.play();

         //Moves the explosion sprite at the zombie's position and plays the animation
         explosion.setVisible(true);
         explosion.setPosition(zombieHit.x, zombieHit.y);
         explosion.play('explode');

         //Destroys the zombie object
         zombieHit.destroy();
      }

      //Updates the score text object
      scoreText = "";
      if (player1) {
         scoreText += " P1:" + player1.score
      }
      if (player2) {
         scoreText += " P2:" + player2.score
      }
      if (player3) {
         scoreText += " P3:" + player3.score
      }
      if (player4) {
         scoreText += " P4:" + player4.score
      }

      //Plays the zombie splattered sound
      zombieSplatNoise.play();

      //Destroys the bullet
      bulletHit.destroy();
    }
  }

/**
 * Zombie hit callback function for player 2
 *
 * Handles what happens when a zombie is colliding with a bullet shot by the player 2
 * 
 * @param {Phaser.GameObject} zombieHit Zombie that has been touched
 * @param {Phaser.GameObject} bulletHit Bullet that hit the zombie
 */
 function zombieHitCallback2(zombieHit, bulletHit) {

    //If both the zombie and the bullet are still active
    if (bulletHit.active === true && zombieHit.active === true) {
       //Reduces the zombie's health by 1
       zombieHit.health = zombieHit.health - 1;

       //If the zombie runs out of health
       if (zombieHit.health <= 0) {
          //Award Player 1 with 10 points
          player2.score += 10;

          //Plays a death sound
          zombieDeathNoise.play();

          //Moves the explosion sprite at the zombie's position and plays the animation
          explosion.setVisible(true);
          explosion.setPosition(zombieHit.x, zombieHit.y);
          explosion.play('explode');

          //Destroys the zombie object
          zombieHit.destroy();
       }

       //Updates the score text object
       scoreText = "";
       if (player1) {
          scoreText += " P1:" + player1.score
       }
       if (player2) {
          scoreText += " P2:" + player2.score
       }
       if (player3) {
          scoreText += " P3:" + player3.score
       }
       if (player4) {
          scoreText += " P4:" + player4.score
       }

       //Plays the zombie splattered sound
       zombieSplatNoise.play();

       //Destroys the bullet
       bulletHit.destroy();
    }
  }

/**
 * Zombie hit callback function for player 3
 *
 * Handles what happens when a zombie is colliding with a bullet shot by the player 3
 * 
 * @param {Phaser.GameObject} zombieHit Zombie that has been touched
 * @param {Phaser.GameObject} bulletHit Bullet that hit the zombie
 */
 function zombieHitCallback3(zombieHit, bulletHit) {

    //If both the zombie and the bullet are still active
    if (bulletHit.active === true && zombieHit.active === true) {
       //Reduces the zombie's health by 1
       zombieHit.health = zombieHit.health - 1;

       //If the zombie runs out of health
       if (zombieHit.health <= 0) {
          //Award Player 1 with 10 points
          player3.score += 10;

          //Plays a death sound
          zombieDeathNoise.play();

          //Moves the explosion sprite at the zombie's position and plays the animation
          explosion.setVisible(true);
          explosion.setPosition(zombieHit.x, zombieHit.y);
          explosion.play('explode');

          //Destroys the zombie object
          zombieHit.destroy();
       }

       //Updates the score text object
       scoreText = "";
       if (player1) {
          scoreText += " P1:" + player1.score
       }
       if (player2) {
          scoreText += " P2:" + player2.score
       }
       if (player3) {
          scoreText += " P3:" + player3.score
       }
       if (player4) {
          scoreText += " P4:" + player4.score
       }

       //Plays the zombie splattered sound
       zombieSplatNoise.play();

       //Destroys the bullet
       bulletHit.destroy();
    }
  }

/**
 * Zombie hit callback function for player 4
 *
 * Handles what happens when a zombie is colliding with a bullet shot by the player 4
 * 
 * @param {Phaser.GameObject} zombieHit Zombie that has been touched
 * @param {Phaser.GameObject} bulletHit Bullet that hit the zombie
 */
 function zombieHitCallback4(zombieHit, bulletHit) {

    //If both the zombie and the bullet are still active
    if (bulletHit.active === true && zombieHit.active === true) {
       //Reduces the zombie's health by 1
       zombieHit.health = zombieHit.health - 1;

       //If the zombie runs out of health
       if (zombieHit.health <= 0) {
          //Award Player 1 with 10 points
          player4.score += 10;

          //Plays a death sound
          zombieDeathNoise.play();

          //Moves the explosion sprite at the zombie's position and plays the animation
          explosion.setVisible(true);
          explosion.setPosition(zombieHit.x, zombieHit.y);
          explosion.play('explode');

          //Destroys the zombie object
          zombieHit.destroy();
       }

       //Updates the score text object
       scoreText = "";
       if (player1) {
          scoreText += " P1:" + player1.score
       }
       if (player2) {
          scoreText += " P2:" + player2.score
       }
       if (player3) {
          scoreText += " P3:" + player3.score
       }
       if (player4) {
          scoreText += " P4:" + player4.score
       }

       //Plays the zombie splattered sound
       zombieSplatNoise.play();

       //Destroys the bullet
       bulletHit.destroy();
    }
  }


  /**
   * Add player function
   * 
   * For each connected controller, generates a new player avatar and logs it on the scene
   * 
   * @param {Array} controllerArray Array that stores the controllers that the players will use to play
   * @param {Phaser.Scene} scene Scene on which the player's avatars should be attached on
   */
  function addPlayer(controllerArray, scene){

   //creates the player 1 entity 
   if (!player1 &&controllerArray.length == 1) {

      //Imports the sprites and positions it
      player1 = scene.physics.add.sprite(295, 965, 'player1');
      player1.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(2);

      //Imports the table for his UI and positions it
      player1infoHolder = scene.add.image(289, 1167, 'playerTable');
      player1infoHolder.setOrigin(0.5, 0.5).setDisplaySize(300, 160).setDepth(3).setVisible(true);

      //Imports the 6 burgers token that represent the full or empty health points of the players
      player1.hp1Empty = scene.add.image(200, 1167, 'emptyBurger');
      player1.hp1Full = scene.add.image(200, 1167, 'fullBurger');
      player1.hp2Empty = scene.add.image(243, 1167, 'emptyBurger');
      player1.hp2Full = scene.add.image(243, 1167, 'fullBurger');
      player1.hp3Empty = scene.add.image(286, 1167, 'emptyBurger');
      player1.hp3Full = scene.add.image(286, 1167, 'fullBurger');

      //Positions the burgers
      player1.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player1.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player1.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false); 
      player1.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player1.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player1.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);

      //Imports the 10 states of the beer sprite that represent the ammunition of the player and positions them
      player1.beers = [];
      for (let i = 0; i < 11; i++) {
       player1.beers.push(scene.add.image(370, 1167, 'bullet' + i));
       player1.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
     }

      //Initializes the visible sprite of the full beer for the full ammunition state
      player1.beers[10].setVisible(true);

      //Initializes the values of health, score and ammunition of the player
      player1.health = 3;
      player1.score = 0;
      player1.currentBullets = 15;

      //Adds to the scene the collision handling of the player with the zombies
      //The PlayerHitCallback function is located in SinglePlayer.js
      scene.physics.add.collider(player1, zombies, playerHitCallback);
      
      //Reveals the reticle to the player
      reticle1.setVisible(true);
    }

   //creates the player 2 entity 
   if (!player2 &&controllerArray.length == 2) {
      //Imports the sprites and positions it
      player2 = scene.physics.add.sprite(638, 965, 'player2');
      player2.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);

      //Imports the table for his UI and positions it
      player2infoHolder = scene.add.image(644, 1167, 'playerTable');
      player2infoHolder.setOrigin(0.5, 0.5).setDisplaySize(300, 160).setDepth(3).setVisible(true);

      //Imports the 6 burgers token that represent the full or empty health points of the players
      player2.hp1Empty = scene.add.image(733, 1167, 'emptyBurger');
      player2.hp1Full = scene.add.image(733, 1167, 'fullBurger');
      player2.hp2Empty = scene.add.image(690, 1167, 'emptyBurger');
      player2.hp2Full = scene.add.image(690, 1167, 'fullBurger');
      player2.hp3Empty = scene.add.image(647, 1167, 'emptyBurger');
      player2.hp3Full = scene.add.image(647, 1167, 'fullBurger');

      //Positions the burgers
      player2.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player2.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player2.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player2.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player2.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player2.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);

      //Imports the 10 states of the beer sprite that represent the ammunition of the player and positions them
      player2.beers = [];
      for (let i = 0; i < 11; i++) {
         player2.beers.push(scene.add.image(563, 1167, 'bullet' + i));
         player2.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
      }

      //Initializes the visible sprite of the full beer for the full ammunition state
      player2.beers[10].setVisible(true);

      //Initializes the values of health, score and ammunition of the player
      player2.health = 3;
      player2.score = 0;
      player2.currentBullets = 15;

      //Adds to the scene the collision handling of the player with the zombies
      //The PlayerHitCallback function is located in SinglePlayer.js
      scene.physics.add.collider(player2, zombies, playerHitCallback);

      //Reveals the reticle to the player
      reticle2.setVisible(true);
    }

   //creates the player 3 entity 
   if (!player3 &&controllerArray.length == 3) {
      //Imports the sprites and positions it
      player3 = scene.physics.add.sprite(981, 965, 'player3');
      player3.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(2);

      //Imports the table for his UI and positions it
      player3infoHolder = scene.add.image(975, 1167, 'playerTable');
      player3infoHolder.setOrigin(0.5, 0.5).setDisplaySize(300, 160).setDepth(3).setVisible(true);

      //Imports the 6 burgers token that represent the full or empty health points of the players
      player3.hp1Empty = scene.add.image(886, 1167, 'emptyBurger');
      player3.hp1Full = scene.add.image(886, 1167, 'fullBurger');
      player3.hp2Empty = scene.add.image(929, 1167, 'emptyBurger');
      player3.hp2Full = scene.add.image(929, 1167, 'fullBurger');
      player3.hp3Empty = scene.add.image(972, 1167, 'emptyBurger');
      player3.hp3Full = scene.add.image(972, 1167, 'fullBurger');

      //Positions the burgers
      player3.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player3.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player3.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player3.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player3.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player3.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);

      //Imports the 10 states of the beer sprite that represent the ammunition of the player and positions them
      player3.beers = [];
      for (let i = 0; i < 11; i++) {
         player3.beers.push(scene.add.image(1056, 1167, 'bullet' + i));
         player3.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
      }

      //Initializes the visible sprite of the full beer for the full ammunition state
      player3.beers[10].setVisible(true);

      //Initializes the values of health, score and ammunition of the player
      player3.health = 3;
      player3.score = 0;
      player3.currentBullets = 15;

      //Adds to the scene the collision handling of the player with the zombies
      //The PlayerHitCallback function is located in SinglePlayer.js
      scene.physics.add.collider(player3, zombies, playerHitCallback);

      //Reveals the reticle to the player
      reticle3.setVisible(true);
    }

   //creates the player 4 entity 
   if (!player4 &&controllerArray.length == 4) {
      //Imports the sprites and positions it
      player4 = scene.physics.add.sprite(1324, 965, 'player4');
      player4.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(2);

      //Imports the table for his UI and positions it
      player4infoHolder = scene.add.image(1330, 1167, 'playerTable');
      player4infoHolder.setOrigin(0.5, 0.5).setDisplaySize(300, 160).setDepth(3).setVisible(true);

      //Imports the 6 burgers token that represent the full or empty health points of the players
      player4.hp1Empty = scene.add.image(1419, 1167, 'emptyBurger');
      player4.hp1Full = scene.add.image(1419, 1167, 'fullBurger');
      player4.hp2Empty = scene.add.image(1376, 1167, 'emptyBurger');
      player4.hp2Full = scene.add.image(1376, 1167, 'fullBurger');
      player4.hp3Empty = scene.add.image(1333, 1167, 'emptyBurger');
      player4.hp3Full = scene.add.image(1333, 1167, 'fullBurger');

      //Positions the burgers
      player4.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player4.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player4.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player4.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);
      player4.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(false);
      player4.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(37.5, 37.5).setDepth(3).setVisible(true);

      //Imports the 10 states of the beer sprite that represent the ammunition of the player and positions them
      player4.beers = [];
      for (let i = 0; i < 11; i++) {
         player4.beers.push(scene.add.image(1249, 1167, 'bullet' + i));
         player4.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
      }

      //Initializes the visible sprite of the full beer for the full ammunition state
      player4.beers[10].setVisible(true);

      //Initializes the values of health, score and ammunition of the player
      player4.health = 3;
      player4.score = 0;
      player4.currentBullets = 15;

      //Adds to the scene the collision handling of the player with the zombies
      //The PlayerHitCallback function is located in SinglePlayer.js
      scene.physics.add.collider(player4, zombies, playerHitCallback);

      //Reveals the reticle to the player
      reticle4.setVisible(true);
  }
}