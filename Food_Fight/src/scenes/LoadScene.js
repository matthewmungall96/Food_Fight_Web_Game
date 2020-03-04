import { CST } from "../CST"
import { MenuScene } from "./MenuScene";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
init(data){
    console.log("I got it.")
}

preload(){
    this.load.image("title_bg", "./assets/images/background.png");
    this.load.image("logo", "./assets/images/logo.png");

}

create(){
    this.scene.start(CST.SCENES.MENU);
}

}