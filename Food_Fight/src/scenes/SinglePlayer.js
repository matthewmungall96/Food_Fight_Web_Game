import { CST } from "../CST"
export class SinglePlayer extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.SINGLE
        })
    }
init(data){
    console.log("Loaded Single Player")
}

create(){
    
    let returnToMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "returntomenu").setDepth(1);   
    returnToMenu.setInteractive();

    returnToMenu.on("pointerover", ()=>{
        console.log("return to menu hovering")
    })

    returnToMenu.on("pointerout", ()=>{
        console.log("return to menu exit")
    })

    returnToMenu.on("pointerdown", ()=>
        this.clickReturnMenuButton());
}

clickReturnMenuButton(){
    console.log("return to menu")
    this.scene.start(CST.SCENES.MENU);
    }
}