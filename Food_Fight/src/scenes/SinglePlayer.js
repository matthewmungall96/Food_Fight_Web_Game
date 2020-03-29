let singleScene = new Phaser.Scene('Single');

var globalX, globalY;
var singlePlayerScore = 0;
var singlePlayerScoreText;
var highestSinglePlayerScore;
var singlePlayerMusic_;
var zombieSplatNoise;
var zombieDeathNoise;
var pistolSwoosh;

singleScene.preload = function(){
    this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
    this.load.tilemapTiledJSON("map", "./dist/assets/map/map.json");
}

singleScene.create = function(){
    singlePlayerScore = 0;
    this.physics.world.setBounds(0, 0, 1600, 1200);
    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    zombies = this.physics.add.group({ classType: Zombie, runChildUpdate: true});
    this.physics.add.collider(zombies,playerBullets, zombieHitCallback);

    singlePlayerMusic_ = this.sound.add('singlePlayerMusic');
    singlePlayerMusic_.play();

    zombieSplatNoise = this.sound.add('zombieHitNoise');
    zombieDeathNoise = this.sound.add('zombieDeath');
    pistolSwoosh = this.sound.add('pistolSwooshNoise');

    spawnpoints = [
        {x:460, y:224},
        {x:1153,y:220}
    ];

    // Add background player, zombie, reticle, healthpoint sprites
    //var background = this.add.image(800, 600, 'background');
    player = this.physics.add.sprite(800, 1100, 'player1');
    globalX = player.x;
    globalY = player.y;
    singlePlayerScoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    reticle = this.physics.add.sprite(800, 700, 'target');
    hp1 = this.add.image(-350, -250, 'target').setScrollFactor(0.5, 0.5);
    hp2 = this.add.image(-300, -250, 'target').setScrollFactor(0.5, 0.5);
    hp3 = this.add.image(-250, -250, 'target').setScrollFactor(0.5, 0.5);

    // Set image/sprite properties
    //background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
    singlePlayerScoreText.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setDepth(1);
    player.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(1);
    hp1.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp2.setOrigin(0.5, 0.5).setDisplaySize(50, 50);
    hp3.setOrigin(0.5, 0.5).setDisplaySize(50, 50);

    // Set sprite variables
    player.health = 3;
    zombies.lastSpawned = 0;

    if (player.health <= 0)
    {
        playerHasDied()
    }

    // Set camera properties
    this.cameras.main.zoom = 0.5;
    //this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0,60,800,600).setName('main');
    // Creates object for input with WASD kets
    moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'pause': Phaser.Input.Keyboard.KeyCodes.P
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

    this.input.keyboard.on('keydown_P', function (event) {
        clickReturnMenuButton();
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
        //console.log(reticle.x + " " + reticle.y);
        if (bullet)
        {
            pistolSwoosh.play();
            bullet.fire(player, reticle);
            //this.physics.add.collider(zzz, bullet, zombieHitCallback);
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

    //map
    var map = this.make.tilemap({key: 'map'});
    var tiles = map.addTilesetImage('tilesheet_complete');
    map.setBaseTileSize(32, 32);

    //layers
    var top = map.createStaticLayer('top', tiles, 0, 0).setDepth(2).setScale(1.8);
    var mid = map.createStaticLayer('mid', tiles, 0, 0).setDepth(1).setScale(1.8);
    var bot = map.createStaticLayer('bot', tiles, 0, 0).setScale(1.8);

    //collisons
    //map.setCollisionByProperty([478]);

    
    this.physics.add.collider(player, top);
     top.setCollisionByProperty({collides:true});
    
}

function zombieHitCallback(zombieHit, bulletHit)
{
    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true)
    {
        zombieHit.health = zombieHit.health - 1;
        //console.log("zombie hp: ", zombieHit.health);

        // Kill zombie if health <= 0
        if (zombieHit.health <= 0)
        {
           singlePlayerScore += 10;
           singlePlayerScoreText.setText('Score: ' + singlePlayerScore);
           console.log("Player Score: ", singlePlayerScore);
           zombieDeathNoise.play();
           zombieHit.setActive(false).setVisible(false);
        }

        // Destroy bullet
        zombieSplatNoise.play();
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

function playerHasDied(){
    player.setActive(false).setVisible(false);
}
/*
function zombieFire(zombie, player, time, gameObject)
{
    if (zombie.active === false) {
        return;
    }

    if ((time - zombie.lastFired) > 1000) {
        console.log('firing')
        zombie.lastFired = time;

        // Get bullet from bullets group
        var bullet = zombieBullets.get().setActive(true).setVisible(true);

        if (bullet) {
            bullet.fire(zombie, player);
            // Add collider between bullet and player1
            gameObject.physics.add.collider(player, bullet, playerHitCallback);
        }
    }
}*/

function spawnZombies(zombies, player, spawnpoints, time, gameObject) {
    if ((time - zombies.lastSpawned) > 2000){
        zombies.lastSpawned = time;
        //Creation of a zombie
        var zzz = zombies.get().setActive(true).setVisible(true);
        console.log(zzz.health);
        if (zzz) {
            point = Math.floor(Math.random() * spawnpoints.length);
            zzz.go(spawnpoints[point].x, spawnpoints[point].y);
            // Add collider between bullet and player1
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

/*
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
*/


// Ensures reticle does not move offscreen
function constrainReticle(reticle, player) {
    var distX = reticle.x - player.x; // X distance between player & reticle
    var distY = reticle.y - player.y; // Y distance between player & reticle

    // Ensures reticle cannot be moved offscreen (player follow)
    if (distX > 800)
        reticle.x = player.x + 800;
    else if (distX < -800)
        reticle.x = player.x - 800;

    if (distY > 600)
        reticle.y = player.y + 600;
    else if (distY < -600)
        reticle.y = player.y - 600;
}

singleScene.update = function(time, delta){
        globalX = player.x;
        globalY = player.y;
    
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);
    
        //Make reticle move with player
        reticle.body.velocity.x = player.body.velocity.x;
        reticle.body.velocity.y = player.body.velocity.y;
    
        // Constrain velocity of player
        constrainVelocity(player, 500);
    
        // Constrain position of constrainReticle
        //constrainReticle(reticle, player);
        //constrainPlayer(player)
    
        // Make zombie spawn
        spawnZombies(zombies, player, spawnpoints, time, this);

        
}

function clickReturnMenuButton(){
    singlePlayerMusic_.stop(),
    game.scene.stop('Single');
    game.scene.start('Menu');
}

