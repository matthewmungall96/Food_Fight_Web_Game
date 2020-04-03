//Creation of the scene object
let menuScene = new Phaser.Scene('Menu');

/**
 * Will import all the items used through the game, all sprites, musics and tile maps
 */
menuScene.preload = function(){
}

/**
 * Establishing the variables for the Main Menu music (mainMenuMusic) && the Button Press Sound Effect (buttonPress)
 */
var mainMenuMusic;
var buttonPress;

/**
 * Main Menu Create Function
 * 
 * Creates the assets for the Main Menu scene, which have been established in the LoadScene.js file 
 */
menuScene.create = function(){
    //Disables the mouse lock established in the Single Player or Multiplayer scenes
    if (game.input.mouse.locked){
        game.input.mouse.releasePointerLock();
    }
    
    //Adds the Menu's background image and logo
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);
    
    /**
     * Creates the individual buttons for accessing the different scenes, which are;
     * 1. Single Player
     * 2. Multiplayer
     * 3. Narrative 
     * Pressing any of these buttons will lead to the corresponding scene
     */
    singlePlayButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2.3, "singleplayer_button").setDisplaySize(300, 80).setDepth(1);   
    multiPlayerButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /1.7, "multiplayer_button").setDisplaySize(300, 80).setDepth(1);
    backstoryButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.34,"backstory_button").setDisplaySize(300,80).setDepth(1);

    /**
     * Loads the sounds from the LoadScene.js onto the variables established earlier
     * Button Press
     * Main Menu Music
    */
    buttonPress = this.sound.add('pressButton');
    mainMenuMusic = this.sound.add('mainMenu');
    
    /**
     * Sets the volume of the Main Menu Music before playing, setting it at 0.3. 
     */
    mainMenuMusic.volume = 0.1;
    
    /**
     * .play();
     * Plays the Main Menu Music 
     */
    mainMenuMusic.play();
    
    
    /**
     * .SetInteractive();
     * Sets the individual buttons as being interactable, allowing them to be interacted with via the mouse
    */
    singlePlayButton.setInteractive();
    multiPlayerButton.setInteractive();
    backstoryButton.setInteractive();

    /**
     * .on Functionality 
     * Sets up the method of accessing the function of the button, via pressing the left-mouse button. 
     */
    //Starts the clickSinglePlayer() function on mouse click
    singlePlayButton.on("pointerdown", ()=>{
        clickSinglePlayerButton()
    });
    //Starts the clickMultiplayerButton() function on mouse click
    multiPlayerButton.on("pointerdown", ()=>{
        clickMultiPlayerButton()
    });
    //Starts the clickBackStoryButton() function on mouse click
    backstoryButton.on("pointerdown", ()=>{
        clickbackstoryButton()
    });
}

/**
 * Update()
 * Updates the scene on every loaded frame. 
 * Releases the mouse pointer from the screen, used in case the intial check does not pass properly
 */
menuScene.update = function(){
    if (game.input.mouse.locked) {
        game.input.mouse.releasePointerLock();
    }
}

/**
 * clickSinglePlayerButton
 * Function that is loaded after the player presses on the Single Player button
 * Function will stop the Menu Scene (scene.pause) and start the Single Player scene (scene.start) 
 */
function clickSinglePlayerButton(){
    buttonPress.play();
    mainMenuMusic.stop();
    game.scene.pause('Menu');
    game.scene.start('Single');
}

/**
 * Function that is loaded after the player presses on the Multiplayer button
 * Function will stop the Menu Scene (scene.pause) and start the Multiplayer scene (scene.start) 
 */
function clickMultiPlayerButton(){
    buttonPress.play();
    mainMenuMusic.stop();
    game.scene.start('Multi');
    game.scene.pause('Menu');
}

/**
 * Function that is loaded after the player presses on the Narrative button
 * Button Interaction sound effect will play 
 * Function will stop the Menu Scene (scene.pause) and start the Narrative scene (scene.start) 
 */
function clickbackstoryButton(){
    buttonPress.play();
    game.scene.start('Narrative');
    game.scene.pause('Menu');
}

