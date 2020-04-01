let narrativeScene = new Phaser.Scene('Narrative');

narrativeScene.preload = function(){
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "narBground").setDepth(2).setScale(.93);
}

narrativeScene.create = function(){
    
}

narrativeScene.update = function(){

}