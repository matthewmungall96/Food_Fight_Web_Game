//
let multiSetupScene = new Phaser.Scene('MultiSetup');

//
var controllers = [];

//
var controller1_active;
var controller1_inactive;
var controller2_active;
var controller2_inactive;
var controller3_active;
var controller3_inactive;
var controller4_active;
var controller4_inactive;

/**
 * 
 */
multiSetupScene.preload = function(){

}

/**
 * 
 */
multiSetupScene.create = function(){

    //
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 10.5, 'multisetup').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 4, 'controller_1').setDisplaySize(300, 80).setDepth(1);

    //
    controller1_active = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 4, 'controller_active').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    controller1_inactive = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 4, 'controller_inactive').setDisplaySize(300, 80).setDepth(1).setVisible(true);
    controller2_active = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 2.5, 'controller_active').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    controller2_inactive = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 2.5, 'controller_inactive').setDisplaySize(300, 80).setDepth(1).setVisible(true);
    controller3_active = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 1.80, 'controller_active').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    controller3_inactive = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 1.80, 'controller_inactive').setDisplaySize(300, 80).setDepth(1).setVisible(true);
    controller4_active = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 1.4, 'controller_active').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    controller4_inactive = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 1.4, 'controller_inactive').setDisplaySize(300, 80).setDepth(1).setVisible(true);

    //
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 2.5, 'controller_2').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.80, 'controller_3').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.4, 'controller_4').setDisplaySize(300, 80).setDepth(1);
    
    //
    multiPlayButton = this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.1, 'start_game').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    returnButton = this.add.image(this.game.renderer.width / 1.5, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1);
    
    //
    multiPlayButton.setInteractive();
    returnButton.setInteractive();

    //
    this.input.gamepad.on('down', function (pad, button, index) {
        //
        if (!controllers.find(c => c.pad.index == pad.pad.index) && controllers.length <=4){
            //
            controllers.push(pad);
            console.log("new controller registered");
            addPlayer();
        }
    });

    //
    multiPlayButton.on("pointerdown", ()=>{
        clickMultiplayerSetupButton();
    });

    //
    returnButton.on("pointerdown", ()=>{
        addPlayer();
       multiPlayButton.setVisible(true);
    });
}

/**
 * 
 */
function clickMultiplayerSetupButton(){
    //
    buttonPress.play();
    mainMenuMusic.stop();
    //
    game.scene.stop('MultiSetup');
    game.scene.start('Multi');
}

/**
 * 
 */
function clickReturnMenuButton(){
    //
    buttonPress.play();
    mainMenuMusic.stop();
    //
    game.scene.stop('MultiSetup');
    game.scene.start('Menu');
}
/**
 * 
 */
function addPlayer(){
    //
    if (controllers.length >= 1)
    {
        controller1_active.setVisible(true);
        controller1_inactive.setVisible(false);
    }

    //
    if (controllers.length >= 2)
    {
        controller2_active.setVisible(true);
        controller2_inactive.setVisible(false);
        //
        multiPlayButton.setVisible(true);
    }

    if (controllers.length >= 3)
    {
        controller3_active.setVisible(true);
        controller3_inactive.setVisible(false);
    }

    if (controllers.length >= 4)
    {
        controller4_active.setVisible(true);
        controller4_inactive.setVisible(false);
    } 
}

/**
 * 
 */
multiSetupScene.update = function(time, delta){
}