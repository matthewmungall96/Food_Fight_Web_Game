let singleSetupScene = new Phaser.Scene('SingleSetup');

//
var controller_single;

//
var controllerSingle_active;
var controllerSingle_inactive;

/**
 * 
 */
singleSetupScene.preload = function(){

}

/**
 * 
 */
singleSetupScene.create = function(){

    //
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 10.5, 'singlesetup').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 4, 'controller_1').setDisplaySize(300, 80).setDepth(1);

    //
    controller1_active = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 4, 'controller_active').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    controller1_inactive = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 4, 'controller_inactive').setDisplaySize(300, 80).setDepth(1).setVisible(true);

    //
    
    //
    singlePlayButton = this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.1, 'start_game').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    returnButton = this.add.image(this.game.renderer.width / 1.5, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1);
    
    //
    singlePlayButton.setInteractive();
    returnButton.setInteractive();

    //
    this.input.gamepad.on('down', function (pad, button, index) {
        //
        if (!controllers.find(c => c.pad.index == pad.pad.index) && controllers.length <=4){
            //
            controllers.push(pad);
            console.log("new controller registered");
            addSinglePlayer();
        }
    });

    //
    singlePlayButton.on("pointerdown", ()=>{
        clickSingleSetupScene();
    });

    //
    returnButton.on("pointerdown", ()=>{
        returnToMenuSingle();
    });
}

/**
 * 
 */
function clickSingleSetupScene(){
    //
    buttonPress.play();
    mainMenuMusic.stop();
    //
    game.scene.stop('SingleSetup');
    game.scene.start('Single');
}

/**
 * 
 */
function returnToMenuSingle(){
    //
    buttonPress.play();
    mainMenuMusic.stop();
    //
    game.scene.stop('SingleSetup');
    game.scene.start('Menu');
}
/**
 * 
 */
function addSinglePlayer(){
    //
    if (controllers.length >= 1)
    {
        controller1_active.setVisible(true);
        controller1_inactive.setVisible(false);
        singlePlayButton.setVisible(true);
    }
}

/**
 * 
 */
singleSetupScene.update = function(time, delta){
}