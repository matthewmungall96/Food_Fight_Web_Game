//Creation of the scene object
let menuScene = new Phaser.Scene('Menu');

/**
 * 
 */
menuScene.preload = function(){
}

//
var mainMenuMusic;
var buttonPress;

menuScene.create = function(){
    //
    if (game.input.mouse.locked){
        game.input.mouse.releasePointerLock();
    }
    
    //
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);
    
    //
    singlePlayButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2.3, "singleplayer_button").setDisplaySize(300, 80).setDepth(1);   
    multiPlayerButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /1.7, "multiplayer_button").setDisplaySize(300, 80).setDepth(1);
    backstoryButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.34,"backstory_button").setDisplaySize(300,80).setDepth(1);

    //
    buttonPress = this.sound.add('pressButton');
    mainMenuMusic = this.sound.add('mainMenu');
    
    //
    mainMenuMusic.volume = 0.1;
        mainMenuMusic.play();
    
    
    //
    singlePlayButton.setInteractive();
    multiPlayerButton.setInteractive();
    backstoryButton.setInteractive();

    //
    singlePlayButton.on("pointerdown", ()=>{
        clickSinglePlayerButton()
    });
    
    //
    multiPlayerButton.on("pointerdown", ()=>{
        clickMultiPlayerButton()
    });

    //
    backstoryButton.on("pointerdown", ()=>{
        clickbackstoryButton()
    });
}

/**
 * 
 */
menuScene.update = function(){
    if (game.input.mouse.locked) {
        game.input.mouse.releasePointerLock();
    }
}

/**
 * 
 */
function clickSinglePlayerButton(){
    buttonPress.play();
    mainMenuMusic.stop();
    game.scene.pause('Menu');
    game.scene.start('Single');
}

/**
 * 
 */
function clickMultiPlayerButton(){
    game.scene.start('Multi');
    game.scene.pause('Menu');
}

/**
 * 
 */
function clickbackstoryButton(){
    game.scene.start('Narrative');
    game.scene.pause('Menu');
}

