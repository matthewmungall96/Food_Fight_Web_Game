let multiScene = new Phaser.Scene('Multi');

multiScene.preload = function () {

}

multiScene.create = function () {
    let returnToMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "returntomenu").setDepth(1);
    returnToMenu.setInteractive();

    returnToMenu.on("pointerover", () => {
        console.log("return to menu hovering  from multi");
    })

    returnToMenu.on("pointerout", () => {
        console.log("return to menu exit  from multi");
    })

    returnToMenu.on("pointerdown", () =>
        clickReturnMenuButton());
}

singleScene.update = function () {

}

