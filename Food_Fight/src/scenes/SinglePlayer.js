let singleScene = new Phaser.Scene('Single');

var globalX, globalY;

var Zombie = new Phaser.Class({
    initialize: function Zombie(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
        this.speed = 0.1;
        this.direction = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.setPosition(100,100);
    },
    update: function(){
        this.direction = Math.atan((globalX - this.x) / (globalY - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (globalY >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, globalX, globalY);
    }
});

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');
        this.speed = 0.1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 5000)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

singleScene.preload = function(){
    
    this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
    this.load.tilemapTiledJSON("map", "./dist/assets/map/map.json");
    
}

singleScene.create = function(){
   
    this.physics.world.setBounds(0, 0, 1600, 1200);

    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    zombieBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    // Add background player, zombie, reticle, healthpoint sprites
    var background = this.add.image(800, 600, 'background');
    player = this.physics.add.sprite(800, 600, 'player1');
    zombie = this.physics.add.sprite(300, 600, 'enemy');
    reticle = this.physics.add.sprite(800, 700, 'target');
    hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
    hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
    hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);

    // Set image/sprite properties
    background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
    player.setOrigin(-2, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);
    zombie.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);

    // Set sprite variables
    player.health = 3;
    zombie.health = 3;
    zombie.lastFired = 0;

    // Set camera properties
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(player);

    // Creates object for input with WASD kets
    moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
        player.setAccelerationY(-800);
    });
    this.input.keyboard.on('keydown_S', function (event) {
        player.setAccelerationY(800);
    });
    this.input.keyboard.on('keydown_A', function (event) {
        player.setAccelerationX(-800);
    });
    this.input.keyboard.on('keydown_D', function (event) {
        player.setAccelerationX(800);
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_W', function (event) {
        if (moveKeys['down'].isUp)
            player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
        if (moveKeys['right'].isUp)
            player.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            player.setAccelerationX(0);
    });

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(player, reticle);
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
    map.setBaseTileSize(32, 32);

    //layers
    var top = map.createStaticLayer('top', tiles, 0, 0).setDepth(2).setScale(1.8);
    var mid = map.createStaticLayer('mid', tiles, 0, 0).setDepth(1).setScale(1.8);
    var bot = map.createStaticLayer('bot', tiles, 0, 0).setScale(1.8);
    
}

function zombieHitCallback(zombieHit, bulletHit)
{
    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true)
    {
        zombieHit.health = zombieHit.health - 1;
        console.log("zombie hp: ", zombieHit.health);

        // Kill zombie if health <= 0
        if (zombieHit.health <= 0)
        {
           zombieHit.setActive(false).setVisible(false);
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

function playerHitCallback(playerHit, bulletHit)
{
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 1;
        console.log("Player hp: ", playerHit.health);

        // Kill hp sprites and kill player if health <= 0
        if (playerHit.health == 2)
        {
            hp3.destroy();
        }
        else if (playerHit.health == 1)
        {
            hp2.destroy();
        }
        else
        {
            hp1.destroy();
            // Game over state should execute here
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

function zombieFire(zombie, player, time, gameObject)
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
        var zzz = zombieBullets.get().setActive(true).setVisible(true);

        if (zzz)
        {
            // Add collider between zombie and player
            gameObject.physics.add.collider(player, zzz, playerHitCallback);
        }
    }
}

// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity)
{
    if (!sprite || !sprite.body)
      return;

    var angle, currVelocitySqr, vx, vy;
    vx = sprite.body.velocity.x;
    vy = sprite.body.velocity.y;
    currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
    }
}


function constrainPlayer(player) {

    var distX = player.x - 800; // X distance between player & origin point
    var distY = player.y - 600; // Y distance between player & origin point

    var maxX = 100, maxY = 50;

    // Ensures player cannot be moved offscreen (player follow)
    if (distX > 100){
        player.x = 800 + maxX;
        player.setAccelerationX(0);
    }
    else if (distX < -100){
        player.x = 800 - maxX;
        player.setAccelerationX(0);
    }
    if (distY > 50){
        player.y = 600 + maxY;
        player.setAccelerationY(0);
    }
    else if (distY < -50){
        player.y = 600 - maxY;
        player.setAccelerationY(0);
    }
}

singleScene.update = function(time, delta){
        globalX = player.x;
        globalY = player.y;
    
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

        // Rotates zombie to face towards player
        zombie.rotation = Phaser.Math.Angle.Between(zombie.x, zombie.y, player.x, player.y);
    
        //Make reticle move with player
        reticle.body.velocity.x = player.body.velocity.x;
        reticle.body.velocity.y = player.body.velocity.y;
    
        // Constrain velocity of player
        constrainVelocity(player, 500);
    
        // Constrain position of constrainReticle
        constrainReticle(reticle, player);
        //constrainPlayer(player)
    
        // Make zombie fire
        zombieFire(zombie, player, time, this);
        
}

function clickReturnMenuButton(){
    game.scene.getScenes(true).forEach(scene => {
        game.scene.stop(scene);
    });
    
    game.scene.start('Menu');
}

