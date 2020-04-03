//Creation of the Single player scene
let singleScene = new Phaser.Scene('Single');

//Creation of the variables holding the different sounds of the scene
var singlePlayerMusic_;
var zombieSplatNoise;
var zombieDeathNoise;
var pistolSwoosh;
var emptyGun;

//Variable holding the database update
var interv;

//Creation of the variable that holds the scores
var scoreText;

//Creation of the variables that hold the different main objects of the game
var player = null;
var reticle = null;

/**
 * Preload funtion
 * 
 * Imports the tileset and the map that goes in the single player mode
 */
singleScene.preload = function(){
    this.load.image("tilesheet_complete", "./dist/assets/map/tilesheet_complete.png");
    this.load.tilemapTiledJSON("map", "./dist/assets/map/map1.json");
}

/**
 * Create function
 * 
 * Called once the preloading is complete.
 * Sets all the content of the game, generating sprites, triggers and sounds for the game to run
 */
singleScene.create = function(){

    //Sets the boundaries of the world in which the objects can appear on
    this.physics.world.setBounds(0, 0, 800*2, 600*2);

    //Creates animation for explosion 
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion'),
        frameRate: 20,
        repeat: 0,
        hiddenOnComplete: true
    })
    
    //Creates the different types of bullets in groups and resets the time at which the last bullet has been shot at
    playerPizzaBullets = this.physics.add.group({ classType: pizzaBullets, runChildUpdate: true });
    playerPizzaBullets.lastFired=0;
    
    //Creates the group that holds the zombies and resets the time at which the last zombie has been spawned at
    zombies = this.physics.add.group({ classType: Zombie, runChildUpdate: true});
    zombies.lastSpawned = 0;

    //Saves in the physics of the scene the function to call when a zombie collides with a bullet
    this.physics.add.collider(zombies,playerPizzaBullets, zombieHitCallback);

    //Imports, scale and play the music for the scene
    singlePlayerMusic_ = this.sound.add('singlePlayerMusic');
    singlePlayerMusic_.volume = 0.1;
    singlePlayerMusic_.play();

    //Creates the object that shows the current score
    scoreText = this.add.text(700, 100, 'Score', { font: '32px Courier', fill: '#00ff00' }).setDepth(3);

    //Imports the different sounds playable in the scene
    zombieSplatNoise = this.sound.add('zombieHitNoise');
    zombieDeathNoise = this.sound.add('zombieDeath');
    pistolSwoosh = this.sound.add('pistolSwooshNoise');
    emptyGun = this.sound.add('emptyGun');

    //Scales the volume of the sound effects
    zombieSplatNoise.volume = 0.3;
    zombieDeathNoise.volume = 0.3;
    pistolSwoosh.volume = 0.3;
    emptyGun.volume = 0.3;
    
    //Logs the points at which the zombies can spawn at
    spawnpoints = [
    {x:460, y:224},
    {x:1153,y:220}
    ];

    //Creates the player object and adds to the physics the event when a zombie touches them
    player = this.physics.add.sprite(800, 1000, 'player1');
    this.physics.add.collider(player, zombies, playerHitCallback);

    //Initializes the holder of the beer sprites
    player.beers = [];

    //Logs the player's position in the global variable playersPos
    playersPos.push([player.x, player.y]);

    //Resets score and highscore of the player
    player.score =0;

    //Creates a sprite after the explosion animation declared higher up
    explosion = this.physics.add.sprite(400,300,'explosion').setDepth(3).setScale(4).setVisible(false);

    //Creates a reticle for the player to control
    reticle = this.physics.add.sprite(800, 700, 'target1');

    //Creates a sprite for the UI
    playerinfoHolder = this.add.image(800, 1150, 'playerTable');
    playerinfoHolder.setOrigin(0.5, 0.5).setDisplaySize(400, 200).setDepth(3).setVisible(true);
    
    //Creates 6 burgers representing the 3 full or empty health points of the player
    player.hp1Empty = this.add.image(650, 1150, 'emptyBurger');
    player.hp1Full = this.add.image(650, 1150, 'fullBurger');
    player.hp2Empty = this.add.image(725, 1150, 'emptyBurger');
    player.hp2Full = this.add.image(725, 1150, 'fullBurger');
    player.hp3Empty = this.add.image(800, 1150, 'emptyBurger'); 
    player.hp3Full = this.add.image(800, 1150, 'fullBurger');

    //Scales and resizes the burgers
    player.hp1Empty.setOrigin(0.5, 0.5).setDisplaySize(40, 40).setDepth(3).setVisible(false);
    player.hp1Full.setOrigin(0.5, 0.5).setDisplaySize(40, 40).setDepth(3).setVisible(true);
    player.hp2Empty.setOrigin(0.5, 0.5).setDisplaySize(40, 40).setDepth(3).setVisible(false);
    player.hp2Full.setOrigin(0.5, 0.5).setDisplaySize(40, 40).setDepth(3).setVisible(true);
    player.hp3Empty.setOrigin(0.5, 0.5).setDisplaySize(40, 40).setDepth(3).setVisible(false);
    player.hp3Full.setOrigin(0.5, 0.5).setDisplaySize(40, 40).setDepth(3).setVisible(true);

    //Imports the 10 states of beer sprite representing the ammunition of the player
    for (let i = 0; i < 11; i++) {
        player.beers.push(this.add.image(900, 1150, 'bullet' + i));
        player.beers[i].setOrigin(0.5, 0.5).setDisplaySize(75, 75).setDepth(3).setVisible(false);
    }
    //Initializes the beers with the full one
    player.beers[10].setVisible(true);

    //Resizes and scales the reticle and player in the world
    player.setOrigin(0.5, 0.5).setDisplaySize(66, 60).setCollideWorldBounds(true).setDrag(500, 500).setDepth(1);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true).setDepth(1).setScale(1);


    //Resets the player's variable to a starting point
    player.health = 3;
    player.currentBullets = 15;

    // Set camera properties
    this.cameras.main.zoom = 0.5;
    this.cameras.main.setBounds(0,60,800,600).setName('main');
    
    //If the R key is pressed
    this.input.keyboard.on('keydown_R', function (event) {
        //If the player didn't have all their ammunition, refills it
        if (player.currentBullets < 15){
            player.currentBullets = 15;
        }
    });

    //If the P key is pressed
    this.input.keyboard.on('keydown_P', function (event) {
        //Uses a function to pause the current scene and bring up the pause scene
        goOnPause(singlePlayerMusic_, this.scene.sys.config);
    });


    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        //If the player isn't alive, abort the trigger
        if (!player.active)
            return;

        //Generates a new bullet in the given group
        var bullet = playerPizzaBullets.get().setActive(true).setVisible(true);
        
        //If the bullet has successfully been created and the player can still shoot
        if (bullet && player.currentBullets > 0)
        {
            //Removes 1 from the ammunition count and fires the bullet with a sound
            player.currentBullets = player.currentBullets - 1;
            pistolSwoosh.play();
            bullet.fire(player, reticle);
        }

        //If the bullet has been created but the player cannot shoot, destroys the bullet and plays empty gun sound
        if (bullet && player.currentBullets <= 0){
            emptyGun.play();
            bullet.destroy();
        }
    }, this);

    //When a gamepad has a key pressed on, saves the first one ever connected
    this.input.gamepad.on('down', function (pad, button, index) {
        if (controllers.length <= 0)
            controllers[0] = pad;
    }, this);
    

    //Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    
    //Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked && player.active)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;
        }
    }, this);

    //Created of the level using the tile map and the tile sheet
    var map = this.make.tilemap({key: 'map'});
    var tiles = map.addTilesetImage('tilesheet_complete');
    map.setBaseTileSize(32, 32);

    //Creation of the layers of the level using the map
    var top = map.createStaticLayer('top', tiles, 0, 0).setDepth(2).setScale(1.8);
    var mid = map.createStaticLayer('mid', tiles, 0, 0).setDepth(1).setScale(1.8);
    var bot = map.createStaticLayer('bot', tiles, 0, 0).setScale(1.8);


    //Creation of a XMLHttp request to the post.php file to try and initialize the database with a value if inextistant and fetches the highest score logged if existing
    var xhttp;
    var name = 'SinglePlayer';
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            player.highestScore = parseInt(this.responseText.split(" ")[1]);
        }
    };
    xhttp.open("POST", "post.php?name=" + name, true);
    xhttp.send();

    //Initialization of the text variable with the content it needs
    scoreText.setText("Highest: " + player.highestScore + "\nCurrent: " + player.score);

    //Creation of a routine called every second to update the score from the database
    interv = setInterval(() => {
        var xhttp;
        var name = 'SinglePlayer';
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                player.highestScore = parseInt(this.responseText.split(" ")[1]);
                scoreText.setText("Highest:" + player.highestScore + "\nCurrent: " + player.score);
            }
        };
        xhttp.open("GET", "get.php?name=" + name, true);
        xhttp.send();
    }, 1000);
}

