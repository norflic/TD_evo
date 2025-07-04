import {Scene} from "phaser";
import {Enemy} from "../classes/Enemy.js";

export class Level extends Scene {

    constructor() {
        super('Map');
    }


    create() {
        this.enemies = []
        this.enemiesPath = [
            {x: 96, y: -32},
            {x: 96, y: 164},
            {x: 480, y: 164},
            {x: 480, y: 544},
        ]

        console.log('Create Map');

        this.drawPath()

        this.spawnEnnemies()
    }

    spawnEnnemies() {
        // const x = Phaser.Math.Between(128, 896);
        // const y = Phaser.Math.Between(0, -400);
        console.log('les ennemis sont appeles');
        // utile car le this est redefini dans le setInterval
        var levelEntity = this

        var i = 0
        var enemysBcl = setInterval(function () {
            if (i < 5) {
                var enemy = new Enemy(levelEntity, 100, 100, 'enemy', null, levelEntity.enemiesPath);
                levelEntity.add.existing(enemy);
                levelEntity.enemies.push(enemy);
            } else {
                clearTimeout(enemysBcl);
            }
            i++;
        }, 1000);
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

}