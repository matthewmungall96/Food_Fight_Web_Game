//
let multiScene = new Phaser.Scene('Multi');

var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;

/**
 * 
 */
 multiScene.preload = function(){
   
   this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
   this.load.tilemapTiledJSON("map", "./dist/assets/map/map2.json");
}

/**
 * 
 */
 multiScene.create = function(){
    
    //
    this.physics.world.setBounds(0, 0, 800*2, 600*2);

    // Add 2 groups for Bullet objects
    zombies = this.physics.add.group({ classType: Zombie, runChildUpdate: true});
    zombies.lastSpawned = 0;

    //
    player1Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    player2Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    player3Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    player4Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    
    //
    this.physics.add.collider(zombies,player1Bullets, zombieHitCallback1);
    this.physics.add.collider(zombies,player2Bullets, zombieHitCallback2);
    this.physics.add.collider(zombies,player3Bullets, zombieHitCallback3);
    this.physics.add.collider(zombies,player4Bullets, zombieHitCallback4);

     player1Bullets.lastFired = 0;
     player2Bullets.lastFired = 0;
     player3Bullets.lastFired = 0;
     player4Bullets.lastFired = 0;

     //
     scoreText = this.add.text(700, 100, '', { font: '32px Courier', fill: '#00ff00' }).setDepth(3);

     //creates animation for explosion 
     this.anims.create({
         key: 'explode',
         frames: this.anims.generateFrameNumbers('explosion'),
         frameRate: 20,
         repeat: 0,
         hiddenOnComplete: true
     })
     //
     explosion = this.physics.add.sprite(400, 300, 'explosion').setDepth(3).setScale(4).setVisible(false);


     //
     zombieSplatNoise = this.sound.add('zombieHitNoise');
     zombieDeathNoise = this.sound.add('zombieDeath');
     pistolSwoosh = this.sound.add('pistolSwooshNoise');
     emptyGun = this.sound.add('emptyGun');

     //
     zombieSplatNoise.volume = 0.3;
     zombieDeathNoise.volume = 0.3;
     pistolSwoosh.volume = 0.3;
     emptyGun.volume = 0.3;



    // Add background player, zombie, reticle, healthpoint sprites
     reticle1 = this.physics.add.sprite(800, 700, 'target1');
     reticle2 = this.physics.add.sprite(800, 700, 'target2');
     reticle3 = this.physics.add.sprite(800, 700, 'target3');
     reticle4 = this.physics.add.sprite(800, 700, 'target4');

    // Set image/sprite properties
    reticle1.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(2).setVisible(false);
     reticle2.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(2).setVisible(false);
     reticle3.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(2).setVisible(false);
     reticle4.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(2).setVisible(false);


    //
     spawnpoints = [
         { x: 76, y: 404 },
         { x: 464, y: 145 },
         { x: 1155, y: 145 },
         { x: 1503, y: 404 }
     ];

        
    


    // Set camera properties
    this.cameras.main.zoom = 0.5;
    //this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 60, 800, 600).setName('main');

    // Creates object for input with WASD kets
    moveKeys = this.input.keyboard.addKeys({
    	'up': Phaser.Input.Keyboard.KeyCodes.W,
    	'down': Phaser.Input.Keyboard.KeyCodes.S,
    	'left': Phaser.Input.Keyboard.KeyCodes.A,
    	'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // Enables movement of player1 with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
    	player1.setAccelerationY(-800);
    });
    this.input.keyboard.on('keydown_S', function (event) {
    	player1.setAccelerationY(800);
    });
    this.input.keyboard.on('keydown_A', function (event) {
    	player1.setAccelerationX(-800);
    });
    this.input.keyboard.on('keydown_D', function (event) {
    	player1.setAccelerationX(800);
    });

    // Stops player1 acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_W', function (event) {
    	if (moveKeys['down'].isUp)
    		player1.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
    	if (moveKeys['up'].isUp)
    		player1.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
    	if (moveKeys['right'].isUp)
    		player1.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
    	if (moveKeys['left'].isUp)
    		player1.setAccelerationX(0);
    });



    this.input.gamepad.on('down', function (pad, button, index) {
        if (controllers.length <= 0)
            controllers[0] = pad;
    }, this);
    
    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
    	game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
    	if (game.input.mouse.locked)
    		game.input.mouse.releasePointerLock();
    }, 0, this);

    

//
this.input.gamepad.on('down', function (pad, button, index) {

    //
    if (!controllers.find(c => c.pad.index == pad.pad.index) && controllers.length <= 4) {
        //
        controllers.push(pad);
        console.log("new controller registered");
    }
    addPlayer(controllers, this.scene);
});


    //
    var map = this.make.tilemap({key: 'map'});
    var tiles = map.addTilesetImage('tilesheet_complete');
    map.setBaseTileSize(32, 32);

    //layers
    var top = map.createStaticLayer('top', tiles, 0, 0).setDepth(2).setScale(1.8);
    var mid = map.createStaticLayer('mid', tiles, 0, 0).setDepth(1).setScale(1.8);
    var bot = map.createStaticLayer('bot', tiles, 0, 0).setScale(1.8);
}

