let narrativeScene = new Phaser.Scene('Narrative');

narrativeScene.preload = function(){
   
}
narrativeScene.create = function(){
    
    //background image
    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "title_bg").setDepth(1).setScale(.93);
    backstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "plot").setDepth(0).setScale(.48);
    rodbackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "rodBackstory").setDepth(0).setScale(.48)
    ronbackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "ronBackstory").setDepth(0).setScale(.48)
    dombackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "domBackstory").setDepth(0).setScale(.48)
    fredbackstoryImage = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 3.7, "fredBackstory").setDepth(0).setScale(.48)

    //sprite images
    domChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Dom").setDepth(0).setScale(4.5);
    rodChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Rod").setDepth(0).setScale(4.5);
    ronChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Ron").setDepth(0).setScale(4.5);
    fredChaSprite = this.add.image(this.game.renderer.width /1.4, this.game.renderer.height / 1.4, "Fred").setDepth(0).setScale(4.5);

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

    ronanButton.on("pointerdown", ()=>{
        clickronanButton()
    });

    dominicButton.on("pointerdown", ()=>{
        clickdominicButton()
    });

    fredButton.on("pointerdown", ()=>{
        clickfredButton()
    });

    backstory2Button.on("pointerdown", ()=>{
        clickbackstory2Button()
    });
    console.log(game.scene.getScenes(true));
}

narrativeScene.update = function(){

}

function clickbackstory2Button(){
    //plots
    backstoryImage.setDepth(2)
    dombackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)
    fredbackstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)

    //sprites
    rodChaSprite.setDepth(0)
    ronChaSprite.setDepth(0)
    domChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)

}

function clickroderickButton(){
    //plots
    rodbackstoryImage.setDepth(2)
    backstoryImage.setDepth(0)
    dombackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)
    fredbackstoryImage.setDepth(0)

    //sprites
    rodChaSprite.setDepth(2)
    ronChaSprite.setDepth(0)
    domChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)
}

function clickronanButton(){
    //plots
    ronbackstoryImage.setDepth(2)
    dombackstoryImage.setDepth(0)
    fredbackstoryImage.setDepth(0)
    backstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)

    //sprites
    ronChaSprite.setDepth(2)
    domChaSprite.setDepth(0)
    rodChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)

    
}

function clickdominicButton(){
    //plots
    dombackstoryImage.setDepth(2)
    fredbackstoryImage.setDepth(0)
    backstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)

    //sprites
    domChaSprite.setDepth(2)
    ronChaSprite.setDepth(0)
    rodChaSprite.setDepth(0)
    fredChaSprite.setDepth(0)
    
}

function clickfredButton(){
    //plots
    fredbackstoryImage.setDepth(2)
    backstoryImage.setDepth(0)
    rodbackstoryImage.setDepth(0)
    ronbackstoryImage.setDepth(0)
    dombackstoryImage.setDepth(0)

    //sprites
    fredChaSprite.setDepth(2)
    ronChaSprite.setDepth(0)
    domChaSprite.setDepth(0)
    rodChaSprite.setDepth(0)

    
}

function clickreturn2Button(){
    game.scene.resume('Menu');
    game.scene.stop('Narrative');
}