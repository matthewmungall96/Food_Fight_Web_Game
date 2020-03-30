let multiScene = new Phaser.Scene('Multi');

multiScene.preload = function(){
    
    this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
    this.load.tilemapTiledJSON("map", "./dist/assets/map/map.json");

}

multiScene.create = function(){
   
    this.physics.world.setBounds(0, 0, 1600, 1200);

    // Add 2 groups for Bullet objects
    player1Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    zombieBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    // Add background player, zombie, reticle, healthpoint sprites
    var background = this.add.image(800, 600, 'background');
    zombies = this.physics.add.group({ classType: Zombie, runChildUpdate: true});
    reticle = this.physics.add.sprite(800, 700, 'target');


    // Set image/sprite properties
    zombie.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

    //creates the player 1 entity 
    if (gamePadNo == 1){
        player1 = this.physics.add.sprite(800, 300, 'player1');
        player1.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        player1hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player1hp1Full = this.add.image(100, 100, 'fullBurger');
        player1hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player1hp2Full = this.add.image(200, 100, 'fullBurger');
        player1hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player1hp3Full = this.add.image(300, 100, 'fullBurger');
        player1hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1br0 = this.add.image(400, 100, 'bullet0');
        player1br1 = this.add.image(400, 100, 'bullet1');
        player1br2 = this.add.image(400, 100, 'bullet2');
        player1br3 = this.add.image(400, 100, 'bullet3');
        player1br4 = this.add.image(400, 100, 'bullet4');
        player1br5 = this.add.image(400, 100, 'bullet5');
        player1br6 = this.add.image(400, 100, 'bullet6');
        player1br7 = this.add.image(400, 100, 'bullet7');
        player1br8 = this.add.image(400, 100, 'bullet8');
        player1br9 = this.add.image(400, 100, 'bullet9');
        player1br10 = this.add.image(400, 100, 'bullet9');
        player1br10.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player1br9.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br8.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br7.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br6.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br5.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br4.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br3.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br2.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br1.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1br0.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player1.health = 3;
    }

    //creates the player 2 entity 
    if (gamePadNo == 2){
        player2 = this.physics.add.sprite(800, 300, 'player2');
        player2.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        player2hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player2hp1Full = this.add.image(100, 100, 'fullBurger');
        player2hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player2hp2Full = this.add.image(200, 100, 'fullBurger');
        player2hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player2hp3Full = this.add.image(300, 100, 'fullBurger');
        player2hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2br0 = this.add.image(400, 100, 'bullet0');
        player2br1 = this.add.image(400, 100, 'bullet1');
        player2br2 = this.add.image(400, 100, 'bullet2');
        player2br3 = this.add.image(400, 100, 'bullet3');
        player2br4 = this.add.image(400, 100, 'bullet4');
        player2br5 = this.add.image(400, 100, 'bullet5');
        player2br6 = this.add.image(400, 100, 'bullet6');
        player2br7 = this.add.image(400, 100, 'bullet7');
        player2br8 = this.add.image(400, 100, 'bullet8');
        player2br9 = this.add.image(400, 100, 'bullet9');
        player2br10 = this.add.image(400, 100, 'bullet9');
        player2br10.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player2br9.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br8.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br7.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br6.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br5.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br4.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br3.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br2.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br1.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2br0.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player2.health = 3;
    }

    //creates the player 3 entity 
    if (gamePadNo == 3){
        player3 = this.physics.add.sprite(800, 300, 'player3');
        player3.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        player3hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player3hp1Full = this.add.image(100, 100, 'fullBurger');
        player3hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player3hp2Full = this.add.image(200, 100, 'fullBurger');
        player3hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player3hp3Full = this.add.image(300, 100, 'fullBurger');
        player3hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3br0 = this.add.image(400, 100, 'bullet0');
        player3br1 = this.add.image(400, 100, 'bullet1');
        player3br2 = this.add.image(400, 100, 'bullet2');
        player3br3 = this.add.image(400, 100, 'bullet3');
        player3br4 = this.add.image(400, 100, 'bullet4');
        player3br5 = this.add.image(400, 100, 'bullet5');
        player3br6 = this.add.image(400, 100, 'bullet6');
        player3br7 = this.add.image(400, 100, 'bullet7');
        player3br8 = this.add.image(400, 100, 'bullet8');
        player3br9 = this.add.image(400, 100, 'bullet9');
        player3br10 = this.add.image(400, 100, 'bullet9');
        player3br10.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player3br9.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br8.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br7.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br6.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br5.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br4.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br3.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br2.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br1.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3br0.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player3.health = 3;
    }
    
    //creates the player 4 entity 
    if (gamePadNo == 4){
        player4 = this.physics.add.sprite(800, 300, 'player4');
        player4.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
        player4hp1Empty = this.add.image(100, 100, 'emptyBurger');
        player4hp1Full = this.add.image(100, 100, 'fullBurger');
        player4hp2Empty = this.add.image(200, 100, 'emptyBurger');
        player4hp2Full = this.add.image(200, 100, 'fullBurger');
        player4hp3Empty = this.add.image(300, 100, 'emptyBurger'); 
        player4hp3Full = this.add.image(300, 100, 'fullBurger');
        player4hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4br0 = this.add.image(400, 100, 'bullet0');
        player4br1 = this.add.image(400, 100, 'bullet1');
        player4br2 = this.add.image(400, 100, 'bullet2');
        player4br3 = this.add.image(400, 100, 'bullet3');
        player4br4 = this.add.image(400, 100, 'bullet4');
        player4br5 = this.add.image(400, 100, 'bullet5');
        player4br6 = this.add.image(400, 100, 'bullet6');
        player4br7 = this.add.image(400, 100, 'bullet7');
        player4br8 = this.add.image(400, 100, 'bullet8');
        player4br9 = this.add.image(400, 100, 'bullet9');
        player4br10 = this.add.image(400, 100, 'bullet9');
        player4br10.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
        player4br9.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br8.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br7.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br6.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br5.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br4.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br3.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br2.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br1.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4br0.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
        player4.health = 3;
    }


    //Burger Scaling


    //Beer Images (Used for Bullet Tracking)

    
    //Beer Scaling


    // Set sprite variables

    zombie.health = 3;
    zombie.lastFired = 0;

    // Set camera properties
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(player1);

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

        if (bullet)
        {
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

    var map = this.make.tilemap({key: 'map'});
    var tiles = map.addTilesetImage('tilesheet_complete');

    //layers
    var top = map.createStaticLayer('top', tiles, 0, 0);
    var mid = map.createStaticLayer('mid', tiles, 0, 0);
    var bot = map.createStaticLayer('bot', tiles, 0, 0);
}
/*
function zombieFire(zombie, player1, time, gameObject)
{
    if (zombie.active === false)
    {
        return;
    }

    if ((time - zombie.lastFired) > 1000)
    {
        console.log('firing')
        zombie.lastFired = time;

        // Get bullet from bullets group
        var bullet = zombieBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(zombie, player1);
            // Add collider between bullet and player1
            gameObject.physics.add.collider(player1, bullet, playerHitCallback);
        }
    }
}
*/
multiScene.update = function(time, delta){
        globalX = player1.x;
        globalY = player1.y;
    
        // Rotates player1 to face towards reticle
        player1.rotation = Phaser.Math.Angle.Between(player1.x, player1.y, reticle.x, reticle.y);

        // Rotates zombie to face towards player1
        zombie.rotation = Phaser.Math.Angle.Between(zombie.x, zombie.y, player1.x, player1.y);
    
        //Make reticle move with player1
        reticle.body.velocity.x = player1.body.velocity.x;
        reticle.body.velocity.y = player1.body.velocity.y;
    
        // Constrain velocity of player1
        constrainVelocity(player1, 500);
    
        // Constrain position of constrainReticle
        constrainReticle1(reticle, player1);
        constrainReticle2(reticle, player2);
        constrainReticle3(reticle, player3);
        constrainReticle4(reticle, player4);
        constrainPlayer1(player1);
        constrainPlayer1(player2);
        constrainPlayer1(player3);
        constrainPlayer1(player4);

    
        // Make zombie fire
        zombieFire(zombie, player1, time, this);
        
}

function clickReturnMenuButton(){
    game.scene.getScenes(true).forEach(scene => {
        game.scene.stop(scene);
    });
    
    game.scene.start('Menu');
}