/**
 * Zombie hit callback method
 * 
 * Called when a zombie gets hit by a bullet
 * 
 * @param {Phaser.GameObject} zombieHit The zombie that has been hit by a bullet
 * @param {Phaser.GameObject} bulletHit the bullet that hit the zombie
 */
function zombieHitCallback(zombieHit, bulletHit)
{
    
    //If the two objects are still active
    if (bulletHit.active === true && zombieHit.active === true)
    {
        //Reduces the health of the zombie 
        zombieHit.health = zombieHit.health - 1;

        //If the zombie runs out of health
        if (zombieHit.health <= 0)
        {
            //Awards 10 points to the player
            player.score += 10;
            
            //Plays a death sound
            zombieDeathNoise.play();
            
            //Moves the explosion sprite on the zombie that died and plays the animation
            explosion.setVisible(true);
            explosion.setPosition(zombieHit.x, zombieHit.y);
            explosion.play('explode');
            
            //Destroys the zombie object
            zombieHit.destroy();
       }

        //Plays a splatter noise
        zombieSplatNoise.play();
        
        //Destroys the bullet
        bulletHit.destroy();
    }
}

/**
 * Player hit callback method
 * 
 * Called when a player is touched by a zombie
 * 
 * @param {*} playerHit The player that takes damage
 * @param {*} zombie The zombie that hit the player
 */
