import {Scene} from "phaser";
import {Enemy} from "../classes/Enemy.js";
import {Tile} from "../classes/Tile.js";
import LevelSideBar from "../Components/LevelSideBar.js";


export class Level extends Scene {

    constructor() {
        super('Map');
    }


    create() {
        // contient tous les objets suivis par la levelCam (qui seront affectes par le click and drag ou avec la molette)
        // l'autre camera utilisee est this.cameras.main qui est la camera fixe.
        // attention, quand un element est rajoute a la scene, il faut le faire ignorer par une des 2 caùeras ou il apparaîtra en double
        this.levelCam = this.cameras.add(0, 0, this.scale.width, this.scale.height);

        this.enemies = []
        this.numberOfEnemies = 5;
        this.enemysAnimation = [{'name': 'duck', 'length': 8}, {'name': 'panda', 'length': 3}, {
            'name': 'dog',
            'length': 6
        }, {'name': 'penguin', 'length': 4}];
        this.enemiesPath = [
            {x: 96, y: 0},
            {x: 96, y: 164},
            {x: 480, y: 164},
            {x: 480, y: 544},
        ]
        // utilise tower-defense.json et tmw_desert_spacing.png pour afficher la carte
        this.map = this.make.tilemap({key: 'desert'});
        this.mapTileset = this.map.addTilesetImage('Desert', 'tiles');

        this.createTiles()

        this.drawPath()

        this.spawnEnnemies()

        new LevelSideBar(this, this.scale.width - 100, 0, 100, this.scale.height, 5);

        this.mapMoovements()


        this.events.on('enemyPathFinished', this.onEnemyPathFinished, this);
    }


    createTiles() {
        this.tiles = [];
        const layerData = this.map.getLayer('Ground').data;

        for (let y = 0; y < layerData.length; y++) {
            for (let x = 0; x < layerData[y].length; x++) {
                const tile = layerData[y][x];

                if (tile.index === -1) continue; // -1 = pas de tuile

                // la position en pixel de la tuile
                const worldX = tile.getLeft();
                const worldY = tile.getTop();
                const tuile = new Tile(this, worldX, worldY, 'tiles', tile.index - this.mapTileset.firstgid);
                this.tiles.push(tuile);
            }
        }

        // const gameWidth = this.sys.game.config.width;
        // const gameHeight = this.sys.game.config.height;
        //
        // const mapWidth = this.map.widthInPixels;   // = this.map.width * tileWidth
        // const mapHeight = this.map.heightInPixels; // = this.map.height * tileHeight
        //
        // const scaleX = gameWidth / mapWidth;
        // const scaleY = gameHeight / mapHeight;
        //
        // const scale = Math.min(scaleX, scaleY);

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
        this.cameras.main.ignore(graphics);
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

    //
    //     player map moovement
    //
    mapMoovements() {
        // https://phaser.io/examples/v3.85.0/tilemap/view/mouse-wheel-zoom
        let cameraDragStartX;
        let cameraDragStartY;

        // deplacement avec la souris
        this.input.on('pointerdown', () => {
            cameraDragStartX = this.levelCam.scrollX;
            cameraDragStartY = this.levelCam.scrollY;
        });

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                this.levelCam.scrollX = cameraDragStartX + (pointer.downX - pointer.x) / this.levelCam.zoom;
                this.levelCam.scrollY = cameraDragStartY + (pointer.downY - pointer.y) / this.levelCam.zoom;
            }
        });

        // soom avec la molette
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            // Get the current world point under pointer.
            const worldPoint = this.levelCam.getWorldPoint(pointer.x, pointer.y);
            const newZoom = this.levelCam.zoom - this.levelCam.zoom * 0.001 * deltaY;
            this.levelCam.zoom = Phaser.Math.Clamp(newZoom, 0.25, 2);

            // Update this.levelCam matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
            this.levelCam.preRender();
            const newWorldPoint = this.levelCam.getWorldPoint(pointer.x, pointer.y);
            // Scroll the this.levelCam to keep the pointer under the same world point.
            this.levelCam.scrollX -= newWorldPoint.x - worldPoint.x;
            this.levelCam.scrollY -= newWorldPoint.y - worldPoint.y;
        });

        this.createUICam()
    }

    createUICam() {
        // this.UICam = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        // this.UICam.setScroll(0, 0);
        // this.UICam.setZoom(1);
    }
}