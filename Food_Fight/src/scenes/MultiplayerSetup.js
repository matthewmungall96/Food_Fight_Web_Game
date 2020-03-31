let multiSetupScene = new Phaser.Scene('MultiSetup');

var controller1;
var controller2;
var controller3;
var controller4;
var controller_count = 0;

multiSetupScene.preload = function(){

}

multiSetupScene.create = function(){

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 10.5, 'multisetup').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 4, 'controller_1').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 2.5, 'controller_2').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.80, 'controller_3').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.4, 'controller_4').setDisplaySize(300, 80).setDepth(1);
    hp1Empty = this.add.image(this.game.renderer.width / 3 *2, this.game.renderer.height / 4, 'emptyBurger').setDepth(1).setVisible(false);
    
    multiPlayButton = this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.1, 'start_game').setDisplaySize(300, 80).setDepth(1).setVisible(false);
    returnButton = this.add.image(this.game.renderer.width / 1.5, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1);
    
    multiPlayButton.setInteractive();
    returnButton.setInteractive();

    var controllers = [];

    this.input.gamepad.on('down', function (pad, button, index) {
        /*
        console.log(pad);
        console.log(index);
        console.log(button);
        */
        if (!controllers.find(c => c.pad.index == pad.pad.index) && controllers.length <=4){
            controllers.push(pad);
            console.log("new controller registered");
        }
    });

    multiPlayButton.on("pointerover", ()=>{
        console.log("single player hovering")
    })

    multiPlayButton.on("pointerout", ()=>{
        console.log("single player exit")
    })

    multiPlayButton.on("pointerdown", ()=>{
        clickMultiplayerSetupButton();
    })

    returnButton.on("pointerover", ()=>{
        console.log("single player hovering")
    })

    returnButton.on("pointerout", ()=>{
        console.log("single player exit")
    })

    returnButton.on("pointerdown", ()=>{
        addPlayer()
    })
}

function clickMultiplayerSetupButton(){
        buttonPress.play();
        mainMenuMusic.stop();
        game.scene.stop('MultiSetup');
        game.scene.start('Multi');
}

function clickReturnMenuButton(){
        buttonPress.play();
        mainMenuMusic.stop();
        game.scene.stop('MultiSetup');
        game.scene.start('Menu');
}

function addPlayer(){
    if (controller_count == 4){
        return;
    }

    else{
        controller_count++;
        console.log(controller_count);
    }
       
    if (controller_count >= 2)
        {
            multiPlayButton.setVisible(true);
    }

    else{
            return;
    }
}

function ready(){
    multiPlayButton.setVisible(true);
}

multiSetupScene.update = function(time, delta){

}