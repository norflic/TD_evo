export class TowerAttack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'TowerAttack');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Config physique (collision, gravité...)
        this.body.setCollideWorldBounds(true);
    }
}