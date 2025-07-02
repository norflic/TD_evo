import * as Phaser from "phaser";


export class Enemy extends Phaser.GameObjects.Sprite {
    path;
    ENEMY_SPEED = 1 / 10000


    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    initialize(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
    }

    create() {
    }

    update(time, delta) {
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += this.ENEMY_SPEED * delta;

        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);

        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        // if we have reached the end of the path, remove the enemy
        if (this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    startOnPath () {
        // set the t parameter at the start of the path
        this.follower.t = 0;

        // get x and y of the given t point
        this.path.getPoint(this.follower.t, this.follower.vec);

        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

    }
}