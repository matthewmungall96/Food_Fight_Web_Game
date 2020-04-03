/**
 * PauseScene.js
 * File used to store the scripting for the Pause Menu Scene
 */

//Creation of the scene object
let pauseScene = new Phaser.Scene('Pause');

/**
* Will import all the items used through the game, all sprites, musics and tile maps
*/
pauseScene.preload = function () {

}

/**
 * Pause Menu Create Function
 * Creates the assets for the Pause Menu scene, which have been established in the LoadScene.js file 
 */
pauseScene.create = function () {
    //Disables the mouse lock established in the Single Player or Multiplayer scenes
    if (game.input.mouse.locked) {
        game.input.mouse.releasePointerLock();
    }
    /**
     * Creates the individual buttons for accessing the different scenes, which are;
     * 1. return2Button 
     * 2. return2Menu
    */
    return2Button = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1).setScale(0.3);
    return2Menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'returntomenu').setDisplaySize(600, 160).setDepth(1).setScale(0.3);

    /**
     * .SetInteractive();
     * Sets the individual buttons as being interactable, allowing them to be interacted with via the mouse
    */
    return2Button.setInteractive();
    return2Menu.setInteractive();

    /**
     * .on Functionality 
     * Sets up the method of accessing the function of the button, via pressing the left-mouse button. 
     */

    /**
     * return2Button.on
     * When return2Button is pressed, it will perform an if statement
     * if the game scene that is paused is the single player scene, pressing the button will resume the single player scene
     * however, if the player is in the multiplayer scene, it will resume the multiplayer scene
     */
    return2Button.on("pointerdown", () => {
        if (game.scene.isPaused('Single')) {
            ResumePausedScene('Single');
        }
        else if (game.scene.isPaused('Multi')) {
            ResumePausedScene('Multi');
        }
    });
    
    /**
     * return2Menu.on
     * When return2Menu is pressed, it will perform an if statement
     * if the game scene that is paused is the single player scene, pressing the button will clear the singleplayer scene and start the QuitToMenu function
     * however, if the player is in the multiplayer scene, pressing the button will start the QuitToMenu function
     */    
    return2Menu.on("pointerdown", () => {
        if (game.scene.isPaused('Single')) {
            clearTimeout(singleScene.interval);
            QuitToMenu("Single");
        }
        else if (game.scene.isPaused('Multi')) {
            QuitToMenu("Multi");
        }
    });
}

/**
 * Update()
 * Updates the scene on every loaded frame. 
 */
pauseScene.update = function (time, delta) {

}

/**
 * QuitToMenu()
 * Function for changing the scene back to the Main Menu 
 */
function QuitToMenu(key) {
    game.scene.stop(key);
    game.scene.start('Menu');
    game.scene.stop('Pause');
}

/**
 * ResumePausedScene()
 * Resumes the scene that is currently being paused  
 */
function ResumePausedScene(key) {
    game.scene.run(key);
    game.scene.stop('Pause');
}