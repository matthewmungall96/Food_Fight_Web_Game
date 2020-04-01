let narrativeScene = new Phaser.Scene('Narrative');

narrativeScene.preload = function(){
   
}
narrativeScene.create = function(){
    
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);
}

narrativeScene.update = function(){

}