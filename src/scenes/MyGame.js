import { Scene } from 'phaser';

export class MyGame extends Scene
{
    constructor ()
    {
        super('MyGame');
    }

    create ()
    {
        this.enemies = []

        // enemies = this.add.group({ classType: Enemy, runChildUpdate: true });

        console.log('create MyGame ');
        this.score = 0;

        this.coins = [];

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(512, 384, 'background');

        this.scoreText = this.add.text(32, 32, 'Coins: 0', textStyle).setDepth(1);
        this.timeText = this.add.text(1024 - 32, 32, 'Time: 10', textStyle).setOrigin(1, 0).setDepth(1);

        //  Our 10 second timer. It starts automatically when the scene is created.
        this.timer = this.time.addEvent({ delay: 10000, callback: () => this.gameOver() });

        this.physics.world.setBounds(0, -400, 1024, 768 + 310);

    }

    spawnEnnemies ()
    {
        // const x = Phaser.Math.Between(128, 896);
        // const y = Phaser.Math.Between(0, -400);
        //
        // const coin = this.physics.add.sprite(x, y, 'coin').play('rotate');
        //
        // this.enemies.push(coin);
    }

    update ()
    {
        this.timeText.setText('Time: ' + Math.ceil(this.timer.getRemainingSeconds()));
    }

    gameOver ()
    {
        // afficher les statistiques de la partie
        // quand btn exit clique, retourner au menu


        //  Save our highscore to the registry
        const highscore = this.registry.get('highscore');
        if (this.score > highscore)
        {
            this.registry.set('highscore', this.score);
        }

        //  Swap to the GameOver scene after a 2 second delay
        this.time.delayedCall(2000, () => this.scene.start('MainMenu'));
    }
}
