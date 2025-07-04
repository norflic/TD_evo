import Phaser from "phaser";


export class Enemy extends Phaser.GameObjects.Sprite {
    ENEMY_SPEED = 1
    path = []
    posInPath = 0

    /**
     *
     * @param scene
     * @param x
     * @param y
     * @param texture
     * @param frame
     * @param path
     */
    constructor(scene, x, y, texture, frame, path) {
        var firstPosition = path[0]
        super(scene, firstPosition.x, firstPosition.y, texture, frame);
        this.path = path;
    }

    create() {
    }

    update() {
        console.log("i move")
        if (this.posInPath >= this.path.length) return;

        const target = this.path[this.posInPath];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
            // Passe au point suivant
            this.posInPath++;
            if (this.posInPath >= this.path.length) {
                // Optionnel : recommencer le chemin
                this.posInPath = 0;
            }
            return;
        }

        // Déplacement en fonction du temps (delta en ms)
        const dirX = dx / distance;
        const dirY = dy / distance;

        this.x += dirX * this.ENEMY_SPEED ;
        this.y += dirY * this.ENEMY_SPEED;
    }

}