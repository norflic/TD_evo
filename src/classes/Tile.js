import Phaser from "phaser";

export class Tile extends Phaser.GameObjects.Image{
    // le type servira a dire si c'est une case constructible / un chemin ...
    type;
    effect;
    tower;


    constructor(scene, x, y, texture, frame) {
        console.log("Create Tile");
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.setOrigin(0); // Pour que le positionnement colle au coin supérieur gauche
        scene.cameras.main.ignore(this);
    }

    PlaceTower(tower){
        console.log("PlaceTower");
    }
    removeTower(){
        console.log("removeTower");
    }
    editTower(){
        console.log("editTower");
    }
}