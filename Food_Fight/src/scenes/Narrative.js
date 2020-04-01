let narrativeScene = new Phaser.Scene('Narrative');

narrativeScene.preload = function(){
   
}
narrativeScene.create = function(){
    
    //background image
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);

    //buttons
    backstoryButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height / 5.5,"backstory_button").setDisplaySize(300,80).setDepth(1);
    roderickButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /3, "rodButton").setDisplaySize(300, 80).setDepth(1);   
    ronanButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /2.05, "ronButton").setDisplaySize(300, 80).setDepth(1); 
    dominicButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /1.56, "domButton").setDisplaySize(300, 80).setDepth(1);  
    fredButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /1.25, "fredButton").setDisplaySize(300, 80).setDepth(1);
    returnButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1).setScale(0.3);

    backstoryButton.setInteractive();
    roderickButton.setInteractive();
    ronanButton.setInteractive();
    dominicButton.setInteractive();
    fredButton.setInteractive();
    returnButton.setInteractive();
}

narrativeScene.update = function(){

}

function clickbackstoryButton(){

}
function clickroderickButton(){
    
}
function clickronanButton(){
    
}
function clickdominicButton(){
    
}
function clickfredButton(){
    
}
function clickreturnButton(){
    game.scene.start('Menu');
    game.scene.stop('Narrative');
    menuScene.input.keyboard.removeKey('ESC');
    esc = null;
}