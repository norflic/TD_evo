import Phaser from "phaser";

function getTextureFromTowerName(scene, towerName){
    return scene.cache.json.get('towerData')[towerName].texture
}

export class Tower extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, towerName) {
        const texture = getTextureFromTowerName(scene, towerName);
        super(scene, x, y, texture);
        this.initTowerData(scene, towerName)


        scene.add.existing(this);
    }

    initTowerData(scene, towerName) {
        const towerData = scene.cache.json.get('towerData')[towerName];

        if (!towerData) {
            console.error(`Tour "${towerName}" non trouvée dans towerData.json`);
            return null;
        }

        this.range = 5
        this.AOE = false
        this.AOEDamage = 0
        this.effects = []
        this.projectileSpeed = 100

        // global
        this.name = towerName
        this.description = towerData.description
        this.baseCost = towerData.baseCost
        this.minCost = towerData.minCost
        // stats
        const stats = towerData.stats
        this.baseDamage = stats.baseDamage
        this.baseFireRate = stats.baseFireRate
        this.baseRange = stats.baseRange
        this.projectileSpeed = stats.projectileSpeed

        this.effects = towerData.effects || []
        this.upgrades = towerData.upgrades || {}
    }


    update() {
    }

    initFromScratch(){

    }


    getUpgradeEffects(){
        // let effects = []
        // return effects
    }
}
