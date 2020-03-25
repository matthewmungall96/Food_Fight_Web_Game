
let loadScene = new Phaser.Scene('Load');

loadScene.preload = function () {
    this.load.image("title_bg", "./dist/assets/images/background.jpg");
    this.load.image("logo", "./dist/assets/images/foodFight.png");
    this.load.image("singleplayer_button", "./dist/assets/images/single.png")
    this.load.image("multiplayer_button", "./dist/assets/images/multi.png")
    this.load.image("returntomenu", "./dist/assets/images/returntomenu.png");
}

loadScene.create = function () {
    this.scene.start('Menu');
    this.scene.stop('Load');
}