/**
 * 
 * @param {*} zombies 
 * @param {*} spawnpoints 
 * @param {*} time 
 */
function spawnZombiesMulti(zombies, spawnpoints, time) {
    //
    if ((time - zombies.lastSpawned) > 500 && playersPos.length > 0){

        console.log("spawning");
        //
        zombies.lastSpawned = time;

        //Creation of a zombie
        var zzz = zombies.get().setActive(true).setVisible(true).setDepth(2);

        //
        if (zzz) {

            //
            point = Math.floor(Math.random() * spawnpoints.length);
            zzz.go(spawnpoints[point].x, spawnpoints[point].y);

        }
    }
}

multiScene.update = function(time, delta){
    //
    spawnZombiesMulti();

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
        player4.rotation = Phaser.Math.Angle.Between(player4.x, player4.y, reticle4.x, reticle.y);
        updateBeers(player4);
    }
    

    if(controllers.length >= 1){
        if (controllers[0].axes[0].value >= 0.2 || controllers[0].axes[0].value <= -0.2){
            reticle1.x += ( controllers[0].axes[0].value * delta);
        }
        if (controllers[0].axes[1].value >= 0.2 || controllers[0].axes[1].value <= -0.2) {
            reticle1.y += (controllers[0].axes[1].value * delta);
        }

        if (controllers[0].A){
            console.log("P1 A")
            if (player1 && player1.active && ((time - player1Bullets.lastFired) > 100)){
            player1Bullets.lastFired = time;
            // Get bullet from bullets group
            var bullet = player1Bullets.get().setActive(true).setVisible(true);

            //
            if (bullet && player1.currentBullets > 0) {
                //
                player1.currentBullets = player1.currentBullets - 1;
                pistolSwoosh.play();
                bullet.fire(player1, reticle1);
            }

            //
            if (bullet && player1.currentBullets == 0) {
                emptyGun.play();
            }
        }
        }
        if(controllers[0].X){
            if (player1.currentBullets < 15) {
                reloadTime = game.getTime() + 2000;
                player1.currentBullets = 15;
            }
        }
    }
    if(controllers.length >= 2){
       
            if (controllers[1].axes[0].value >= 0.2 || controllers[1].axes[0].value <= -0.2){
                reticle2.x += ( controllers[1].axes[0].value * delta);
            }
            if (controllers[1].axes[1].value >= 0.2 || controllers[1].axes[1].value <= -0.2) {
                reticle2.y += (controllers[1].axes[1].value * delta);
            }
            if (controllers[1].A){
                if (player2 && player2.active && ((time - player2Bullets.lastFired) > 100)){
    
                player2Bullets.lastFired = time;
                // Get bullet from bullets group
                var bullet = player2Bullets.get().setActive(true).setVisible(true);
    
                //
                if (bullet && player2.currentBullets > 0) {
                    //
                    player2.currentBullets = player2.currentBullets - 1;
                    pistolSwoosh.play();
                    bullet.fire(player2, reticle2);
                }
    
                //
                if (bullet && player2.currentBullets == 0) {
                    emptyGun.play();
                }
            }
            }
            if(controllers[1].X){
                if (player2.currentBullets < 15) {
                    reloadTime = game.getTime() + 2000;
                    player2.currentBullets = 15;
                }
            }
        }

    if(controllers.length >= 3){
       
            if (controllers[2].axes[0].value >= 0.2 || controllers[2].axes[0].value <= -0.2){
                reticle3.x += ( controllers[1].axes[0].value * delta);
            }
            if (controllers[2].axes[1].value >= 0.2 || controllers[2].axes[1].value <= -0.2) {
                reticle3.y += (controllers[1].axes[1].value * delta);
            }
            if (controllers[2].A){
                if (player3 && player3.active && ((time - player3Bullets.lastFired) > 100)){
    
                player3Bullets.lastFired = time;
                // Get bullet from bullets group
                var bullet = player3Bullets.get().setActive(true).setVisible(true);
    
                //
                if (bullet && player3.currentBullets > 0) {
                    //
                    player3.currentBullets = player3.currentBullets - 1;
                    pistolSwoosh.play();
                    bullet.fire(player3, reticle3);
                }
    
                //
                if (bullet && player3.currentBullets == 0) {
                    emptyGun.play();
                }
            }
            }
            if(controllers[2].X){
                if (player3.currentBullets < 15) {
                    reloadTime = game.getTime() + 2000;
                    player3.currentBullets = 15;
                }
            }
        }

    if(controllers.length >= 4){
       
            if (controllers[3].axes[0].value >= 0.2 || controllers[3].axes[0].value <= -0.2){
                reticle4.x += ( controllers[3].axes[0].value * delta);
            }
            if (controllers[3].axes[1].value >= 0.2 || controllers[3].axes[1].value <= -0.2) {
                reticle4.y += (controllers[3].axes[1].value * delta);
            }
            if (controllers[3].A){
                if (player4 && player4.active && ((time - player4Bullets.lastFired) > 100)){
    
                player4Bullets.lastFired = time;
                // Get bullet from bullets group
                var bullet = player4Bullets.get().setActive(true).setVisible(true);
    
                //
                if (bullet && player3.currentBullets > 0) {
                    //
                    player4.currentBullets = player4.currentBullets - 1;
                    pistolSwoosh.play();
                    bullet.fire(player4, reticle4);
                }
    
                //
                if (bullet && player3.currentBullets == 0) {
                    emptyGun.play();
                }
            }
            }
            if(controllers[3].X){
                if (player4.currentBullets < 15) {
                    reloadTime = game.getTime() + 2000;
                    player4.currentBullets = 15;
                }
            }
        }
    

    spawnZombiesMulti(zombies,spawnpoints,time);
        
        /*
        // Constrain position of constrainReticle
        switch (controllers.length) {
        	case 1:
        	constrainReticle(reticle1, player1);
            break;
            
            case 2:
            constrainReticle(reticle2, player2);
            break;
            
            case 3:
            constrainReticle(reticle3, player3);
            break;
            
            case 4:
            constrainReticle(reticle4, player4);
            break;
            
            default:
            break;
        }
*/
    }
    
