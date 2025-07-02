import Phaser from "phaser";

class Tile extends Phaser.GameObjects.Image{
    // le type servira a dire si c'est une case constructible / un chemin ...
    type;
    effect;
    tower;

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        console.log("Create Tile");
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