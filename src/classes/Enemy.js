import Phaser from "phaser";


export class Enemy extends Phaser.GameObjects.Sprite {
    enemySpeed = 1
    path = []
    posInPath = 0

    /**
     *
     * @param scene
     * @param texture
     * @param frame
     * @param animationLength
     * @param path
     * */
    constructor(scene, texture, frame, animationLength, path) {
        var firstPosition = path[0]
        super(scene, firstPosition.x, firstPosition.y, texture, frame);
        this.path = path;
        // this.animations.add('walk');
        // this.animations.play('walk', animationLength, true);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: animationLength-1 }), // adapter start/end
            frameRate: 8,
            repeat: -1
        });
        this.play('walk'); // Lance l’animation définie par la scène
        scene.cameras.main.ignore(this);
    }


    update() {
        // console.log("i move")

        const target = this.path[this.posInPath];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance_to_point = Math.sqrt(dx * dx + dy * dy);

        // l'ennemi est arrive au point
        if (distance_to_point < this.enemySpeed) {
            this.posInPath++;
            // cas ou le chemin est termine
            if (this.posInPath >= this.path.length) {
                this.pathFinished()
            }
            return;
        }

        // Déplacement en fonction du temps (delta en ms)
        const dirX = dx / distance_to_point;
        const dirY = dy / distance_to_point;
        // console.log("dirX="+ dirX+"     dirY=" +dirY)

        this.x += dirX * this.enemySpeed ;
        this.y += dirY * this.enemySpeed;
    }

    pathFinished(){
        this.scene.events.emit('enemyPathFinished', this);
        this.destroy();
    }

}