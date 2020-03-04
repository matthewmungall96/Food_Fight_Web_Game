/** @type {import("../typings/phaser")} */
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";

let game = new Phaser.Game({
height: 900,
width: 900,
scene:[
    LoadScene, MenuScene
]
});