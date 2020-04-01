let narrativeScene = new Phaser.Scene('Narrative');

narrativeScene.preload = function(){
   
}
narrativeScene.create = function(){
    
    //background image
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);
    backstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "plot").setDepth(2).setScale(.48).setActive(true);

    //buttons
    backstory2Button = this.add.image(this.game.renderer.width / 4, this.game.renderer.height / 5.5,"backstory_button").setDisplaySize(300,80).setDepth(1);
    roderickButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /3, "rodButton").setDisplaySize(300, 80).setDepth(1);   
    ronanButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /2.05, "ronButton").setDisplaySize(300, 80).setDepth(1); 
    dominicButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /1.56, "domButton").setDisplaySize(300, 80).setDepth(1);  
    fredButton = this.add.image(this.game.renderer.width / 4, this.game.renderer.height /1.25, "fredButton").setDisplaySize(300, 80).setDepth(1);
    return2Button = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1).setScale(0.3);

    backstory2Button.setInteractive();
    roderickButton.setInteractive();
    ronanButton.setInteractive();
    dominicButton.setInteractive();
    fredButton.setInteractive();
    return2Button.setInteractive();

    return2Button.on("pointerdown", ()=>{
        clickreturn2Button()
    });

    roderickButton.on("pointerdown", ()=>{
        clickroderickButton()
    });

    backstory2Button.on("pointerdown", ()=>{
        clickbackstory2Button()
    });
}

narrativeScene.update = function(){

}

function clickbackstory2Button(){
    backstoryImage.setDepth(2)

}

function clickroderickButton(){
    //place Roderick setDepth here
    backstoryImage.setDepth(0)
}

function clickronanButton(){
    
}

function clickdominicButton(){
    
}

function clickfredButton(){
    
}

function clickreturn2Button(){
    game.scene.start('Menu');
    game.scene.stop('Narrative');
}