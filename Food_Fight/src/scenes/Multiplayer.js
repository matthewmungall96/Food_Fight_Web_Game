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
    
    //
    player1Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    player2Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    player3Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    player4Bullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    
    //
    this.physics.add.collider(zombies,player1Bullets, zombieHitCallback);
    this.physics.add.collider(zombies,player2Bullets, zombieHitCallback);
    this.physics.add.collider(zombies,player3Bullets, zombieHitCallback);
    this.physics.add.collider(zombies,player4Bullets, zombieHitCallback);

    // Add background player, zombie, reticle, healthpoint sprites
    reticle = this.physics.add.sprite(800, 700, 'target');

    // Set image/sprite properties
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

    //creates the player 1 entity 
    if (controllers.length >= 1){
        //
        player1 = this.physics.add.sprite(800, 300, 'player1');
        player1.isOn = true;
        player1.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        
        //
        player1hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player1hp1Full = this.add.image(100, 100, 'fullBurger');
        player1hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player1hp2Full = this.add.image(200, 100, 'fullBurger');
        player1hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player1hp3Full = this.add.image(300, 100, 'fullBurger');
        
        //
        player1hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        
        //
        player1.beers = [];
        for (let i = 0; i < 11; i++) {
            player1.beers.push(this.add.image(400,100,'bullet'+i));
            player1.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player1.beers[10].setVisible(true);
        
        //
        player1.health = 3;
    }

    //creates the player 2 entity 
    if (controllers.length >= 2){
        //
        player2 = this.physics.add.sprite(800, 300, 'player2');
        player2.isOn = true;
        player2.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        
        //
        player2hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player2hp1Full = this.add.image(100, 100, 'fullBurger');
        player2hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player2hp2Full = this.add.image(200, 100, 'fullBurger');
        player2hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player2hp3Full = this.add.image(300, 100, 'fullBurger');
        
        //
        player2hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        
        //
        player2.beers = [];
        for (let i = 0; i < 11; i++) {
            player2.beers.push(this.add.image(400,100,'bullet'+i));
            player2.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player2.beers[10].setVisible(true);
        
        //
        player2.health = 3;
    }

    //creates the player 3 entity 
    if (controllers.length >= 3){
    	//
        player3 = this.physics.add.sprite(800, 300, 'player3');
        player3.isOn = true;
        player3.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        
        //
        player3hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player3hp1Full = this.add.image(100, 100, 'fullBurger');
        player3hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player3hp2Full = this.add.image(200, 100, 'fullBurger');
        player3hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player3hp3Full = this.add.image(300, 100, 'fullBurger');
        
        //
        player3hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        
        //
        player3.beers = [];
        for (let i = 0; i < 11; i++) {
            player3.beers.push(this.add.image(400,100,'bullet'+i));
            player3.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player3.beers[10].setVisible(true);
        
        //
        player3.health = 3;
    }
    
    //creates the player 4 entity 
    if (controllers.length >= 4){
    	//
        player4 = this.physics.add.sprite(800, 300, 'player4');
        player4.isOn = true;
        player4.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        
        //
        player4hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player4hp1Full = this.add.image(100, 100, 'fullBurger');
        player4hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player4hp2Full = this.add.image(200, 100, 'fullBurger');
        player4hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player4hp3Full = this.add.image(300, 100, 'fullBurger');
        
        //
        player4hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        
        //
        player4.beers = [];
        for (let i = 0; i < 11; i++) {
            player4.beers.push(this.add.image(400,100,'bullet'+i));
            player4.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        }

        //
        player4.beers[10].setVisible(true);
        
        //
        player4.health = 3;
    }


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

    // Fires bullet from player1 on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
    	if (player1.active === false)
    		return;

        // Get bullet from bullets group
        var bullet = player1Bullets.get().setActive(true).setVisible(true);

        //
        if (bullet)
        {
            //
            bullet.fire(player1, reticle);
            this.physics.add.collider(zombie, bullet, zombieHitCallback);
        }
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

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
    	if (this.input.mouse.locked)
    	{
    		reticle.x += pointer.movementX;
    		reticle.y += pointer.movementY;
    	}
    }, this);

    //
    var map = this.make.tilemap({key: 'map'});
    var tiles = map.addTilesetImage('tilesheet_complete');
    map.setBaseTileSize(32, 32);

    //layers
    var top = map.createStaticLayer('top', tiles, 0, 0).setDepth(2).setScale(1.8);
    var mid = map.createStaticLayer('mid', tiles, 0, 0).setDepth(1).setScale(1.8);
    var bot = map.createStaticLayer('bot', tiles, 0, 0).setScale(1.8);
}

multiScene.update = function(time, delta){
    //
    if (player1) {
        playersPos[0] = [player1.x, player1.y];
    }
    if (player2) {
        playersPos[1] = [player2.x, player2.y];
    }
    if (player3) {
        playersPos[2] = [player3.x, player3.y];
    }
    if (player4) {
        playersPos[3] = [player4.x, player4.y];
    }
    
        // Rotates player1 to face towards reticle
        player1.rotation = Phaser.Math.Angle.Between(player1.x, player1.y, reticle.x, reticle.y);
        
        //Make reticle move with player1
        reticle.body.velocity.x = player1.body.velocity.x;
        reticle.body.velocity.y = player1.body.velocity.y;
        
        // Constrain velocity of player1
        constrainVelocity(player1, 500);
        
        // Constrain position of constrainReticle
        switch (controllers.length) {
        	case 1:
        	constrainReticle(reticle, player1);
            break;
            
            case 2:
            constrainReticle(reticle, player2);
            break;
            
            case 3:
            constrainReticle(reticle, player3);
            break;
            
            case 4:
            constrainReticle(reticle, player4);
            break;
            
            default:
            break;
        }

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
      player.beers[0].setVisible(false);
      player.beers[10].setVisible(true);
      break;

      case 1:
      break;
      
      case 2:
      player.beers[2].setVisible(false);
      player.beers[1].setVisible(true);
      break;
      
      case 3:
      player.beers[3].setVisible(false);
      player.beers[2].setVisible(true);
      break;
      
      case 4:
      player.beers[4].setVisible(false);
      player.beers[3].setVisible(true);
      break;
      
      case 5:
      player.beers[5].setVisible(false);
      player.beers[4].setVisible(true);
      break;
      
      case 7:
      player.beers[6].setVisible(false);
      player.beers[5].setVisible(true);
      break;
      
      case 9:
      player.beers[7].setVisible(false);
      player.beers[6].setVisible(true);
      break;
      
      case 11:
      player.beers[8].setVisible(false);
      player.beers[7].setVisible(true);
      break;
      
      case 13:
      player.beers[9].setVisible(false);
      player.beers[8].setVisible(true);
      break;
      
      case 15:
      player.beers[10].setVisible(false);
      player.beers[9].setVisible(true);
      break;


      default:
      break;

  }
}