/**
 * 
 */
 function clickReturnMenuButton(){
   game.scene.getScenes(true).forEach(scene => {
      game.scene.stop(scene);
  });
   
   game.scene.start('Menu');
}

/**
 * 
 * @param {*} player 
 */
 function updateBeers(player){
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
 * 
 * @param {*} zombieHit 
 * @param {*} bulletHit 
 */
function zombieHitCallback1(zombieHit, bulletHit) {

    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true) {
        //
        if (player1.currentBullets > 0) {
            zombieHit.health = zombieHit.health - 1;
        }

        //
        if (zombieHit.health <= 0) {
            //
            player1.score += 10;

            //
            zombieDeathNoise.play();

            //
            explosion.setVisible(true);
            explosion.setPosition(zombieHit.x, zombieHit.y);

            //
            explosion.play('explode');

            //
            zombieHit.destroy();
        }

        //
        zombieSplatNoise.play();

        //
        bulletHit.destroy();
    }
}

/**
 * 
 * @param {*} zombieHit 
 * @param {*} bulletHit 
 */
function zombieHitCallback2(zombieHit, bulletHit) {

    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true) {
        //
        if (player2.currentBullets > 0) {
            zombieHit.health = zombieHit.health - 1;
        }

        //
        if (zombieHit.health <= 0) {
            //
            player2.score += 10;

            //
            zombieDeathNoise.play();

            //
            explosion.setVisible(true);
            explosion.setPosition(zombieHit.x, zombieHit.y);

            //
            explosion.play('explode');

            //
            zombieHit.destroy();
        }

        //
        zombieSplatNoise.play();

        //
        bulletHit.destroy();
    }
}

/**
 * 
 * @param {*} zombieHit 
 * @param {*} bulletHit 
 */
function zombieHitCallback3(zombieHit, bulletHit) {

    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true) {
        //
        if (player3.currentBullets > 0) {
            zombieHit.health = zombieHit.health - 1;
        }

        //
        if (zombieHit.health <= 0) {
            //
            player3.score += 10;

            //
            zombieDeathNoise.play();

            //
            explosion.setVisible(true);
            explosion.setPosition(zombieHit.x, zombieHit.y);

            //
            explosion.play('explode');

            //
            zombieHit.destroy();
        }

        //
        zombieSplatNoise.play();

        //
        bulletHit.destroy();
    }
}

/**
 * 
 * @param {*} zombieHit 
 * @param {*} bulletHit 
 */
function zombieHitCallback4(zombieHit, bulletHit) {

    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true) {
        //
        if (player4.currentBullets > 0) {
            zombieHit.health = zombieHit.health - 1;
        }

        //
        if (zombieHit.health <= 0) {
            //
            player4.score += 10;

            //
            zombieDeathNoise.play();

            //
            explosion.setVisible(true);
            explosion.setPosition(zombieHit.x, zombieHit.y);

            //
            explosion.play('explode');

            //
            zombieHit.destroy();
        }

        //
        zombieSplatNoise.play();

        //
        bulletHit.destroy();
    }
}

