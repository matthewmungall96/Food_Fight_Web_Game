//
let singleScene = new Phaser.Scene('Single');

//
var singlePlayerMusic_;
var zombieSplatNoise;
var zombieDeathNoise;
var pistolSwoosh;
var emptyGun;

//
var scoreText;

//
var player = null;
var healthpoints = null;
var reticle = null;
var moveKeys = null;
var playerBullets = null;
var zombieBullets = null;

/**
 * 
 */
singleScene.preload = function(){
    this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
    this.load.tilemapTiledJSON("map", "./dist/assets/map/map1.json");
}

/**
 * 
 */
singleScene.create = function(){

    //
    this.physics.world.setBounds(0, 0, 800*2, 600*2);

    //creates animation for explosion 
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion'),
        frameRate: 20,
        repeat: 0,
        hiddenOnComplete: true
    })
    
    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    zombies = this.physics.add.group({ classType: Zombie, runChildUpdate: true});

    //
    this.physics.add.collider(zombies,playerBullets, zombieHitCallback);

    //
    singlePlayerMusic_ = this.sound.add('singlePlayerMusic');
    singlePlayerMusic_.volume = 0.1;
    singlePlayerMusic_.play();

    //
    scoreText = this.add.text(700, 100, 'text', { font: '32px Courier', fill: '#00ff00' }).setDepth(3);

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
    
    //
    spawnpoints = [
    {x:460, y:224},
    {x:1153,y:220}
    ];

    //
    player = this.physics.add.sprite(800, 1000, 'player1');
    this.physics.add.collider(player, zombies, playerHitCallback);
    player.beers = [];
    playersPos.push([player.x, player.y]);
    player.score =0;
    player.highestScore =0;

    //
    explosion = this.physics.add.sprite(400,300,'explosion').setDepth(3).setScale(4).setVisible(false);

    //
    reticle = this.physics.add.sprite(800, 700, 'target');

    //
    playerinfoHolder = this.add.image(200, 1200, 'playerTable');
    playerinfoHolder.setOrigin(0.5, 0.5).setDisplaySize(400, 200).setDepth(3).setVisible(true);
    
    //Burger Images (Used for Health Tracking)
    player.hp1Empty = this.add.image(100, 1200, 'emptyBurger');
    player.hp1Full = this.add.image(100, 1200, 'fullBurger');
    player.hp2Empty = this.add.image(200, 1200, 'emptyBurger');
    player.hp2Full = this.add.image(200, 1200, 'fullBurger');
    player.hp3Empty = this.add.image(300, 1200, 'emptyBurger'); 
    player.hp3Full = this.add.image(300, 1200, 'fullBurger');

    //Burger Scaling
    player.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
    player.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
    player.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
    player.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);
    player.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
    player.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(true);

    //
    for (let i = 0; i < 11; i++) {
        player.beers.push(this.add.image(400, 1200, 'bullet' + i));
        player.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
    }
    //
    player.beers[10].setVisible(true);

    //
    player.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(1).setScale(1);


    // Set sprite variables
    player.health = 3;
    player.currentBullets = 15;
    player.MaxBullets = 15;
    zombies.lastSpawned = 0;

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
        'reload': Phaser.Input.Keyboard.KeyCodes.R,
        'pause': Phaser.Input.Keyboard.KeyCodes.P
    });

    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
        player.setAccelerationY(-800);
        console.log("w");
    });
    this.input.keyboard.on('keydown_S', function (event) {
        player.setAccelerationY(800);
        console.log("s");
    });
    this.input.keyboard.on('keydown_A', function (event) {
        player.setAccelerationX(-800);
        console.log("a");
    });
    this.input.keyboard.on('keydown_D', function (event) {
        player.setAccelerationX(800); 
        console.log("d");
    });
    
    //
    this.input.keyboard.on('keydown_R', function (event) {
        if (player.currentBullets < 15){
            reloadTime = game.getTime()  + 2000;
            player.currentBullets = player.MaxBullets;
        }
    });

    //
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
        
        //
        if (bullet && player.currentBullets > 0)
        {
            //
            player.currentBullets = player.currentBullets - 1;
            pistolSwoosh.play();
            bullet.fire(player, reticle);
        }

        //
        if (bullet && player.currentBullets == 0){
            emptyGun.play();
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
        if (this.input.mouse.locked && player.active)
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

    //
    this.physics.add.collider(player, top);
    top.setCollisionByProperty({collides:true});
    
    //
    this.interval = setInterval(() => {
        var xhttp;
        var name = 'Test';
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                scoreText.setText("Highest:" + this.responseText + "\nCurrent: " + player.score);
                player.highestScore = parseInt(this.responseText.split(":")[1]);
                console.log(player.highestScore);
            }
        };
        xhttp.open("GET", "get.php?name=" + name, true);
        xhttp.send();
    }, 1000);
}

