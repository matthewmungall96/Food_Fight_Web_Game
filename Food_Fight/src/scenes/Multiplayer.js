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
    player1 = this.physics.add.sprite(800, 600, 'player1');
    player2 = this.physics.add.sprite(800, 500, 'player2');
    player3 = this.physics.add.sprite(800, 400, 'player3');
    player4 = this.physics.add.sprite(800, 300, 'player4');
    zombie = this.physics.add.sprite(300, 600, 'enemy');
    reticle = this.physics.add.sprite(800, 700, 'target');
    hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
    hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
    hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);

    // Set image/sprite properties
    background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
    player1.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
    player2.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
    player3.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
    player4.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
    zombie.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);

    // Set sprite variables
    player1.health = 3;
    player2.health = 3;
    player3.health = 3;
    player4.health = 3;
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
        constrainReticle(reticle, player1);
        constrainReticle(reticle, player2);
        constrainReticle(reticle, player3);
        constrainReticle(reticle, player4);
        constrainPlayer(player1);
    
        // Make zombie fire
        zombieFire(zombie, player1, time, this);
        
}

function clickReturnMenuButton(){
    game.scene.getScenes(true).forEach(scene => {
        game.scene.stop(scene);
    });
    
    game.scene.start('Menu');
}

