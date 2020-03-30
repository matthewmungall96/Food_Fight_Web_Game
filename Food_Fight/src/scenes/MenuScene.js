let menuScene = new Phaser.Scene('Menu');

menuScene.preload = function(){
}

var esc = null;
var mainMenuMusic;
var buttonPress;

menuScene.create = function(){
    if (game.input.mouse.locked)
    game.input.mouse.releasePointerLock();

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);
    
    singlePlayButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2.3, "singleplayer_button").setDisplaySize(300, 80).setDepth(1);   
    multiPlayerButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /1.7, "multiplayer_button").setDisplaySize(300, 80).setDepth(1);

    buttonPress = this.sound.add('pressButton');
    mainMenuMusic = this.sound.add('mainMenu');
    
    mainMenuMusic.volume = 0.1;
    mainMenuMusic.play();
    singlePlayButton.setInteractive();
    multiPlayerButton.setInteractive();

    singlePlayButton.on("pointerover", ()=>{
        console.log("single player hovering")
    })

    singlePlayButton.on("pointerout", ()=>{
        console.log("single player exit")
    })

    singlePlayButton.on("pointerdown", ()=>
        clickSinglePlayerButton());
    

    multiPlayerButton.on("pointerover", ()=>{
        console.log("multiplayer hovering")
    })

    multiPlayerButton.on("pointerout", ()=>{
        console.log("multiplayer exit")
    })

    multiPlayerButton.on("pointerdown", ()=>
    clickMultiPlayerButton());

    if (!esc) {
        esc = this.input.keyboard.addKey('ESC');
        esc.on('down', function (event) {
            console.log("Escape pressed");
            if (game.scene.isPaused('Menu'))
                game.scene.resume('Menu');
            else if (!game.scene.isPaused('Menu'))
                game.scene.pause('Menu');
        });
    }
}

menuScene.update = function(){

}


function clickSinglePlayerButton(){
        buttonPress.play(),
        mainMenuMusic.stop(),
        game.scene.stop('Menu');
        game.scene.start('Single');
        menuScene.input.keyboard.removeKey('ESC');
        esc = null;
    }

function clickMultiPlayerButton(){
        game.scene.start('MultiSetup');
        game.scene.stop('Menu');
        menuScene.input.keyboard.removeKey('ESC');
        esc = null;
}

