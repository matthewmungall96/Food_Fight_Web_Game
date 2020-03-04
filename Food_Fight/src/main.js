/** @type {import("../typings/phaser")} */
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import {SinglePlayer} from "./scenes/SinglePlayer";
import {Multiplayer} from "./scenes/Multiplayer";

let game = new Phaser.Game({
height: 900,
width: 900,
scene:[
    LoadScene, MenuScene, SinglePlayer, Multiplayer
]
});

