/**
 * Narrative.js
 * File used to store the scripting for the Narrative Scene
 */

//Creation of the scene object
let narrativeScene = new Phaser.Scene('Narrative');

/**
* Will import all the items used through the game, all sprites, musics and tile maps
*/
narrativeScene.preload = function(){
   
}

/**
 * Narrative Create Function
 * Creates the assets for the Narrative scene, which have been established in the LoadScene.js file 
 */
narrativeScene.create = function(){
    
    //Background Image Loaded
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);

    /**
     * Adding the backstory images
     * backstoryImage = the plot of the game
     * rodbackstoryImage = Roderick's Backstory Image 
     * ronbackstoryImage = Ronan's Backstory Image
     * dombackstoryImage = Domnic's Backstory Image
     * fredbackstoryImage = Fred's Backstory Image
     */
    backstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "plot").setDepth(0).setScale(.48);
    rodbackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "rodBackstory").setDepth(0).setScale(.48)
    ronbackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "ronBackstory").setDepth(0).setScale(.48)
    dombackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "domBackstory").setDepth(0).setScale(.48)
    fredbackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "fredBackstory").setDepth(0).setScale(.48)

    /**
     * Adding the sprite images
     * domChaSprite = Roderick's Backstory Image 
     * rodChaSprite = Ronan's Sprite Image
     * ronChaSprite = Domnic's Sprite Image
     * fredChaSprite = Fred's Sprite Image
     */    
    domChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Dom").setDepth(0).setScale(4.5);
    rodChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Rod").setDepth(0).setScale(4.5);
    ronChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Ron").setDepth(0).setScale(4.5);
    fredChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Fred").setDepth(0).setScale(4.5);

    /**
     * Adding the button images
     * backstory2Button = Backstory Button 
     * roderickButton = Roderick's Backstory Button
     * ronanButton = Ronan's Backstory Button
     * dominicButton = Domnic's Backstory Button
     * fredButton = Fred's Backstory Button
     * return2Button =  Return Button
     */ 
    backstory2Button = this.add.image(this.game.renderer.width / 4, this.game.renderer.height / 5.5,"backstory_button").setDisplaySize(300,80).setDepth(1);
    roderickButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /3, "rodButton").setDisplaySize(300, 80).setDepth(1);   
    ronanButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /2.05, "ronButton").setDisplaySize(300, 80).setDepth(1); 
    dominicButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /1.56, "domButton").setDisplaySize(300, 80).setDepth(1);  
    fredButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /1.25, "fredButton").setDisplaySize(300, 80).setDepth(1);
    return2Button = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1).setScale(0.3);

    /**
     * Adding the interactivity to the button images
     * backstory2Button = backstory2Button.setInteractive() 
     * roderickButton = roderickButton.setInteractive()
     * ronanButton = ronanButton.setInteractive()
     * dominicButton = dominicButton.setInteractive();
     * fredButton = fredButton.setInteractive();
     * return2Button =  return2Button.setInteractive();
     */ 
    backstory2Button.setInteractive();
    roderickButton.setInteractive();
    ronanButton.setInteractive();
    dominicButton.setInteractive();
    fredButton.setInteractive();
    return2Button.setInteractive();

    /**
     * .on Functionality 
     * Sets up the method of accessing the function of the button, via pressing the left-mouse button. 
     */
    //Starts the clickreturn2Button() function on mouse click
    return2Button.on("pointerdown", ()=>{
        clickreturn2Button()
    });
    //Starts the clickroderickButton() function on mouse click
    roderickButton.on("pointerdown", ()=>{
        clickroderickButton()
    });
    //Starts the clickronanButton() function on mouse click
    ronanButton.on("pointerdown", ()=>{
        clickronanButton()
    });
    //Starts the clickdominicButton() function on mouse click
    dominicButton.on("pointerdown", ()=>{
        clickdominicButton()
    });
    //Starts the clickfredButton() function on mouse click
    fredButton.on("pointerdown", ()=>{
        clickfredButton()
    });
    //Starts the clickbackstory2Button() function on mouse click
    backstory2Button.on("pointerdown", ()=>{
        clickbackstory2Button()
    });
}

/**
 * Update()
 * Updates the scene on every loaded frame. 
 * Releases the mouse pointer from the screen, used in case the intial check does not pass properly
 */
narrativeScene.update = function(){

}

/**
 * clickbackstory2Button()
 * Disables any images active and replaces them with the Backstory image. 
 */
function clickbackstory2Button(){
    //Changes depth for all background images except for the background
    backstoryImage.setDepth(2)
    dombackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)
    fredbackstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)

    //All sprites are set to 0, due to the background not having one
    rodChaSprite.setDepth(0)
    ronChaSprite.setDepth(0)
    domChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)
}

/**
 * clickroderickButton()
 * Disables any images active and replaces them with the Roderick's sprite & backstory image. 
 */
function clickroderickButton(){
    //Changes depth for all background images except Roderick's
    rodbackstoryImage.setDepth(2)
    backstoryImage.setDepth(0)
    dombackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)
    fredbackstoryImage.setDepth(0)

    //Changes depth for all sprites except Fred's
    rodChaSprite.setDepth(2)
    ronChaSprite.setDepth(0)
    domChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)
}

/**
 * clickronanButton() 
 * Disables any images active and replaces them with the Ronan's sprite & backstory image. 
 */
function clickronanButton(){
    //Changes depth for all background images except Ronan's
    ronbackstoryImage.setDepth(2)
    dombackstoryImage.setDepth(0)
    fredbackstoryImage.setDepth(0)
    backstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)

    //Changes depth for all sprites except Ronan's
    ronChaSprite.setDepth(2)
    domChaSprite.setDepth(0)
    rodChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)
}

/**
 * clickdominicButton() 
 * Disables any images active and replaces them with the Dominic's sprite & backstory image. 
 */
function clickdominicButton(){
    //Changes depth for all background images except Dominic's
    dombackstoryImage.setDepth(2)
    fredbackstoryImage.setDepth(0)
    backstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)

    //Changes depth for all sprites except Dominic's
    domChaSprite.setDepth(2)
    ronChaSprite.setDepth(0)
    rodChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)
}

/**
 * clickfredButton() 
 * Disables any images active and replaces them with the Fred's sprite & backstory image. 
 */
function clickfredButton(){
    //Changes depth for all background images except Fred's
    fredbackstoryImage.setDepth(2)
    backstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)
    dombackstoryImage.setDepth(0)

    //Changes depth for all sprites except Fred's
    fredChaSprite.setDepth(2)
    ronChaSprite.setDepth(0)
    domChaSprite.setDepth(0)
    rodChaSprite.setDepth(0) 
}

/**
 * clickreturn2Button() 
 * Stops the Narrative scene and resumes the Main Menu scene
 */
function clickreturn2Button(){
    game.scene.resume('Menu');
    game.scene.stop('Narrative');
}