/**
 * 
 * @param {*} zombieHit 
 * @param {*} bulletHit 
 */
function zombieHitCallback(zombieHit, bulletHit)
{
    
    // Reduce health of zombie
    if (bulletHit.active === true && zombieHit.active === true)
    {
        //
        if (player.currentBullets > 0){
            zombieHit.health = zombieHit.health - 1;
        }

        //
        if (zombieHit.health <= 0)
        {
            //
            player.score += 10;
            
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
 * @param {*} playerHit 
 * @param {*} bulletHit 
 */
function playerHitCallback(playerHit, bulletHit)
{
    //
    if (bulletHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 1;

        //
        if (playerHit.health == 2)
        {
            playerHit.hp3Empty.setVisible(true);
            playerHit.hp3Full.setVisible(false);
        }
        //
        else if (playerHit.health == 1)
        {
            playerHit.hp2Empty.setVisible(true);
            playerHit.hp2Full.setVisible(false);
        }
        //
        else
        {
            playerHit.hp1Empty.setVisible(true);
            playerHit.hp1Full.setVisible(false);

            //
            if (playerHit.score > playerHit.highestScore){

            //
            var xhttp;
            var name = 'Test';
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    scoreText.setText("highest:"+this.responseText + "\nCurrent: "+player.score);
                }
            };
            xhttp.open("POST", "post.php?name=" + name + "&score="+ player.score, true);
            xhttp.send();
        }
            playerHit.setActive(false);
            playersPos.forEach(p =>{
                if (distance(p[0], p[1], playerHit.x, playerHit.y) <= 5){
                    playersPos = playersPos.filter(entry => entry[0] != playerHit.x)
                }
            });
    }

        //
        clearTimeout(this.interval);

        // Destroy bullet
        bulletHit.destroy();
    }
}

/**
 * 
 */
function playerHasDied(){
    player.setActive(false).setVisible(false);
    playersPos[0] = null;
}

/**
 * 
 * @param {*} zombies 
 * @param {*} spawnpoints 
 * @param {*} time 
 */
function spawnZombies(zombies, spawnpoints, time) {
    //
    if ((time - zombies.lastSpawned && playersPos.length > 0) > 2000){
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

/**
 * 
 * @param {*} sprite 
 * @param {*} maxVelocity 
 */
function constrainVelocity(sprite, maxVelocity)
{
    //
    if (!sprite || !sprite.body)
      return;
//
  var angle, currVelocitySqr, vx, vy;
  
  //
  vx = sprite.body.velocity.x;
  vy = sprite.body.velocity.y;

  //
  currVelocitySqr = vx * vx + vy * vy;

  //
  if (currVelocitySqr > maxVelocity * maxVelocity)
  {
    angle = Math.atan2(vy, vx);
    vx = Math.cos(angle) * maxVelocity;
    vy = Math.sin(angle) * maxVelocity;
    sprite.body.velocity.x = vx;
    sprite.body.velocity.y = vy;
}
}

/**
 * 
 * @param {*} reticle 
 * @param {*} player 
 */
function constrainReticle(reticle, player) {
    // X distance between player & reticle
    var distX = reticle.x - player.x; 
    // Y distance between player & reticle
    var distY = reticle.y - player.y; 

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

/**
 * 
 */
singleScene.update = function(time, delta){
    if (player.active)
            playersPos[0] = [player.x, player.y];
    
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);
        
        //Make reticle move with player
        reticle.body.velocity.x = player.body.velocity.x;
        reticle.body.velocity.y = player.body.velocity.y;
        
        // Constrain velocity of player
        constrainVelocity(player, 500);
        
        // Make zombie spawn
        spawnZombies(zombies, spawnpoints, time);

        //
        switch (player.currentBullets) {

            case 0:
            player.beers[10].setVisible(false);
            player.beers[0].setVisible(true);
            break;

            case 1:
            player.beers[1].setVisible(false);
            player.beers[0].setVisible(true);
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

/**
 * 
 */
    function clickReturnMenuButton(){
        //
        singlePlayerMusic_.stop();
        //
        game.scene.stop('Single');
        game.scene.start('Menu');
    }
