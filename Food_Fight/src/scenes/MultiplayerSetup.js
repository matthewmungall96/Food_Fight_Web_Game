let multiSetupScene = new Phaser.Scene('MultiSetup');

var controller1;
var controller2;
var controller3;
var controller4;
var controller_count;

multiSetupScene.preload = function(){

}

multiSetupScene.create = function(){
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 10.5, 'multisetup').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 4, 'controller_1').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 2.5, 'controller_2').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.80, 'controller_3').setDisplaySize(300, 80).setDepth(1);
    this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.4, 'controller_4').setDisplaySize(300, 80).setDepth(1);
    multiPlayButton = this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 1.1, 'start_game').setDisplaySize(300, 80).setDepth(1);
    returnButton = this.add.image(this.game.renderer.width / 1.5, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1);

    multiPlayButton.setInteractive();
    returnButton.setInteractive();

    multiPlayButton.on("pointerover", ()=>{
        console.log("single player hovering")
    })

    multiPlayButton.on("pointerout", ()=>{
        console.log("single player exit")
    })

    multiPlayButton.on("pointerdown", ()=>
        clickMultiplayerSetupButton());

    returnButton.on("pointerover", ()=>{
        console.log("single player hovering")
    })

    returnButton.on("pointerout", ()=>{
        console.log("single player exit")
    })

    returnButton.on("pointerdown", ()=>
        clickReturnMenuButton());
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

multiSetupScene.update = function(time, delta){

}