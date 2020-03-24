let menuScene = new Phaser.Scene('Menu');

menuScene.preload = function(){

}

menuScene.create = function(){
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);
    let singlePlayButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "singleplayer_button").setDepth(1);   
    let multiPlayerButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.5, "multiplayer_button").setDepth(1);    
    
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
}

function clickSinglePlayerButton(){
        console.log("single player chosen")
        game.scene.stop('Menu');
        game.scene.start('Single');
    }

function clickMultiPlayerButton(){
        console.log("multiplayer chosen")
        game.scene.start('Multi');
        game.scene.stop('Menu');
}

