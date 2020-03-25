let singleScene = new Phaser.Scene('Single');

singleScene.preload = function(){

}

singleScene.create = function(){
    let returnToMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2-100, "returntomenu").setDepth(1);   
    returnToMenu.setInteractive();
    console.log(returnToMenu);

    returnToMenu.on("pointerover", ()=>{
        console.log("return to menu hovering  from signle");
    })

    returnToMenu.on("pointerout", ()=>{
        console.log("return to menu exit  from single");
    })

    returnToMenu.on("pointerdown", ()=>
        clickReturnMenuButton());
}

singleScene.update = function(){
    
}

function clickReturnMenuButton(){
    console.log("return to menu from single");
    game.scene.getScenes(true).forEach(scene => {
        game.scene.stop(scene);
    });
    
    game.scene.start('Menu');
}

