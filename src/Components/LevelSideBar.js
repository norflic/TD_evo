import Phaser from "phaser";

export default class LevelSideBar extends Phaser.GameObjects.Container {
    width = 100
    constructor(scene, x, y) {
        super(scene, x, y);
        // const posXInScene = scene.scale.width - this.width;

        this.container = scene.add.container(x, y);

        // Fond de la sidebar
        const bg = scene.add.rectangle(0, 0, this.width, scene.scale.height, 0x222222).setOrigin(0);
        this.add(bg)
        // fixe la barre a saa position actuelle

        this.setScrollFactor(0);

        // for (let i = 0; i < nbTowers; i++) {
        //     const slot = scene.add.rectangle(
        //         this.width / 2,
        //         scene.scale.height + 60 + i * 80,
        //         this.width - 20,
        //         60,
        //         0x444444
        //     ).setStrokeStyle(2, 0xffffff);
        //
        //     this.container.add(slot);
        //     this.slots.push(slot);
        // }
        scene.levelCam.ignore(this);
        scene.add.existing(this);
    }



    addElementToSlot(index, key) {
        if (index < 0 || index >= this.slots.length) return;

        const slot = this.slots[index];

        const icon = this.scene.add.image(slot.x, slot.y, key).setInteractive();
        icon.setDisplaySize(40, 40);

        icon.on('pointerdown', () => {
            console.log(`Élément ${key} sélectionné depuis la barre`);
            this.scene.selectedTowerType = key;
        });

        this.container.add(icon);
    }
}