function playerHitCallback(playerHit, zombie)
{
    //If the two objects are still active
    if (zombie.active === true && playerHit.active === true)
    {
        //Removes a health point to the player
        playerHit.health = playerHit.health - 1;

        //If the player has 2 health points left, shows the 3rd point as empty
        if (playerHit.health == 2)
        {
            playerHit.hp3Empty.setVisible(true);
            playerHit.hp3Full.setVisible(false);
        }
        //If the player has 1 health points left, shows the 2nd point as empty
        else if (playerHit.health == 1)
        {
            playerHit.hp2Empty.setVisible(true);
            playerHit.hp2Full.setVisible(false);
        }
        //If the player runs out of health points
        else
        {
            //Shows the last health point as empty
            playerHit.hp1Empty.setVisible(true);
            playerHit.hp1Full.setVisible(false);

            //If the player has beaten the highest score logged in the database
            if (playerHit.score > playerHit.highestScore){

            //Creates a request to the database to update the highest score
            var xhttp;
            var name = 'SinglePlayer';
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    scoreText.setText("highest:"+this.responseText + "\nCurrent: "+player.score);
                }
            };
            xhttp.open("POST", "post.php?name=" + name + "&score="+ player.score, true);
            xhttp.send();
        }
            //Deactivates the player
            playerHit.setActive(false);
            
            //Removes the player from the playersPos variable by filtering the content and only returning the values that are not the ones of the player that just died
            playersPos.forEach(p =>{
                if (distance(p[0], p[1], playerHit.x, playerHit.y) <= 5){
                    playersPos = playersPos.filter(entry => entry[0] != playerHit.x)
                }
            });
            
            //Calls the function playerHasDied to finish the game over state
            playerHasDied(playerHit);
    }

        //Stops the requests to the database
        clearTimeout(this.interval);

        //Destroy zombie
        zombie.destroy();
    }
}

