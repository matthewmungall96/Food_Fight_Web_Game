import { CST } from "../CST"
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
init(){
    console.log("Hello Menu")
    }

preload(){
    }

create(){
    this.add.image(0,0, "title_bg").setOrigin(0);
    this.add.image(0,100, "logo").setOrigin(0);
    var text = this.add.text(50,0, 'You made it to the menu');

    }
}


