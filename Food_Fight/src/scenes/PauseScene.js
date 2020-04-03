let pauseScene = new Phaser.Scene('Pause');

pauseScene.preload = function () {

}


pauseScene.create = function () {
    if (game.input.mouse.locked) {
        game.input.mouse.releasePointerLock();
    }

    return2Button = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.1, 'return').setDisplaySize(300, 80).setDepth(1).setScale(0.3);
    return2Button.setInteractive();
    return2Button.on("pointerdown", () => {
        if (game.scene.isPaused('Single')) {
            ResumePausedScene('Single');
        }
        else if (game.scene.isPaused('Multi')) {
            ResumePausedScene('Multi');
        }
    });

    return2Menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'singleplayer_button').setDisplaySize(600, 160).setDepth(1).setScale(0.3);
    return2Menu.setInteractive();
    return2Menu.on("pointerdown", () => {
        if (game.scene.isPaused('Single')) {
            clearTimeout(singleScene.interval);
            QuitToMenu("Single");
        }
        else if (game.scene.isPaused('Multi')) {
            QuitToMenu("Multi");
        }
    });
}

pauseScene.update = function (time, delta) {

}

function QuitToMenu(key) {
    game.scene.stop(key);
    game.scene.run('Menu');
    game.scene.stop('Pause');
}

function ResumePausedScene(key) {
    game.scene.run(key);
    game.scene.stop('Pause');
}