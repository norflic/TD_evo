import Phaser from "phaser";
import {Tower} from "../classes/Tower.js";

export class SlotBuilder extends Phaser.GameObjects.Container{

    constructor(scene, x, y, slotSize) {
        super(scene, x, y);
        // this.scene = scene;
        this.slotSize = slotSize;
        this.setScrollFactor(0);
        scene.add.existing(this);
    }

    /**
     */
    /**
     * Crée un slot de tour au mileu horizontalement du parent
     * @param towerName
     * @param largeurParent
     * @param i -
     * @returns {Phaser.GameObjects.Container}
     */
    createTowerSlot(towerName, largeurParent, i) {
        const length = this.slotSize;
        const labelFontSze = 12

        const posXSlot = largeurParent / 2;
        const posYSlot = length + 40 + i * (length + 10 + labelFontSze);
        const BGcolor = 0x444444
        const borderWidth = 2
        const borderColor = 0xffffff


        const slot = this.scene.add.rectangle(
            posXSlot,
            posYSlot,
            length,
            length,
            BGcolor
        ).setStrokeStyle(borderWidth,borderColor );

        // console.log("j'appelle le constructeur de tower avec "+ this.scene, posXSlot, posYSlot, towerName)
        let tower = new Tower(this.scene, posXSlot, posYSlot, towerName);

        const label = this.scene.add.text(posXSlot, posYSlot - length/2 -  labelFontSze, tower.name, {
            fontSize: labelFontSze.toString()+'px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const container = this.scene.add.container(0, 0, [slot, label, tower]);


        // container.setData(tower.name, tower)

        // ajout du listener dans le conteneur
        container.setSize(length, length);
        container.setInteractive()
        container.on('pointerdown', () => {
            container.emit('towerSlotClicked', towerName, i); // `tower` ou autre info utile
        });

        this.add(container);
        return container;
    }

    /**
     * Crée un slot custom avec des paramètres.
     * @param {number} width
     * @param {number} height
     * @param {number} color
     * @param {string} labelText
     * @returns {Phaser.GameObjects.Container}
     */
    createCustomSlot(width, height, color = 0x222222, labelText = '') {
        const slot = this.scene.add.rectangle(0, 0, width, height, color)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0.5);

        const label = this.scene.add.text(0, 0, labelText, {
            fontSize: '12px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const container = this.scene.add.container(0, 0, [slot, label]);
        container.setSize(width, height);
        this.add(container);
        return container;
    }
}