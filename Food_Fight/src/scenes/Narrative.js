let narrativeScene = new Phaser.Scene('Narrative');

narrativeScene.preload = function(){
   
}
var buttonPress;
narrativeScene.create = function(){
    //
    if (game.input.mouse.locked){
        game.input.mouse.releasePointerLock();
    }
    
    //
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "narBground").setDepth(2).setScale(1);
    
}

narrativeScene.update = function(){

}