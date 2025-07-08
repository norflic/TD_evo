export class TowerDataManager {
    static instance = null;
    towerData = null;

    constructor(scene) {
        if (!TowerDataManager.instance) {
            if (!scene) {
                console.error('scene = '+scene);
                throw new Error("TowerDataManager doit être initialisé avec une scène au moins une fois.");
            } else {
                console.log("j'ititialise l'instance de TowerDataManager")
                this.towerData = scene.cache.json.get('towerData');
            }
        } else {
            return this.towerData;
        }
        // console.error("ca aurait du return avant")
        // return
    }

    getTowerData() {
        return this.towerData;
    }
}