function addPlayer(controllerArray, scene){


    //creates the player 1 entity 
    if (!player1 &&controllerArray.length == 1) {
        console.log(scene);
        //
        player1 = scene.physics.add.sprite(290, 950, 'player1');
        player1.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(2);

        //
        player1.hp1Empty = scene.add.image(100, 100, 'emptyBurger');
        player1.hp1Full = scene.add.image(100, 100, 'fullBurger');
        player1.hp2Empty = scene.add.image(200, 100, 'emptyBurger');
        player1.hp2Full = scene.add.image(200, 100, 'fullBurger');
        player1.hp3Empty = scene.add.image(300, 100, 'emptyBurger');
        player1.hp3Full = scene.add.image(300, 100, 'fullBurger');

        //
        player1.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);

        //
        player1.beers = [];
        for (let i = 0; i < 11; i++) {
            player1.beers.push(scene.add.image(400, 100, 'bullet' + i));
            player1.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player1.beers[10].setVisible(true);

        //
        player1.health = 3;
        player1.score = 0;
        player1.currentBullets = 15;

        scene.physics.add.collider(player1, zombies, playerHitCallback);
        reticle1.setVisible(true);
    }

    //creates the player 2 entity 
    if (!player2 &&controllerArray.length == 2) {
        //
        player2 = scene.physics.add.sprite(580, 950, 'player2');
        player2.isOn = true;
        player2.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);

        //
        player2.hp1Empty = scene.add.image(100, 100, 'emptyBurger');
        player2.hp1Full = scene.add.image(100, 100, 'fullBurger');
        player2.hp2Empty = scene.add.image(200, 100, 'emptyBurger');
        player2.hp2Full = scene.add.image(200, 100, 'fullBurger');
        player2.hp3Empty = scene.add.image(300, 100, 'emptyBurger');
        player2.hp3Full = scene.add.image(300, 100, 'fullBurger');

        //
        player2.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);

        //
        player2.beers = [];
        for (let i = 0; i < 11; i++) {
            player2.beers.push(scene.add.image(400, 100, 'bullet' + i));
            player2.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player2.beers[10].setVisible(true);

        //
        player2.health = 3;
        player2.score = 0;
        player2.currentBullets = 15;

        scene.physics.add.collider(player2, zombies, playerHitCallback);
        reticle2.setVisible(true);
    }

    //creates the player 3 entity 
    if (!player3 &&controllerArray.length == 3) {
        //
        player3 = scene.physics.add.sprite(860, 950, 'player3');
        player3.isOn = true;
        player3.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);

        //
        player3.hp1Empty = scene.add.image(100, 100, 'emptyBurger');
        player3.hp1Full = scene.add.image(100, 100, 'fullBurger');
        player3.hp2Empty = scene.add.image(200, 100, 'emptyBurger');
        player3.hp2Full = scene.add.image(200, 100, 'fullBurger');
        player3.hp3Empty = scene.add.image(300, 100, 'emptyBurger');
        player3.hp3Full = scene.add.image(300, 100, 'fullBurger');

        //
        player3.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);

        //
        player3.beers = [];
        for (let i = 0; i < 11; i++) {
            player3.beers.push(scene.add.image(400, 100, 'bullet' + i));
            player3.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player3.beers[10].setVisible(true);

        //
        player3.health = 3;
        player3.score = 0;
        player3.currentBullets = 15;

        scene.physics.add.collider(player3, zombies, playerHitCallback);
        reticle3.setVisible(true);
    }

    //creates the player 4 entity 
    if (!player4 &&controllerArray.length == 4) {
        //
        player4 = scene.physics.add.sprite(1150, 950, 'player4');
        player4.isOn = true;
        player4.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);

        //
        player4.hp1Empty = scene.add.image(100, 100, 'emptyBurger');
        player4.hp1Full = scene.add.image(100, 100, 'fullBurger');
        player4.hp2Empty = scene.add.image(200, 100, 'emptyBurger');
        player4.hp2Full = scene.add.image(200, 100, 'fullBurger');
        player4.hp3Empty = scene.add.image(300, 100, 'emptyBurger');
        player4.hp3Full = scene.add.image(300, 100, 'fullBurger');

        //
        player4.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);

        //
        player4.beers = [];
        for (let i = 0; i < 11; i++) {
            player4.beers.push(scene.add.image(400, 100, 'bullet' + i));
            player4.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player4.beers[10].setVisible(true);

        //
        player4.health = 3;
        player4.score = 0;
        player4.currentBullets = 15;

        scene.physics.add.collider(player4, zombies, playerHitCallback);
        reticle4.setVisible(true);
}
}