/**
 * Player has died function
 * 
 * Deactivates the player and calls in the GameOver function to change scenes
 */
function playerHasDied(player){
    player.setActive(false).setVisible(false);
    GameOver();
}

/**
 * Spawn zombies function
 * 
 * Spawn zombies as long as the player is alive at random given locations
 * 
 * @param {Phaser.Group} zombies Group that holds the zombies sprites
 * @param {Array} spawnpoints Locations at which the zombies can be spawned at
 * @param {number} time Time in ms of the computer (passed from the update function)
 */
function spawnZombies(zombies, spawnpoints, time) {
    //If a player is still alive and the last zombie has been spawned more than 500ms ago
    if ((time - zombies.lastSpawned) > 500 && playersPos.length > 0){
        //Resets the timer to the current time
        zombies.lastSpawned = time;
        
        //Creation of a zombie
        var zzz = zombies.get().setActive(true).setVisible(true).setDepth(2);
        
        //If successful creation
        if (zzz) {

            //Selects a random point in the spawnpoint array and sends the zombie there
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
singleScene.update = function(time, delta){
    //If the player is still alive, logs its position
    if (player.active)
        playersPos[0] = [player.x, player.y];

    //If a controller is still hooked on the machine
    if(controllers.length>0){
        //If the controller's left stick is out of the set dead zone (20% of the full range), moves the reticle in that direction
        if (controllers[0].axes[0].value >= 0.2 || controllers[0].axes[0].value <= -0.2){
            reticle.x += ( controllers[0].axes[0].value * delta);
        }
        if (controllers[0].axes[1].value >= 0.2 || controllers[0].axes[1].value <= -0.2) {
            reticle.y += (controllers[0].axes[1].value * delta);
        }

        //If the controller's A button is pressed
        if (controllers[0].A){
            //If the player is dead or the previous shot is too recent, abort
            if (!player.active || !((time - playerPizzaBullets.lastFired) > 100))
                return;

            //If a shot is possible, resets the timer to current time
            playerPizzaBullets.lastFired = time;
            
            //Creates a new bullet
            var bullet = playerPizzaBullets.get().setActive(true).setVisible(true);

            //If creation successful and player has ammunition
            if (bullet && player.currentBullets > 0) {
                //Removes  from the ammunition count and fires the bullet with a sound
                player.currentBullets = player.currentBullets - 1;
                pistolSwoosh.play();
                bullet.fire(player, reticle);
            }

            //If the bullet has been created but the player couldn't shoot, plays empty gun sound and destroys the bullet
            if (bullet && player.currentBullets <= 0) {
                emptyGun.play();
                bullet.destroy();
            }
        }

        //If the controller's X button is pressed
        if(controllers[0].X){
            //If the player didn't have full ammunition, refills it
            if (player.currentBullets < 15) {
                player.currentBullets = 15;
            }
        }

    }
    

        //Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);
        
        // Make zombie spawn
        spawnZombies(zombies, spawnpoints, time);

        //Switch on the number of available bullets to update the beer sprite
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
 * Game over function
 * 
 * Stops the music, resumes the paused Menu scene and stops the current scene
 * 
 */
    function GameOver(){
        //If a player exists, stops it
        if(singlePlayerMusic_)
        singlePlayerMusic_.stop();
        clearTimeout(interv);

        //Stops the current scene and starts the Menu one
        game.scene.resume('Menu');
        game.scene.stop('Single');
    }

    /**
     * Go on pause function
     * 
     * Pauses the given scene and brings up the pause scene
     * 
     * @param {Phaser.Sound.BaseSoundManager} music Sound manager holding the Scene's music
     * @param {String} key Name of the scene that has to get paused
     */
    function goOnPause(music, key){
        if(music)
        music.stop()
        game.scene.run('Pause');
        game.scene.pause(key);
    }