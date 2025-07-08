import Phaser from "phaser";
import {SlotBuilder} from "./SlotBuilder.js";

export default class LevelSideBar extends Phaser.GameObjects.Container {
    width = 100
    selectedItem = null;

    constructor(scene, x, y, towerNames) {
        super(scene, x, y);
        this.slots = []
        this.children = this.slots
        this.towerNames  = towerNames;
        // const posXInScene = scene.scale.width - this.width;

        this.container = scene.add.container(x, y);

        // Fond de la sidebar
        const bg = scene.add.rectangle(0, 0, this.width, scene.scale.height, 0x222222).setOrigin(0);
        this.add(bg)
        // fixe la barre a saa position actuelle

        this.setScrollFactor(0);

        this.addSlots(scene)
    }

    addSlots(scene) {
        console.log("j'ajoute les slots")
        const builder = new SlotBuilder(scene, this.x, this.y, this.width - 50);
        for (let i = 0; i < this.towerNames.length; i++) {
            let slot = builder.createTowerSlot("basic", this.width, i);
            slot.on('towerSlotClicked', (tower, index) => {
                console.log("Slot cliqué :", tower, index);
                this.selectedItem = tower;
            });
            // let tourActuelle = new Tower()

            // console.log("je place une tour a la position")
            // console.log("x = " + posXSlot + ", y = " + posYSlot);

            this.add(slot);
            this.slots.push(slot);
        }
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

    toweSlotClicked(){

    }
}