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
    this.load.image("singleplayer_button", "./assets/images/singleplayerbutton.png")
    this.load.image("multiplayer_button", "./assets/images/multiplayerbutton.png")
    this.load.image("returntomenu", "./assets/images/returntomenu.png");
}

create(){
    this.scene.start(CST.SCENES.MENU);
}

}