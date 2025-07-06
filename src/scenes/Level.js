import {Scene} from "phaser";
import {Enemy} from "../classes/Enemy.js";

export class Level extends Scene {

    constructor() {
        super('Map');
    }


    create() {
        this.enemies = []
        this.numberOfEnemies = 5;
        this.enemysAnimation = [{'name': 'duck', 'length': 8}, {'name': 'panda', 'length': 3}, {'name': 'dog', 'length': 6}, {'name': 'penguin', 'length': 4}];
        this.enemiesPath = [
            {x: 96, y: -32},
            {x: 96, y: 164},
            {x: 480, y: 164},
            {x: 480, y: 544},
        ]


        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        console.log('au debut');


        console.log('Game Width: ' + gameWidth);
        console.log('Game Height: ' + gameHeight);
        // utilise tower-defense.json et tmw_desert_spacing.png pour afficher la carte
        const map = this.make.tilemap({ key: 'desert' });
        const tileset = map.addTilesetImage('Desert', 'tiles');
        const layer = map.createLayer('Ground', tileset, 0, 0);

        const mapWidth = map.widthInPixels;   // = map.width * tileWidth
        const mapHeight = map.heightInPixels; // = map.height * tileHeight

        const scaleX = gameWidth / mapWidth;
        const scaleY = gameHeight / mapHeight;
        const scale = Math.min(scaleX, scaleY);
        layer.setScale(scale);

        this.drawPath()

        this.spawnEnnemies()

        this.events.on('enemyPathFinished', this.onEnemyPathFinished, this);
    }


    clickCoin(coin) {
    }

    /**
     * ne sert que a donner un indicateur pour le debug du chemin des ennemis
     */
    drawPath() {
        var graphics = this.add.graphics();
        var point = this.enemiesPath[0]

        // the path for our enemies
        // parameters are the start x and y of our path
        var path = this.add.path(point.x, point.y);
        for (var i = 1; i < this.enemiesPath.length; i++) {
            point = this.enemiesPath[i]
            path.lineTo(point.x, point.y)
        }
        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);

    }


    update(time, delta) {
        // this.timeText.setText('Time: ' + Math.ceil(this.timer.getRemainingSeconds()));

        for (let enemy of this.enemies) {
            enemy.update();
        }
    }


    gameOver() {

    }

    //
    // -------------- Gestion des ennemis ------------------
    //

    spawnEnnemies() {
        console.log('les ennemis sont appeles');
        // levelEntity est utile car le this est redefini dans le setInterval
        var levelEntity = this

        var i = 0
        var enemysBcl = setInterval(function () {
            console.log(i)
            if (i < levelEntity.numberOfEnemies) {
                var actualEnemyAnimationLength = levelEntity.enemysAnimation[0].length;
                var enemy = new Enemy(levelEntity, 'enemy', null, actualEnemyAnimationLength, levelEntity.enemiesPath);
                levelEntity.add.existing(enemy);
                levelEntity.enemies.push(enemy);
            } else {
                clearTimeout(enemysBcl);
            }
            i++;
        }, 1000);
    }

    /**
     * supprime l'ennemi de la liste pour qu'il ne soit pas update
     * @param enemy
     */
    onEnemyPathFinished(enemy) {
        // Retirer de la liste
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }


}